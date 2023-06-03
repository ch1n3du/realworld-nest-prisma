import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRO } from './user.interface';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginDto } from './dto/login-user.dto';
import { User } from './user.decorator';

@Controller()
@UsePipes(ZodValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  create(@Body() registerUserDto: CreateUserDto): Promise<UserRO> {
    return this.userService.create(registerUserDto);
  }

  @Post('users/login')
  login(@Body() loginDto: LoginDto): Promise<UserRO> {
    return this.userService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  findMe() {
    return this.userService.findMe();
  }

  @Patch('user')
  update(
    @User('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('user')
  remove(@Param('') id: string) {
    return this.userService.remove(+id);
  }
}
