import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }

    // You can extend the functionality by overriding handleRequest, canActivate, etc.
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log("request -> ", request.cookies)
        const token = request.cookies['jwt'];
        console.log("JWT ->", token)

    
        if (token) {
          request.headers.authorization = `Bearer ${token}`;
        }
    
        return super.canActivate(context);
      }
}
