import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthService } from 'src/auth/auth.service';
import { DbService } from 'src/db/db.service';
import { LoginDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { extractUserData, UserData, UserResponseDto } from './dto/responses.dto';

const SelectUser = {
  id: true,
  email: true,
  username: true,
  bio: true,
  image: true,
  password: true,
};

@Injectable()
export class UserService {
  constructor(
    private readonly dbService: DbService,
    private readonly authService: AuthService,
  ) { }

  async create(registerUserDto: CreateUserDto): Promise<UserResponseDto> {
    const usernameExists = await this.dbService.user.findFirst({
      where: {
        username: registerUserDto.username,
      },
    });
    if (usernameExists !== null) {
      throw new UnauthorizedException(`Username is already in use`);
    }
    const emailExists = await this.dbService.user.findFirst({
      where: {
        email: registerUserDto.email,
      },
    });
    if (emailExists !== null) {
      throw new UnauthorizedException(`Email is already in use`);
    }

    const hashedPassword = await this.authService.hashPassword(
      registerUserDto.password,
    );
    const rawUserData = await this.dbService.user.create({
      data: {
        username: registerUserDto.username,
        email: registerUserDto.email,
        password: hashedPassword,
      },
      select: SelectUser,
    });
    const token = await this.authService.generateJwt(rawUserData.id);
    const userData: UserData = extractUserData({
      token,
      ...rawUserData,
      bio: rawUserData.bio ?? '',
      image: rawUserData?.image ?? '',
    });

    return { user: userData };
  }

  async login({ email, password }: LoginDto): Promise<UserResponseDto> {
    const user = await this.dbService.user.findFirst({
      where: {
        email: email,
      },
      select: SelectUser,
    });

    if (user === null) {
      throw new UnauthorizedException({
        message: 'Authentication failed',
        body: ['User not found'],
      });
    }
    if (!(await this.authService.verifyPassword(password, user.password))) {
      throw new UnauthorizedException({
        message: 'Authentication failed',
        body: ['Incorrect password'],
      });
    }
    const token = await this.authService.generateJwt(user.id);
    const userData = extractUserData({
      token: token,
      ...user,
      bio: user.bio ?? '',
      image: user.image ?? '',
    });

    return { user: userData };
  }

  async findById(id: string) {
    const rawUserData = await this.dbService.user.findFirst({
      where: {
        id: id,
      },
      select: SelectUser,
    });
    if (rawUserData === null) {
      throw new NotFoundException('User not found');
    }
    const token = await this.authService.generateJwt(id);
    const userData = extractUserData({
      token,
      ...rawUserData,
      bio: rawUserData.bio ?? '',
      image: rawUserData?.image ?? '',
    });

    return { user: userData };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const rawUserData = await this.dbService.user.update({
        where: {
          id: id,
        },
        data: updateUserDto,
        select: SelectUser,
      });
      const token = await this.authService.generateJwt(id);
      const userData = extractUserData({
        token,
        ...rawUserData,
        bio: rawUserData.bio ?? '',
        image: rawUserData?.image ?? '',
      });

      return { user: userData };
    } catch (_) {
      throw new NotFoundException({ message: 'User not found', body: [] })
    }
  }

  async remove(id: string) {
    //! Don't know how to delete  article to tag entries
    await this.dbService.favorites.deleteMany({
      where: { userId: id }
    })
    await this.dbService.favorites.deleteMany({
      where: { userId: id }
    })
    await this.dbService.comment.deleteMany({
      where: { authorId: id }
    })
    await this.dbService.article.deleteMany({
      where: { authorId: id }
    })
    await this.dbService.user.delete({
      where: { id: id },
    });
  }
}
