import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [AuthModule, DbModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
