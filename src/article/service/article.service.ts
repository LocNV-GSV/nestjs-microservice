import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from '../dto/create-article.dto';
import { PrismaService } from 'prisma/service/prisma.service';
import { Article } from '../types';
import { ExpressRequestWithUser } from 'src/auth/interface/express-request-with-user.interface';
import { AuthService } from 'src/auth/service/auth.service';
import { Prisma } from '@prisma/client';
import { UpdateArticleDto } from '../dto/update-article.dto';

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

    async updateArticle (id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
        try {
            // find article by id. If not found, throw error
            await this.prisma.article.findUniqueOrThrow({
              where: { id },
            });
      
            // update article using prisma client
            const updatedArticle = await this.prisma.article.update({
              where: { id },
              data: {
                ...updateArticleDto,
              },
            });
      
            return updatedArticle;
          } catch (error) {
            // check if post not found and throw error
            if (error.code === 'P2025') {
              throw new NotFoundException(`Post with id ${id} not found`);
            }
      
            // check if email already registered and throw error
            if (error.code === 'P2002') {
              throw new ConflictException('Email already registered');
            }
      
            // throw error if any
            throw new HttpException(error, 500);
          }
    }

    async deleteArticle(id: number): Promise<string> {
        try {
          // find article by id. If not found, throw error
          const article = await this.prisma.article.findUniqueOrThrow({
            where: { id },
          });
    
          // delete article using prisma client
          await this.prisma.article.update({
            where: { id },
            data: {
              deletedAt: new Date()
            }
          });
    
          return `Post with id ${article.id} deleted`;
        } catch (error) {
          // check if post not found and throw error
          if (error.code === 'P2025') {
            throw new NotFoundException(`Post with id ${id} not found`);
          }
    
          // throw error if any
          throw new HttpException(error, 500);
        }
      }
}
