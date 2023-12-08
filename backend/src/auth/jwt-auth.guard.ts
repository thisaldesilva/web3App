import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    // To handle JWT at HttpOnly and not as Authorization Bearer token 
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['jwt'];
    
        if (token) {
          request.headers.authorization = `Bearer ${token}`;
        }
    
        return super.canActivate(context);
      }
}
