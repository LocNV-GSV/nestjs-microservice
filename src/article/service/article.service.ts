import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';
import { PrismaService } from 'prisma/service/prisma.service';
import { Article } from '../types';
import { ExpressRequestWithUser } from 'src/auth/interface/express-request-with-user.interface';
import { AuthService } from 'src/auth/service/auth.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticleService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService
    ) { }

    async createArticle(createArticleDto: CreateArticleDto, requesttWithUser: ExpressRequestWithUser): Promise<Article> {
        try {
            const user = await this.authService.getUserFromDatabase(requesttWithUser.user.email)

            // create new post using prisma client
            const newPost = await this.prisma.article.create({
                data: {
                    title: createArticleDto.title,
                    tags: createArticleDto.tags,
                    image: createArticleDto?.image,
                    userId: user.id,
                },
            });

            return newPost;
        } catch (error) {
            // check if email already registered and throw error
            if (error.code === 'P2002') {
                throw new ConflictException('Email already registered');
            }

            if (error.code === 'P2003') {
                throw new NotFoundException('Author not found');
            }

            // throw error if any
            throw new HttpException(error, 500);
        }
    }

    async getAllPosts(): Promise<Article[] | any> {
        return await this.prisma.article.findMany();
    }

    async getAllArticleByUserId(requesttWithUser: ExpressRequestWithUser): Promise<Article[] | any> {
        const query: Prisma.ArticleFindFirstArgs = {
            where: {
              userId: requesttWithUser.user.user_id,
            }
          };

        const [articles, count] = await this.prisma.$transaction([
            this.prisma.article.findMany(query),
            this.prisma.article.count({where: query.where})
          ]);

        return {
            data: articles,
            pagination: {
                total: count
            }
        };
    }
}
