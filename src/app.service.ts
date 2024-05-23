import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';
import { UsersService } from './users/service/users.service';

@Injectable()
export class AppService {
  constructor(
    private readonly producerService: ProducerService,
    private readonly usersService: UsersService,
  ) { }

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
