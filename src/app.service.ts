import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';
import { ConsumerService } from './kafka/consumer.service';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private readonly producerService: ProducerService,
    private readonly consumerService: ConsumerService
  ) { }

  async onModuleInit() {
    // Consume Data with Spcific topic
  }

  async getHello() {
    await this.producerService.produce({
      topic: 'test',
      messages: [
        {
          value: 'Hello World',
        },
      ],
    });
    return 'Hello World!';
  }
}
