export interface LoginUserDto {
    email: string
    password: string
}
export interface UserPayload {
    sub: number;
    name: string;
    email: string;
    user_id: number
    location: string;
}