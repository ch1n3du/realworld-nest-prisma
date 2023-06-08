import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config()
const JWT_SECRET: string = process.env.JWT_SECRET!;
const saltRounds = 8;
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async hashPassword(rawPassword: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);
    return hashedPassword;
  }

  verifyPassword(
    rawPassword: string,
    hashedPassword: string
  ): Promise<boolean>  {
    return bcrypt.compare(rawPassword, hashedPassword);
  }

  async generateJwt(userId: string): Promise<string> {
    return this.jwtService.signAsync(userId);
  }

  async verifyJwt(jwt: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(jwt);
    } catch(_) {
      throw new UnauthorizedException(
        { message: 'Unauthorized', body: [] },
      );
    }
  }

  async decodeJwt(jwt: string): Promise<string> {
    try {
      return this.jwtService.decode(jwt) as string;
    } catch(_) {
      throw new UnauthorizedException(
        { message: 'Unauthorized', body: [] },
      );
    }
  }
}
