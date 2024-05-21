import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './test.consumer';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [KafkaModule, CatsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, TestConsumer, CatsService],
})
export class AppModule {}
