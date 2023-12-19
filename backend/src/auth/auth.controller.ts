import { Controller, Request, Post, UseGuards, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Injectable } from '@nestjs/common';

//@Injectable()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private configService:ConfigService) {}

    //@UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() createUserDto: CreateUserDto, @Res() response) {
        console.log("|||||||||||HIT AUTH CONTROLLER||||||||||||||", createUserDto)
        
        const validUser = await this.authService.validateUser(createUserDto.username, createUserDto.password);
  
        if(validUser == null) {
            response.status(HttpStatus.UNAUTHORIZED).json({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: 'Error: User not registered!',
                error: "Invalid Credentials",
            });
        }
        
        const jwtToken = await this.authService.login(validUser);
        response.cookie('jwt', jwtToken['access_token'], { 
            httpOnly: true,
            secure: true, // PROF FIX
            sameSite: 'None', // PROF FIX
            //domain: 'https://frontend-withcon-5gykd7gzwa-uc.a.run.app', // PROF FIX
        });

        return response.status(HttpStatus.CREATED).json({
            user: validUser,
            message: 'User successfully Authenticatted'
        });
    }
}



