import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const CreateArticleSchema = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  body: z.string().nonempty(),
  tagList: z.array(z.string().nonempty()).default([]),
});

export class CreateArticleDto extends createZodDto(CreateArticleSchema) {}
