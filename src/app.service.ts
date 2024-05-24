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
    await this.consumerService.consume(
      'article_created',
      { topic: 'article_created' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          // TODO: write event values into database
          console.log("event created ", topic, message.value.toString());
          // topic: article_created
          // message.value: data of user and article that the producer sent as a Buffer
          // We need convert buffer to string with "toString()"
        },
      },
    )
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
