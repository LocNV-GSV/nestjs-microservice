import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { CatsService } from './cats/cats.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [KafkaModule, CatsModule, AuthModule, ArticleModule],
  controllers: [AppController, CatsController],
  providers: [AppService, TestConsumer, CatsService],
})
export class AppModule {}
