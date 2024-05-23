import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Kafka, ProducerRecord } from 'kafkajs';

@Injectable()
export class UsersService {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });
  private readonly users: any = this.kafka.producer();

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async produce(record: ProducerRecord) {
    await this.users.send(record);
  }

  async findAll() {
    await this.users.send();
    // return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  killDragon(message: any) {
    const realm = 'Nest';
    const heroId = message.heroId;
    const dragonId = message.dragonId;
    const items = [
      { id: 1, name: 'Mythical Sword' },
      { id: 2, name: 'Key to Dungeon' },
    ];

    return {
      headers: {
        realm
      },
      key: heroId,
      value: items
    }
  }
}
