import { createZodDto } from "nestjs-zod";
import { TypeOf, z } from "nestjs-zod/z";

const UserDataSchema = z.object({
    username: z.string().nonempty(),
    email: z.string().email(),
    token: z.string().nonempty(),
    bio: z.string(),
    image: z.string().optional(),
})
export type UserData = TypeOf<typeof UserDataSchema>

const UserResponseSchema = z.object({
    user: UserDataSchema
})

export class UserResponseDto extends createZodDto(UserResponseSchema) { }

export function extractUserData(rawData: UserData): UserData {
    const { username, email, token, bio, image } = rawData;
    return { username, email, token, bio, image };
}

