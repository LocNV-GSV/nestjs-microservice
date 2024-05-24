import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    tags: string;

    @IsNotEmpty()
    image?: string;
}