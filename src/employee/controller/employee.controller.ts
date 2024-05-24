import { Controller, Post, Put } from '@nestjs/common';
import { EmployeeService } from '../service/employee.service';

@Controller('employee')
export class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
  ) { }

  @Post()
  async create() {
    const createEmployee = await this.employeeService.create();
    return createEmployee
  }

  @Put()
  async update() {
    const updatedEmployee = await this.employeeService.update();
    return updatedEmployee
  }
}
