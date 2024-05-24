import { Injectable, OnModuleInit } from '@nestjs/common';
import { async } from 'rxjs';
import { ConsumerService } from 'src/kafka/consumer.service';

@Injectable()
export class UpdateConsumer implements OnModuleInit {
  constructor(private readonly consumer: ConsumerService) { }

  async onModuleInit() {
    this.consumer.consume(
      'update-client',
      { topic: 'update-employee' },
      {
        eachMessage: async ({ topic, partition, message }) => {
          console.log('event updated', {
            source: 'update-consumer',
            message: message.value.toString(),
            partition: partition.toString(),
            topic: topic.toString(),
          });
        },
      },
    );
  }
}