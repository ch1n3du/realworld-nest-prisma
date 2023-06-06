import { z } from 'nestjs-zod/z';
import { createZodDto } from 'nestjs-zod';

const FeedArticlesParamsSchema = z.object({
  limit: z.number().nonnegative(),
  offset: z.number().nonnegative(),
});

export class FeedArticlesParamsDto extends createZodDto(
  FeedArticlesParamsSchema,
) {}
