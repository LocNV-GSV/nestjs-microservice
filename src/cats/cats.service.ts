import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    private readonly cats: string[] = ['Kitty', 'Tom', 'Whiskers'];

    findAll(): string[] {
        return this.cats;
    }
}
