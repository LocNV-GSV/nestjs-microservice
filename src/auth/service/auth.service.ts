import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginResponse, SignupRequest, User } from '../types';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'prisma/service/prisma.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUsertDto } from '../dto/update-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async getUserFromDatabase(email: string): Promise<User> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email: email },
    });

    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      location: user.location,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }

  // Hashing password with bcrypt
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10)
  }

  async registerUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          password: await this.hashPassword(createUserDto.password),
          name: createUserDto.name,
          location: createUserDto.location
        },
      });

      // remove password from response
      delete newUser.password;

      return newUser;
    } catch (error) {
      // check if email already registered and throw error
      if (error.code === 'P2002') {
        throw new ConflictException('Email already registered');
      }

      throw new HttpException(error, 500);
    };
  }

  async getUser(token: string): Promise<User> {
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

  async signin(loginUserDto: LoginUserDto): Promise<LoginResponse> {
    let { email, password }: LoginUserDto = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    // check if user exists
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate token from user_id and email
    const token = await this.jwtService.signAsync({ user_id: user.id, email });

    return { access_token: token };
  }

  async updatedUser(id: number, updateUserDto: UpdateUsertDto): Promise<User> {
    await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });

    // update user using prisma client
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        ...(updateUserDto.password && {
          password: await this.hashPassword(updateUserDto.password),
        }),
      },
    });

    delete updatedUser.password;

    return updatedUser;
  }

  async deleteUser(id: number): Promise<string> {
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });

      await this.prisma.user.delete({
        where: { id },
      });

      return `User with id ${user.id} deleted`;
    } catch (error) {
      // check if user not found and throw error
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} not found`);
      }

      // throw error if any
      throw new HttpException(error, 500);
    }
  }
}
