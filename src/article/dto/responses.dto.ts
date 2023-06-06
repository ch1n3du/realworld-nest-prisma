import { ApiProperty } from '@nestjs/swagger';
import { createZodDto } from 'nestjs-zod';
import { TypeOf, z } from 'nestjs-zod/z';

export const AuthorDataSchema = z.object({
  username: z.string().nonempty(),
  bio: z.string(),
  image: z.string(),
  following: z.boolean(),
});
export type AuthorData = TypeOf<typeof AuthorDataSchema>;

const ArticleDataSchema = z.object({
  slug: z.string().nonempty(),
  title: z.string().nonempty(),
  description: z.string(),
  body: z.string().nonempty(),
  tagList: z.array(z.string()),
  createdAt: z.date(),
  updatedAt: z.date(),
  favorited: z.boolean(),
  favoritesCount: z.number().nonnegative(),
  author: AuthorDataSchema,
});
export type ArticleData = TypeOf<typeof ArticleDataSchema>;

const ArticleResponseSchema = z.object({
  article: ArticleDataSchema,
});

export class ArticleResponse extends createZodDto(ArticleResponseSchema) {}

const MultipleArticlesResponseSchema = z.object({
  articles: z.array(ArticleDataSchema),
  articlesCount: z.number(),
});

export class MultipleArticlesResponse extends createZodDto(
  MultipleArticlesResponseSchema,
) {}

const CommentDataSchema = z.object({
  id: z.number().nonnegative(),
  createdAt: z.date(),
  updatedAt: z.date(),
  body: z.string(),
  author: AuthorDataSchema,
});
export type CommentData = TypeOf<typeof CommentDataSchema>;

const CommentResponseSchema = z.object({
  comment: CommentDataSchema,
});

export class CommentResponse extends createZodDto(CommentResponseSchema) {}

const MultipleCommentsResponseSchema = z.object({
  comments: z.array(CommentDataSchema),
});

export class MultipleCommentsResponse extends createZodDto(
  MultipleCommentsResponseSchema,
) {}

const MultipleTagsResponseSchema = z.object({
  tags: z.array(z.string()),
});
export class MultipleTagsResponse extends createZodDto(
  MultipleTagsResponseSchema,
) {}
