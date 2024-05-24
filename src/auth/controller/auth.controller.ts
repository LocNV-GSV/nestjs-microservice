import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUsertDto } from '../dto/update-user.dto';
import { AuthService } from '../service/auth.service';
import { User } from '../types';
import { AuthGuard } from '../auth.guard';

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

    @Get('me')
    @UseGuards(AuthGuard)
    async me(@Request() request) {
        return this.authService.getUserFromDatabase(request.user.email);
    }
}
