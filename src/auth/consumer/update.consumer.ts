import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer.service';

@Injectable()
export class CreateConsumer implements OnModuleInit {
    constructor(private readonly consumer: ConsumerService) { }

    async onModuleInit() {
        //call message of 'update-employee'
        this.consumer.consume(
            'create-client',
            { topic: 'update-employee' },
            {
                eachMessage: async ({ topic, partition, message }) => {
                    // TODO: write event values into database
                    console.log("event updated employee", {
                        source: 'update-consumer',
                        // message: message.value.toString(),
                        message: JSON.parse(message.value as any),
                        partition: partition.toString(),
                        topic: topic.toString(),
                    });
                },
            },
        );
    }

}