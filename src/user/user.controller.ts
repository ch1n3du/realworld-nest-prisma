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
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/responses.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard } from 'src/auth/auth.guard';
import { LoginDto } from './dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('users')
@UsePipes(ZodValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('users')
  create(@Body('user') registerUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(registerUserDto);
  }

  @Post('users/login')
  login(@Body('user') loginDto: LoginDto): Promise<UserResponseDto> {
    return this.userService.login(loginDto);
  }

  @UseGuards(AuthGuard)
  @Get('user')
  findMe(@Req() req) {
    const userId: string = req.userId;
    return this.userService.findById(userId);
  }

  @UseGuards(AuthGuard)
  @Put('user')
  update(@Req() req, @Body('user') updateUserDto: UpdateUserDto) {
    const userId: string = req.userId;
    return this.userService.update(userId, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete('user')
  remove(@Param('') id: string) {
    return this.userService.remove(id);
  }
}
