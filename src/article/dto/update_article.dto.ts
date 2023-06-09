import { TypeOf, z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const UpdateArticleDataSchema = z.object({
  title: z.string().nonempty().optional(),
  description: z.string().nonempty().optional(),
  body: z.string().nonempty().optional(),
});
export type UpdateArticleData = TypeOf<typeof UpdateArticleDataSchema>;

const UpdateArticleSchema = z.object({
  article: UpdateArticleDataSchema
})
export class UpdateArticleDto extends createZodDto(UpdateArticleSchema) { }
