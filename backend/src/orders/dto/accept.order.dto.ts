import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { IsSignatureValid } from '../decorators/signature-valid.decorator';

export class AcceptOrderDto {

    @IsNotEmpty()
    price: number;

}