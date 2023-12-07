import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class LoginDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    // Regex for password (at least one uppercase letter, one lowercase letter, and one number)
    @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32})/, {
        message: 'password too weak',
    })
    password: string;
}
