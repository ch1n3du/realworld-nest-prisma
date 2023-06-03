import { createZodDto } from 'nestjs-zod';
import { string, z } from 'nestjs-zod/z';

const UpdateUserSchema = z.object({
  username: string().nonempty().optional(),
  email: string().email().optional(),
  password: string().email().optional(),
  bio: string().nonempty().optional(),
  image: string().optional(),
});

export class UpdateUserDto extends createZodDto(UpdateUserSchema) {}
