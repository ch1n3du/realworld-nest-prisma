import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { ArticleRO } from './article.interface';
import { CreateArticleDto } from './dto/create_article.dto';
import { UpdateArticleDto } from './dto/update_article.dto';
import slug from 'slug';

@Injectable()
export class ArticleService {
  constructor(private readonly dbService: DbService) {}

  async createArticle(
    userId: string,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleRO> {
    const articleSlug: string = slug(createArticleDto.title);
    const article = await this.dbService.article.create({
      data: {
        ...createArticleDto,
        slug: articleSlug,
        author: { connect: { id: userId } },
      },
    });
    return this.findArticleBySlug(articleSlug);
  }

  findAll() {
    return `This action returns all article`;
  }

  async findArticleBySlug(articleSlug: string): Promise<ArticleRO> {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }

  private async slugInUse(articleSlug: string): Promise<boolean> {
    const exists = await this.dbService.article.findFirst({
      where: { slug: articleSlug },
      select: { slug: true },
    });

    return exists !== undefined;
  }
}
