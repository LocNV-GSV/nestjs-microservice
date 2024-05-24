import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from 'prisma/prisma.module';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';

@Module({
  imports: [KafkaModule, AuthModule, ArticleModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, TestConsumer,],
})
export class AppModule { }
