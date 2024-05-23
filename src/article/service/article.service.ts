import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
    constructor() { }

    createArticle(user_id: string) {
        return {
            id: 1,
            user_id: user_id,
            title: 'Article 1',
            image: 'image source',
            tags: 'web, ux',
        };
    }
}
