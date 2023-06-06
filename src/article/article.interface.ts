interface AuthorData {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

interface ArticleData {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: Date;
  updatedAt: Date;
  favorited: boolean;
  favoritesCount: number;
  author: AuthorData;
}

export interface ArticleRO {
  article: ArticleData;
}

export interface MultipleArticlesRO {
  articles: ArticleData;
  articlesCount: number;
}

interface CommentData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  author: AuthorData;
}

export interface CommentRO {
  comment: CommentData;
}

export interface MultipleCommentsRO {
  comments: CommentData;
}
