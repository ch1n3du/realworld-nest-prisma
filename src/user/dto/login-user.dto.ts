import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const LoginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

export class LoginDto extends createZodDto(LoginSchema) {}
