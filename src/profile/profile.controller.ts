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
import { ProfileResponseDto, ProfileData } from './dto/responses.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@UseGuards(AuthGuard)
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get(':username')
  @ApiOkResponse({
    type: ProfileResponseDto,
    description: 'Returns the profile of the user with `username`.'
  })
  findByUsername(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileResponseDto> {
    const userId = req.userId;
    return this.profileService.findByUsername(userId, username);
  }

  @Post(':username/follow')
  @ApiOkResponse({
    type: ProfileResponseDto,
    description: 'Returns the profile of the followed user.'
  })
  followUser(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileResponseDto> {
    const userId = req.userId;
    return this.profileService.followUser(userId, username);
  }

  @Delete(':username/follow')
  @ApiOkResponse({
    type: ProfileResponseDto,
    description: 'Returns the profile of the unfollowed user.'
  })
  unfollowUser(
    @Req() req,
    @Param('username') username: string,
  ): Promise<ProfileResponseDto> {
    const userId = req.userId;
    return this.profileService.unfollowUser(userId, username);
  }
}
