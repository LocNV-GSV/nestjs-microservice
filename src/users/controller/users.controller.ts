import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { EventName } from '../constants';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersService } from '../service/users.service';

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @EventPattern(EventName.CreateOrder.valueOf())
  public create(@Payload() payload: any, @Ctx() context: KafkaContext): void {
    console.log(payload);
    console.log('Kafka called');
  }

  // @MessagePattern('findAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @MessagePattern('findOneUser')
  findOne(@Payload() id: number) {
    return this.usersService.findOne(id);
  }

  @MessagePattern('updateUser')
  update(@Payload() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('removeUser')
  remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }

  @MessagePattern('kill.dragon')
  killDragon(@Payload() message: any): any {
    return this.usersService.killDragon(message);
    
  }
}
