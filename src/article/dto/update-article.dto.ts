import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';

export class UpdatePostDto extends PartialType(CreateArticleDto) {}