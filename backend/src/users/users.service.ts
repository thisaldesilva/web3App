import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {console.log("||||||HIT USER SERVICE|||||||||||||||||")}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const { username, password, role } = createUserDto;

        // Hash the password
        console.log("ABOUT TO HASH THE PASSWORD", username, password, role)
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("PASSWORD HASHED....")
        

        // Create a new user
        const newUser = new this.userModel({
            username,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        return newUser.save();
    }

    // Additional user-related methods can be added here (e.g., findUser, deleteUser, etc.)
}