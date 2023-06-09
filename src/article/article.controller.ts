import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import {
  ArticleResponseDto,
  CommentResponseDto,
  MultipleArticlesResponseDto,
  MultipleCommentsResponseDto,
  MultipleTagsResponseDto,
} from './dto/responses.dto';
import { ListArticleParamsDto } from './dto/list_articles.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FeedArticlesParamsDto } from './dto/feed_articles.dto';
import { CreateCommentDto } from './dto/create_comment.dto';
import { CreateArticleDto } from './dto/create_article.dto';
import { UpdateArticleDto } from './dto/update_article.dto';

@ApiTags('articles')
@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post('articles')
  @ApiOkResponse({
    type: ArticleResponseDto,
    description: 'Returns the article created.'
  })
  @UseGuards(AuthGuard)
  createArticle(
    @Req() req,
    @Body() { article: createArticleDto }: CreateArticleDto,
  ): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.createArticle(userId, createArticleDto);
  }

  @Get('articles')
  @ApiOkResponse({
    type: MultipleArticlesResponseDto,
    description: 'Returns a list of all articles.'
  })
  listArticles(
    @Req() req,
    @Query() listArticlesParams: ListArticleParamsDto,
  ): Promise<MultipleArticlesResponseDto> {
    const userId: string = req.userId;
    return this.articleService.listArticles(userId, listArticlesParams);
  }

  @Get('articles/feed')
  @ApiOkResponse({
    type: MultipleArticlesResponseDto,
    description: 'Returns a list of all articles for a user\'s feed.'
  })
  @UseGuards(AuthGuard)
  feedArticles(
    @Req() req,
    @Query() feedArticlesParams: FeedArticlesParamsDto,
  ): Promise<MultipleArticlesResponseDto> {
    const userId: string = req.userId;
    return this.articleService.feedArticles(userId, feedArticlesParams);
  }

  @Get('articles/:slug')
  @ApiOkResponse({
    type: ArticleResponseDto,
    description: 'Returns the article that has `slug`.'
  })
  findArticleBySlug(
    @Req() req,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.findArticleBySlug(userId, slug);
  }

  @Put('articles/:slug')
  @ApiOkResponse({
    type: ArticleResponseDto,
    description: 'Returns the updated article.'
  })
  @UseGuards(AuthGuard)
  updateArticle(
    @Req() req,
    @Body() { article: updateArticleDto }: UpdateArticleDto,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.updateArticle(userId, slug, updateArticleDto);
  }

  @Delete('articles/:slug')
  @UseGuards(AuthGuard)
  deleteArticle(@Req() req, @Param('slug') slug: string) {
    const userId: string = req.userId;
    return this.articleService.deleteArticle(userId, slug);
  }

  @Post('articles/:slug/comments')
  @ApiOkResponse({
    type: CommentResponseDto,
    description: 'Returns the created comment.'
  })
  @UseGuards(AuthGuard)
  createComment(
    @Req() req,
    @Param('slug') slug: string,
    @Body() { comment: createCommentDto }: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const userId: string = req.userId;
    return this.articleService.createComment(userId, slug, createCommentDto);
  }

  @Get('articles/:slug/comments')
  @ApiOkResponse({
    type: MultipleCommentsResponseDto,
    description: 'Returns all the comments for the article whose slug is `slug`.'
  })
  findCommentsByArticle(
    @Req() req,
    @Param('slug') slug: string,
  ): Promise<MultipleCommentsResponseDto> {
    const userId: string = req.userId;
    return this.articleService.findCommentsByArticle(userId, slug);
  }

  @Delete('articles/:slug/comments/:id')
  @ApiOkResponse({
    description: 'Deletes the comment with `id`.'
  })
  @UseGuards(AuthGuard)
  deleteComment(
    @Req() req,
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    const userId: string = req.userId;
    this.articleService.deleteComment(userId, commentId);
  }

  @Post('articles/:slug/favorite')
  @ApiOkResponse({
    type: ArticleResponseDto,
    description: 'Returns the favorited article.'
  })
  @UseGuards(AuthGuard)
  favoriteArticle(@Req() req, @Param('slug') slug: string): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.favoriteArticle(userId, slug);
  }

  @Delete('articles/:slug/favorite')
  @ApiOkResponse({
    type: ArticleResponseDto,
    description: 'Returns the unfavorited article.'
  })
  @UseGuards(AuthGuard)
  unfavoriteArticle(@Req() req, @Param('slug') slug: string): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.unfavoriteArticle(userId, slug);
  }

  @Get('tags')
  @ApiOkResponse({
    type: MultipleTagsResponseDto,
    description: 'Returns the **all** article tags.'
  })
  getTags(): Promise<MultipleTagsResponseDto> {
    return this.articleService.getTags();
  }
}
