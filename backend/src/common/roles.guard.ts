import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        //console.log("roles gurd -> ", context)
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log("required roles -> ", requiredRoles)
        if (!requiredRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        //console.log("request -> ", request)
        const user = request.user;
        console.log("user -> ", user)
       
        return requiredRoles.some((role) => user.role?.includes(role));
    }
}
