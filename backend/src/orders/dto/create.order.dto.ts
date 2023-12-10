import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { IsSignatureValid } from '../decorators/signature-valid.decorator';

export class CreateOrderDto {
    
    // @IsString()
    // @IsNotEmpty()
    bakerAddress: string;

    // @IsString()
    // @IsNotEmpty()
    //@IsSignatureValid({ message: 'Invalid MetaMask signature' })
    metaMaskSignature: string;

    // @IsNumber()
    // @IsNotEmpty()
    quantity: string;

    // @IsNumber()
    // @IsNotEmpty()
    requested_backer_id: string;

}