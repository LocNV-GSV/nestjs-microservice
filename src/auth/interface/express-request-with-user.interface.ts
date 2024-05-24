import { Request as ExpressRequest } from 'express';
import { UserPayload } from '../dto/login-user.dto';

export interface ExpressRequestWithUser extends ExpressRequest {
  user: UserPayload & { iat: number; exp: number };
}