import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class EmployeeService {
    constructor(private readonly kafka: ProducerService) { }

    create() {
        console.log('create call');
        this.kafka.produce({
            topic: 'create-employee',
            messages: [{ value: 'this is emplotyee create' }],
        });
        return "Created Emplyee"
    }

    async update() {
        console.log('update call');
        this.kafka.produce({
            topic: 'update-employee',
            messages: [{ value: 'this is emplotyee update' }],
        });
        return "Updated Emplyee"
    }
}
