import { createZodDto } from "nestjs-zod";
import { TypeOf, z } from "nestjs-zod/z";

const ProfileDataSchema = z.object({
    username: z.string(),
    bio: z.string().describe('User bio information'),
    image: z.string().describe('URL to user profile picture'),
    following: z.boolean().describe('Is `true` if requesting user is following this user'),
})
export type ProfileData = TypeOf<typeof ProfileDataSchema>

const ProfileResponseSchema = z.object({
    profile: ProfileDataSchema
})
export class ProfileResponseDto extends createZodDto(ProfileResponseSchema) { }

export function extractProfileData(rawProfileData: ProfileData): ProfileData {
    return {
        username: rawProfileData.username,
        bio: rawProfileData.bio,
        image: rawProfileData.image,
        following: rawProfileData.following,
    };
}

