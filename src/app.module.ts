import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule, AuthModule, DbModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
