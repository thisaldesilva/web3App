import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { IsSignatureValid } from '../decorators/signature-valid.decorator';

export class CreateOrderDto {
    
    @IsString()
    @IsNotEmpty()
    bakerAddress: String;

    @IsString()
    @IsNotEmpty()
    @IsSignatureValid({ message: 'Invalid MetaMask signature' })
    metaMaskSignature: String;

    @IsNumber()
    @IsNotEmpty()
    quantity: string;

    @IsNumber()
    @IsNotEmpty()
    requested_backer_id: string;

}