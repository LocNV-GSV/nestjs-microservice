import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/kafka/consumer.service';

@Injectable()
export class CreateConsumer implements OnModuleInit {
    constructor(private readonly consumer: ConsumerService) { }

    async onModuleInit() {
        // this.consumer.consume(
        //     'create-client',
        //     { topic: 'create-employee' },
        //     {
        //         eachMessage: async ({ topic, partition, message }) => {
        //             // TODO: write event values into database
        //             console.log("event created ", {
        //                 source: 'create-consumer',
        //                 message: JSON.parse(message.value as any),
        //                 partition: partition.toString(),
        //                 topic: topic.toString(),
        //             });
        //             // topic: create-consume
        //             // message.value: data of user and article that the producer sent as a Buffer
        //             // We need convert buffer to string with "toString()"
        //         },
        //     },
        // );
    }
}