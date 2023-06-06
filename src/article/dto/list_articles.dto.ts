import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const ListArticleParamsSchema = z.object({
  tag: z.string().nonempty(),
  author: z.string().nonempty(),
  favorited: z.string().nonempty(),
  limit: z.number().nonnegative(),
  offset: z.number().nonnegative(),
});

export class ListArticleParamsDto extends createZodDto(
  ListArticleParamsSchema,
) {}
