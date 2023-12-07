import { IsString, MinLength, MaxLength, Matches, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4, { message: 'Username must be at least 4 characters long' })
    @MaxLength(20, { message: 'Username must be no longer than 20 characters' })
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @MaxLength(32, { message: 'Password must be no longer than 32 characters' })
    @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32})/, {
        message: 'Password too weak',
    })
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsIn(['farmer', 'baker'], { message: 'Role must be either "farmer" or "baker"' })
    role: string;
}