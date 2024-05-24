import { Module } from '@nestjs/common';
import { CreateConsumer } from './consumer/create.consumer';
import { UpdateConsumer } from './consumer/update.consumer';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './service/employee.service';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [EmployeeService, CreateConsumer, UpdateConsumer],
  controllers: [EmployeeController],
})
export class EmployeeModule { }
