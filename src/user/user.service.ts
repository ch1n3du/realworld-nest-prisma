import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma.service';
import {
  generateAccessToken,
  hashPassword,
  verifyPassword,
} from 'src/utils/auth.utils';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { extractUserData, UserData, UserRO } from './user.interface';
import dotenv from 'dotenv';
import { sign } from 'jsonwebtoken';

const Selectuser = {
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
  constructor(private readonly prismaService: PrismaService) {}

  async create(registerUserDto: CreateUserDto): Promise<UserRO> {
    const hashedPassword = await hashPassword(registerUserDto.password);
    try {
      const rawUserData = await this.prismaService.user.create({
        data: {
          username: registerUserDto.username,
          email: registerUserDto.email,
          password: hashedPassword,
        },
        select: Selectuser,
      });
      const token = this.generateJWT(rawUserData.id);
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
        { message: 'Input data validation failed', body },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async login({ email, password }: LoginDto): Promise<UserRO> {
    const user = await this.findByEmail(email);

    if (user === null) {
      throw new HttpException(
        { message: 'Authentication failed', body: ['User not found'] },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!(await verifyPassword(password, user.password))) {
      throw new HttpException(
        { message: 'Authentication failed', body: ['Incorrect password'] },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = await this.generateJWT(user.id);
    const userData = extractUserData({ token: token, ...user });
    return { user: userData };
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
      select: Selectuser,
    });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  generateJWT(userId: string): string {
    return sign(userId, JWT_SECRET, { expiresIn: '1800s' });
  }
}
