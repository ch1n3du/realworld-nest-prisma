import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ProfileModule } from './profile/profile.module';
import { ArticleModule } from './article/article.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [UserModule, AuthModule, DbModule, ProfileModule, ArticleModule],
  controllers: [AppController],
  providers: [
    AppService,
    // Validation for incoming request
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    // Validation for outgoing responses
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
