import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { use } from 'passport';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        
        const user = await this.usersService.findOne(username);

        if (user && await bcrypt.compare(pass, user.password)) {
            //Sanitize - Dont send password or password hash
            return {
                username: user.username,
                id: user.id,
                role: user.role
            };
        }
        return null;
    }

    async login(user: any): Promise<{ access_token: string }> {
   
        const payload = { username: user.username, sub: user.id, role: user.role };
     
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
