import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop({ required: false, unique: false })
    id: number;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, enum: ['farmer', 'baker'] })
    role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(AutoIncrementID, { field: 'id' });