import { NestFactory } from '@nestjs/core';
import { KafkaOptions, MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UsersModule } from './users.module';

async function bootstrap() {
    const microserviceOptions: KafkaOptions = {
        transport: Transport.KAFKA,
        options: {
            producerOnlyMode: true,
            client: {
                clientId: 'user', // user-server
                brokers: ['localhost:9092'],
                retry: {
                    retries: 5,
                    initialRetryTime: 30,
                },
            },
            consumer: {
                groupId: 'user-consumer', // user-consumer-server
                allowAutoTopicCreation: true,
            },
        },
    };

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, microserviceOptions);
    await app.listen();
}

bootstrap()
    .then(() => {
        console.log(`User service is running on`);
    })
    .catch((error) => {
        console.log(error);
    });
