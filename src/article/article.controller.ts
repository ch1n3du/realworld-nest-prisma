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
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create_article.dto';
import { UpdateArticleDto } from './dto/update_article.dto';
import { ArticleRO, CommentRO, MultipleArticlesRO } from './article.interface';
import { ListArticleParamsDto } from './dto/list_articles.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  createArticle(
    @Req() req,
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleRO> {
    const userId: string = req.userId;
    return this.articleService.createArticle(userId, createArticleDto);
  }

  @Get()
  listArticles(
    @Req() req,
    @Param() listArticlesParams: ListArticleParamsDto,
  ): Promise<MultipleArticlesRO> {
    const userId: string = req.userId;
    return this.articleService.listArticles(userId, listArticlesParams);
  }

  @Get('feed')
  feedArticles(@Req() req): Promise<MultipleArticlesRO> {
    const userId: string = req.userId;
    return this.articleService.feedArticles(userId);
  }

  @Get(':slug')
  findArticleBySlug(@Param('slug') slug: string): Promise<ArticleRO> {
    return this.articleService.findArticleBySlug(slug);
  }

  @Patch(':slug')
  updateArticle(
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleRO> {
    return this.articleService.updateArticle(slug, updateArticleDto);
  }

  @Delete(':slug')
  removeArticle(@Param('slug') slug: string) {
    return this.articleService.removeArticle(slug);
  }

  @Post(':slug/comments')
  createComment(): Promise<CommentRO> {}

  @Get(':slug/comments')
  findCommentsByArticle(@Req() req): Promise<MultipleArticlesRO> {
    const userId: string = req.userId;
    this.articleService.findCommentsByArticle(userId, slug);
  }

  @Delete(':slug/comments/:id')
  deleteComment(@Param('slug') slug: string, @Param('id') id: string) {
    this.articleService.deleteComment(slug, id);
  }

  @Post(':slug/favorite')
  favoriteArticle(@Req() req, @Param('slug') slug: string) {
    const userId: string = req.userId;
    this.articleService.favoriteArticle(userId, slug);
  }

  @Delete(':slug/favorite')
  unfavoriteArticle(@Req() req, @Param('slug') slug: string) {
    const userId: string = req.userId;
    this.articleService.unfavoriteArticle(userId, slug);
  }
}
