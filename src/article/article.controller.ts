import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create_article.dto';
import { UpdateArticleDto } from './dto/update_article.dto';
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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('articles')
@Controller()
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post('articles')
  @UseGuards(AuthGuard)
  createArticle(
    @Req() req,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.createArticle(userId, createArticleDto);
  }

  @Get('articles')
  listArticles(
    @Req() req,
    @Query() listArticlesParams: ListArticleParamsDto,
  ): Promise<MultipleArticlesResponseDto> {
    const userId: string = req.userId;
    return this.articleService.listArticles(userId, listArticlesParams);
  }

  @Get('articles/feed')
  @UseGuards(AuthGuard)
  feedArticles(
    @Req() req,
    @Query() feedArticlesParams: FeedArticlesParamsDto,
  ): Promise<MultipleArticlesResponseDto> {
    const userId: string = req.userId;
    return this.articleService.feedArticles(userId, feedArticlesParams);
  }

  @Get('articles/:slug')
  findArticleBySlug(
    @Req() req,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.findArticleBySlug(userId, slug);
  }

  @Put('articles/:slug')
  @UseGuards(AuthGuard)
  updateArticle(
    @Req() req,
    @Body('article') updateArticleDto: UpdateArticleDto,
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
  @UseGuards(AuthGuard)
  createComment(
    @Req() req,
    @Param('slug') slug: string,
    @Body('comment') createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const userId: string = req.userId;
    return this.articleService.createComment(userId, slug, createCommentDto);
  }

  @Get('articles/:slug/comments')
  findCommentsByArticle(
    @Req() req,
    @Param('slug') slug: string,
  ): Promise<MultipleCommentsResponseDto> {
    const userId: string = req.userId;
    return this.articleService.findCommentsByArticle(userId, slug);
  }

  @Delete('articles/:slug/comments/:id')
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
  @UseGuards(AuthGuard)
  favoriteArticle(@Req() req, @Param('slug') slug: string): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.favoriteArticle(userId, slug);
  }

  @Delete('articles/:slug/favorite')
  @UseGuards(AuthGuard)
  unfavoriteArticle(@Req() req, @Param('slug') slug: string): Promise<ArticleResponseDto> {
    const userId: string = req.userId;
    return this.articleService.unfavoriteArticle(userId, slug);
  }

  @Get('tags')
  getTags(): Promise<MultipleTagsResponseDto> {
    return this.articleService.getTags();
  }
}
