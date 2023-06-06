import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create_article.dto';
import { UpdateArticleDto } from './dto/update_article.dto';
import {
  ArticleRO,
  CommentRO,
  MultipleArticlesRO,
  MultipleCommentsRO,
  MultipleTagRO,
} from './article.interface';
import { ListArticleParamsDto } from './dto/list_articles.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { FeedArticlesParamsDto } from './dto/feed_articles.dto';
import { CreateCommentDto } from './dto/create_comment.dto';

@UseGuards(AuthGuard)
@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('articles')
  createArticle(
    @Req() req,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleRO> {
    const userId: string = req.userId;
    return this.articleService.createArticle(userId, createArticleDto);
  }

  @Get('articles')
  listArticles(
    @Req() req,
    @Query() listArticlesParams: ListArticleParamsDto,
  ): Promise<MultipleArticlesRO> {
    const userId: string = req.userId;
    return this.articleService.listArticles(userId, listArticlesParams);
  }

  @Get('articles/feed')
  feedArticles(
    @Req() req,
    @Query() feedArticlesParams: FeedArticlesParamsDto,
  ): Promise<MultipleArticlesRO> {
    const userId: string = req.userId;
    return this.articleService.feedArticles(userId, feedArticlesParams);
  }

  @Get('articles/:slug')
  findArticleBySlug(
    @Req() req,
    @Param('slug') slug: string,
  ): Promise<ArticleRO> {
    const userId: string = req.userId;
    return this.articleService.findArticleBySlug(userId, slug);
  }

  @Patch('articles/:slug')
  updateArticle(
    @Req() req,
    @Body('article') updateArticleDto: UpdateArticleDto,
    @Param('slug') slug: string,
  ): Promise<ArticleRO> {
    const userId: string = req.userId;
    return this.articleService.updateArticle(userId, slug, updateArticleDto);
  }

  @Delete('articles/:slug')
  deleteArticle(@Req() req, @Param('slug') slug: string) {
    const userId: string = req.userId;
    return this.articleService.deleteArticle(userId, slug);
  }

  @Post('articles/:slug/comments')
  createComment(
    @Req() req,
    @Param('slug') slug: string,
    @Body('comment') createCommentDto: CreateCommentDto,
  ): Promise<CommentRO> {
    const userId: string = req.userId;
    return this.articleService.createComment(userId, createCommentDto);
  }

  @Get('articles/:slug/comments')
  findCommentsByArticle(
    @Req() req,
    @Param('slug') slug: string,
  ): Promise<MultipleCommentsRO> {
    const userId: string = req.userId;
    return this.articleService.findCommentsByArticle(userId, slug);
  }

  @Delete('articles/:slug/comments/:id')
  deleteComment(
    @Req() req,
    @Param('slug') slug: string,
    @Param('id', ParseIntPipe) commentId: number,
  ) {
    const userId: string = req.userId;
    this.articleService.deleteComment(userId, commentId);
  }

  @Post('articles/:slug/favorite')
  favoriteArticle(@Req() req, @Param('slug') slug: string) {
    const userId: string = req.userId;
    this.articleService.favoriteArticle(userId, slug);
  }

  @Delete('articles/:slug/favorite')
  unfavoriteArticle(@Req() req, @Param('slug') slug: string) {
    const userId: string = req.userId;
    this.articleService.unfavoriteArticle(userId, slug);
  }

  @Get('tags')
  getTags(): Promise<MultipleTagRO> {
    return this.articleService.getTags();
  }
}
