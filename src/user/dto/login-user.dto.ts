import { createZodDto } from 'nestjs-zod';
import { TypeOf, z } from 'nestjs-zod/z';

const LoginDataSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});
export type LoginData = TypeOf<typeof LoginDataSchema>

const LoginSchema = z.object({
  user: LoginDataSchema
})
export class LoginDto extends createZodDto(LoginSchema) { }
