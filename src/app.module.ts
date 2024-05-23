import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [KafkaModule, AuthModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule { }
