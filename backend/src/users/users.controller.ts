import { Controller, Post, Body, HttpStatus, HttpCode, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {console.log("|||||||||||   HIT USER CONTROLLER     |||||||||||")}

    @Post('Register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() createUserDto: CreateUserDto, @Res() response) {
        console.log("||||||||||----HIT REGISTER----||||||||");
        try {
            const user = await this.usersService.create(createUserDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'User successfully registered',
                user,
            });
        } catch (error) {
            // Handle errors (e.g., username already exists)
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Error: User not registered!',
                error: error.message,
            });
        }
    }

    // Other user-related endpoints can be added here
}