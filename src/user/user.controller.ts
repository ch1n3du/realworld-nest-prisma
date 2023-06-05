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
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRO } from './user.interface';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginDto } from './dto/login-user.dto';

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
  findMe(@Req() req) {
    let userId: string = req.userId;
    return this.userService.findById(userId);
  }

  @UseGuards(AuthGuard)
  @Patch('user')
  update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    let userId: string = req.userId;
    return this.userService.update(userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('user')
  remove(@Param('') id: string) {
    return this.userService.remove(id);
  }
}
