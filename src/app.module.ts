import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [KafkaModule, AuthModule, ArticleModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule { }
