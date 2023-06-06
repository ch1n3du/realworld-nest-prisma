import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const UpdateArticleSchema = z.object({
  title: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  body: z.string().nonempty().optional(),
});
export class UpdateArticleDto extends createZodDto(UpdateArticleSchema) {}
