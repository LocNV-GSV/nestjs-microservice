import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../types';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

const USERS: User[] | any = [
  {
    id: 1,
    email: 'user1@gmail.com',
    password: '$2b$10$9Zha4W6B6XhJDqlocccxHuIm4jp.rGpLahN2u2FmnRjXe7Mi2fpny',
    name: 'User 1',
    location: 'Algeria',
  },
  {
    id: 2,
    email: 'user2@gmail.com',
    password: '$2b$10$FeU/xDkbGqeSGcZLYLQi0Oj70hFvRG76iG2DB3F1TOJGRgqP72z1i',
    name: 'User 2',
    location: 'Algeria',
  },
];

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  // TODO: Getting user from Database
  getUserFromDatabase(email: string): Promise<User | undefined> {
    console.log(USERS.filter((item) => item.email == email)[0], email);
    
    return USERS.filter((item) => item.email == email)[0];
  }

  // TODO: Hashing password with bcrypt
  async hashPassword(password: string): Promise<string> {
    return password;
  }

  // TODO: saving user to database
  saveUser({
    email,
    name,
    location,
    password: hashedPass,
  }: {
    email: string;
    name: string;
    location: string;
    password: string;
  }): string {
    return 'User created successfully';
  }

  async getUser(token: string): Promise<any> {
    // Send the token to the auth microservice through HTTP
    const { data } = await firstValueFrom(
      this.httpService
        .get(`http://localhost:3000/auth/info`, {
          headers: {
            Authorization: token,
          },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new UnauthorizedException();
          }),
        ),
    );
    return data;
  }
}
