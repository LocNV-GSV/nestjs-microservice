export interface SignupRequest {
    email: string;
    password: string;
    name: string;
    location: string;
}

export interface User {
    id: number;
    email: string;
    password?: string;
    name: string;
    location: string;
}

export interface LoginResponse {
    access_token: string;
}