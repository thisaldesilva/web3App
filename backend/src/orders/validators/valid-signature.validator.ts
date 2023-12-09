import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { verifyMessage } from 'ethers';
import { CreateOrderDto } from '../dto/create.order.dto';

@ValidatorConstraint({ async: true })
export class IsValidSignature implements ValidatorConstraintInterface {
  async validate(signature: string, args: ValidationArguments) {
        const dto = args.object as CreateOrderDto; 
        const address = dto.bakerAddress;

    try {
        const signerAddress = verifyMessage('ANZ Digital Assets', signature);
        if(signerAddress !== address) console.log("Signature does not match the address")
        return signerAddress === address;
    } catch (error) {
        console.log("Error: Ethers verify issue..")
        return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `Signature does not match the baker address`;
  }
}
