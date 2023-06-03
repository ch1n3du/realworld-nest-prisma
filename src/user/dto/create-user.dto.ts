import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
  username: z.string().nonempty(),
  email: z.string().email(),
  password: z.string(),
});

export class CreateUserDto extends createZodDto(RegisterUserSchema) {}
