import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileRO } from './profile.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  findByUsername(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileRO> {
    const userId = req.userId;
    return this.profileService.findByUsername(userId, username);
  }

  @Post(':username/follow')
  followUser(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileRO> {
    const userId = req.userId;
    return this.profileService.followUser(userId, username);
  }

  @Delete(':username/follow')
  unfollowUser(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileRO> {
    const userId = req.userId;
    return this.profileService.unfollowUser(userId, username);
  }
}
