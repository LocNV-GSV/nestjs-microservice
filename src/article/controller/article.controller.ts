import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Get()
    @UseGuards(AuthGuard)
    createArticle(@Req() request: any) {
      let article = this.articleService.createArticle(request.user.id);
      // TODO: Sending article and user to our CQRS microservice
      return article;
    }
}
