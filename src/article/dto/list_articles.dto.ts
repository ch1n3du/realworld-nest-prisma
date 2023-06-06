import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const ListArticleParamsSchema = z.object({
  tag: z.string().nonempty().optional(),
  author: z.string().nonempty().optional(),
  favorited: z.string().nonempty().optional(),
  limit: z.number().nonnegative().optional(),
  offset: z.number().nonnegative().optional(),
});

export class ListArticleParamsDto extends createZodDto(
  ListArticleParamsSchema,
) {}
