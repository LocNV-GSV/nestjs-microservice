import { Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { SignupRequest } from '../types';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService,
    ) { }

    @Post('signup')
    async signup(@Req() request: Request): Promise<any> {
        let { email, password, name, location }: SignupRequest | any = request.body;
        let user = await this.authService.getUserFromDatabase(email);
        if (user)
            throw new HttpException('User Already exist', HttpStatus.BAD_REQUEST);

        let hashedPass = await this.authService.hashPassword(password);
        let result = await this.authService.saveUser({
            email,
            name,
            location,
            password: hashedPass,
        });
        return result;
    }

    @Post('login')
    async login(@Req() request: Request): Promise<any> {
        let { email, password }: SignupRequest | any = request.body;
        console.log({ email, password });

        let user = await this.authService.getUserFromDatabase(email);
        if (!user)
            throw new HttpException('User does not exist', HttpStatus.BAD_REQUEST);
        // Generate token from user_id and email
        let token = await this.jwtService.signAsync({ user_id: 1, email });
        return token;
    }

    @Get('info')
    async getUserInfo(@Req() request: Request): Promise<any> {
        let token = request.headers.authorization;
        if (!token) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        } else {
            // Decoding token into user_id and email
            let { user_id, email } = await this.jwtService.verifyAsync(token);
            // Fetching user information from database using the email
            let user = await this.authService.getUserFromDatabase(email);
            return user;
        }
    }
}
