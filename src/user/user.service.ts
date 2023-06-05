import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthService } from 'src/auth/auth.service';
import { DbService } from 'src/db/db.service';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { extractUserData, UserData, UserRO } from './user.interface';
import dotenv from 'dotenv';

const SelectUser = {
  id: true,
  email: true,
  username: true,
  bio: true,
  image: true,
  password: true,
};
dotenv.config();
const JWT_SECRET: string = process.env.JWT_SECRET!;

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DbService,
    private readonly authService: AuthService,
  ) {}

  async create(registerUserDto: CreateUserDto): Promise<UserRO> {
    const hashedPassword = await this.authService.hashPassword(registerUserDto.password);
    try {
      const rawUserData = await this.dbService.user.create({
        data: {
          username: registerUserDto.username,
          email: registerUserDto.email,
          password: hashedPassword,
        },
        select: SelectUser,
      });
      const token = await this.authService.generateJwt(rawUserData.id);
      const userData: UserData = extractUserData({ token, ...rawUserData });

      return { user: userData };
    } catch (error) {
      const target: string = error.meta.target[0];
      const body: string[] = [];
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002' // Unique constraint violation
      ) {
        body.push(`'${target}' must be unique.`);
      }
      throw new HttpException(
        { message: 'Validation Failed', body },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login({ email, password }: LoginDto): Promise<UserRO> {
    const user= await this.dbService.user.findFirst({
      where: {
        email: email,
      },
      select: SelectUser,
    });
    

    if (user === null) {
      throw new UnauthorizedException(
        { message: 'Authentication failed', body: ['User not found'] },
      );
    }
    if (!(await this.authService.verifyPassword(password, user.password))) {
      throw new UnauthorizedException(
        { message: 'Authentication failed', body: ['Incorrect password'] },
      );
    }
    const token = await this.authService.generateJwt(user.id);
    const userData = extractUserData({ token: token, ...user });

    return { user: userData };
  }


  async findById(id: string) {
    const rawUserData = await this.dbService.user.findFirst({
      where: {
        id: id,
      },
      select: SelectUser,
    });
    let token = await this.authService.generateJwt(id);
    let userData = extractUserData({token, ...rawUserData});

    return { user: userData};
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let rawUserData = await this.dbService.user.update({
      where: {
        id: id
      },
      data: updateUserDto,
      select: SelectUser,
    });
    let token = await this.authService.generateJwt(id);
    let userData = extractUserData({token, ...rawUserData});

    return ({user: userData});
  }

  async remove(id: string) {
    await this.dbService.user.delete({
      where: {
        id: id
      }
    })
  }
}
