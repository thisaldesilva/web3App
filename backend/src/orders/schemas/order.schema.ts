import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';

@Schema()
export class Order {

    @Prop({ required: false, unique: false })
    id: number;

    @Prop({ required: true })
    bakerAddress: string;

    @Prop({ required: true })
    quantity: number;

    //@Prop({ type: Types.ObjectId, ref: 'User', required: true }) - make this chage for faster retrival
    @Prop({  ref: 'User.id', required: true })
    requested_backer_id: number //Types.ObjectId;

    @Prop({ default: false })
    shipped: boolean;

    @Prop({ default: Date.now })
    date_requested: Date;


}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);
OrderSchema.plugin(AutoIncrementID, { field: 'id' });