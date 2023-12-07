import { IsString, MinLength, MaxLength, Matches, IsIn } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32})/, {
        message: 'password too weak',
    })
    password: string;

    @IsString()
    @IsIn(['farmer', 'baker'])
    role: string;
}