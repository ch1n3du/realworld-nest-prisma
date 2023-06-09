import {
  Controller,
  Get,
  Post,
  Body,
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('users')
@UsePipes(ZodValidationPipe)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('users')
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'Returns the user information of the created user.'
  })
  create(@Body() { user: registerUserDto }: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.create(registerUserDto);
  }

  @Post('users/login')
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'Returns the user information of the logged in user.'
  })
  login(@Body() { user: loginDto }: LoginDto): Promise<UserResponseDto> {
    return this.userService.login(loginDto);
  }

  @Get('user')
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'Returns the user information of the requesting user.'
  })
  @UseGuards(AuthGuard)
  findMe(@Req() req): Promise<UserResponseDto> {
    const userId: string = req.userId;
    return this.userService.findById(userId);
  }

  @Put('user')
  @ApiOkResponse({
    type: UserResponseDto,
    description: 'Returns the user information of the updated user.'
  })
  @UseGuards(AuthGuard)
  update(@Req() req, @Body() { user: updateUserDto }: UpdateUserDto) {
    const userId: string = req.userId;
    return this.userService.update(userId, updateUserDto);
  }

  @Delete('user')
  @ApiOkResponse({
    description: 'Deletes the requesting user.'
  })
  @UseGuards(AuthGuard)
  remove(@Param('') id: string) {
    return this.userService.remove(id);
  }
}
