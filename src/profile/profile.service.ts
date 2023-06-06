import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { extractProfileData, ProfileRO } from './profile.interface';

const SelectProfile = {
  id: true,
  username: true,
  bio: true,
  image: true,
};

@Injectable()
export class ProfileService {
  constructor(private readonly dbService: DbService) {}

  async findByUsername(userId: string, username: string): Promise<ProfileRO> {
    const profile = await this.dbService.user.findFirst({
      where: {
        username: username,
      },
      select: SelectProfile,
    });
    if (profile === undefined) {
      throw new NotFoundException('User not found');
    }
    const following = await this.checkFollowing(userId, profile.id);
    const profileData = extractProfileData({ ...profile, following });

    return { profile: profileData };
  }

  async followUser(userId: string, username: string): Promise<ProfileRO> {
    const profileId = await this.findIdByUsername(username);
    const following = await this.checkFollowing(userId, profileId);
    if (following) {
      return this.findByUsername(userId, username);
    }

    const { followed } = await this.dbService.follows.create({
      data: {
        followerId: userId,
        followedId: profileId,
      },
      select: {
        followed: { select: SelectProfile },
      },
    });
    const profileData = { following: following, ...followed };

    return { profile: profileData };
  }

  async unfollowUser(userId: string, username: string): Promise<ProfileRO> {
    const profileId = await this.findIdByUsername(username);

    await this.dbService.follows.delete({
      where: {
        followerId_followedId: { followerId: userId, followedId: profileId },
      },
    });
    return this.findByUsername(userId, username);
  }

  private async findIdByUsername(username: string): Promise<string> {
    const rawId = await this.dbService.user.findFirst({
      where: { username },
      select: { id: true },
    });
    if (rawId === undefined) {
      throw new NotFoundException('User not found');
    }

    return rawId.id;
  }

  private async checkFollowing(
    followerId: string,
    followedId: string,
  ): Promise<boolean> {
    const follows = await this.dbService.follows.findFirst({
      where: {
        followerId,
        followedId,
      },
      select: { followedId: true },
    });

    return follows !== undefined;
  }
}
