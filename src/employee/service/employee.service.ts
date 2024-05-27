import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/types';
import { ProducerService } from 'src/kafka/producer.service';

@Injectable()
export class EmployeeService {
    constructor(private readonly kafka: ProducerService) { }

    create() {
        console.log('create call');
        const newUser = {
            name: " data.username",
            password: "123456",
            email: "data.email",
            location: "string",
        };

        this.kafka.produce({
            topic: 'create-employee',
            messages: [{ value: JSON.stringify(newUser as User) }],
        });
        return 'Created Emplyee';
    }

    async update() {
        console.log('update call');
        this.kafka.produce({
            topic: 'update-employee',
            messages: [{ value: 'this is emplotyee update' }],
        });
        return 'Updated Emplyee';
    }
}
