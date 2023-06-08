import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import dotenv from 'dotenv';
import { AuthGuard } from './auth.guard';

dotenv.config();

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET!,
      // signOptions: { expiresIn: '120m'}
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
