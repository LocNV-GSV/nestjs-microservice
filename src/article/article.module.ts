import { Module } from '@nestjs/common';
import { ArticleController } from './controller/article.controller';
import { ArticleService } from './service/article.service';
import { AuthModule } from 'src/auth/auth.module';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [AuthModule, KafkaModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
