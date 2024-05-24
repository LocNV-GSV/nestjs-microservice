import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ExpressRequestWithUser } from 'src/auth/interface/express-request-with-user.interface';
import { ProducerService } from 'src/kafka/producer.service';
import { CreateArticleDto } from '../dto/create-article.dto';
import { ArticleService } from '../service/article.service';
import { Article } from '../types';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly producerService: ProducerService,
    ) { }

    @Post()
    @UseGuards(AuthGuard)
    async createArticle(
        @Body() createArticleDto: CreateArticleDto,
        @Request() requesttWithUser: ExpressRequestWithUser,
    ) {
        const article = this.articleService.createArticle(
            createArticleDto,
            requesttWithUser,
        );
        // Sending article and user to our CQRS microservice
        await this.producerService.produce({
            topic: 'article_created',
            messages: [
                {
                    value: JSON.stringify({
                        user_id: requesttWithUser?.user?.user_id,
                        user_name: requesttWithUser?.user?.name,
                        user_email: requesttWithUser?.user?.email,
                        user_location: requesttWithUser?.user?.location,
                        article_title: createArticleDto.title,
                        article_image: createArticleDto.image,
                    }),
                },
            ],
        });

        return article;
    }

    @Get()
    async getAllPosts(): Promise<Article[]> {
        return await this.articleService.getAllPosts();
    }

    @Get('/user')
    @UseGuards(AuthGuard)
    async getArticleById(
        @Request() requesttWithUser: ExpressRequestWithUser,
    ): Promise<Article> {
        return await this.articleService.getAllArticleByUserId(requesttWithUser);
    }
}
