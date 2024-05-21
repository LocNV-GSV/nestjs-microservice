import { Injectable } from '@nestjs/common';
import { ProducerService } from './kafka/producer.service';
import { UsersService } from './users/users.service';

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

  async getFindAllUSer() {
    const text = await this.usersService.killDragon({
      topic: 'kill.dragon',
      messages: [
        {
          heroId: 123,
          dragonId: 999,
        },
      ],
    });
   
    return text;
  }
}
