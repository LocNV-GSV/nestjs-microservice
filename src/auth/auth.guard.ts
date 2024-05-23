import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { AuthService } from './service/auth.service';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      // get the token from headers
      const token = request.headers.authorization;
  
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        // Using token to get the user info from the auth microservice
        const user = await this.authService.getUser(token);
        // Passing the user info to the next request handler
        request['user'] = user;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  }