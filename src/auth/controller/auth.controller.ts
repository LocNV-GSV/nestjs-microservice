import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignupRequest, User } from '../types';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService,
    ) { }

    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<any> {
        return await this.authService.signin(loginUserDto)
    }

    @Get('info')
    async getUserInfo(@Req() request: Request): Promise<any> {
        const token = request.headers.authorization;
        if (!token) {
            return new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        // Check verify Token
        const { email } = await this.jwtService.verifyAsync(token);

        // Fetching user information from database using the email
        return await this.authService.getUserFromDatabase(email);
    }

    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.authService.registerUser(createUserDto);
    }
}
