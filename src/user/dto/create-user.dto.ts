import { createZodDto } from 'nestjs-zod';
import { z, TypeOf } from 'nestjs-zod/z';

const CreateUserDataSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string(),
});
export type CreateUserData = TypeOf<typeof CreateUserDataSchema>

const CreateUserSchema = z.object({
  user: CreateUserDataSchema
})

export class CreateUserDto extends createZodDto(CreateUserSchema) { }
