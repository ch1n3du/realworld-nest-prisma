import { createZodDto } from 'nestjs-zod';
import { TypeOf, string, z } from 'nestjs-zod/z';

const UpdateUserDataSchema = z.object({
  username: string().nonempty().optional(),
  email: string().email().optional(),
  password: string().email().optional(),
  bio: string().nonempty().optional(),
  image: string().optional(),
});
export type UpdateUserData = TypeOf<typeof UpdateUserDataSchema>

const UpdateUserSchema = z.object({
  user: UpdateUserDataSchema
})
export class UpdateUserDto extends createZodDto(UpdateUserSchema) { }
