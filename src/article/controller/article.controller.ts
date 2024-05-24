import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProducerService } from 'src/kafka/producer.service';

@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService,
        private readonly producerService: ProducerService,
    ) { }

    @Post()
    // @UseGuards(AuthGuard)
    async createArticle(@Req() request: any) {
        const article = this.articleService.createArticle(request?.user?.id);
        // Sending article and user to our CQRS microservice
        await this.producerService.produce({
            topic: 'article_created',
            messages: [
                {
                    value: JSON.stringify({
                        user_id: request?.user?.id,
                        user_name: request?.user?.name,
                        user_email: request?.user?.email,
                        user_location: request?.user?.location,
                        article_id: article.id,
                        article_title: article.title,
                        article_image: article.image,
                        article_tags: article.tags,
                    }),
                },
            ],
        });
        return article;
    }
}
