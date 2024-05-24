import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUsertDto } from '../dto/update-user.dto';
import { AuthService } from '../service/auth.service';
import { User } from '../types';

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

    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUsertDto,
    ): Promise<User> {
        return await this.authService.updatedUser(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
      return this.authService.deleteUser(+id);
    }
}
