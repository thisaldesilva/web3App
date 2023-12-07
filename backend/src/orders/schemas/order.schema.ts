import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Order {

    @Prop({ required: true })
    bakerAddress: string;

    @Prop({ required: true })
    quantity: number;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    requested_backer_id: Types.ObjectId;

    @Prop({ default: false })
    shipped: boolean;

    @Prop({ default: Date.now })
    date_requested: Date;


}

export type OrderDocument = Order & Document;

export const OrderSchema = SchemaFactory.createForClass(Order);