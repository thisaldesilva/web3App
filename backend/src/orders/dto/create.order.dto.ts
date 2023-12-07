import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    
    @IsNotEmpty()
    @IsString()
    bakerAddress: String;
    
    @IsNotEmpty()
    @IsNumber()
    quantity: string;

    @IsNumber()
    requested_backer_id: string;

}