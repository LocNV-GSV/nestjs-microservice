import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDto {
    @ApiProperty()
    email: string

    @ApiProperty()
    password: string
}
export interface UserPayload {
    sub: number;
    name: string;
    email: string;
    user_id: number
    location: string;
}