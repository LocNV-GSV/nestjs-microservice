import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: ['localhost:9092'],
      },
      producerOnlyMode: true,
      consumer: {
        groupId: 'nestjs-kafka',
      },
    },
  });
  await app.startAllMicroservices();

  // Global pipe that will be applied to all routes
  // This will validate the request body against the DTO
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
