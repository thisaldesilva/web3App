import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { parse } from 'flatted';
import { Contract, ethers , verifyMessage, Wallet} from "ethers";

@Controller('mintNFT')
export class NFTController {
  constructor(private readonly appService: AppService) {}

  private validSignature(signature: string, address: string): boolean{
    
    // Recover the address from the signature to verify
    const message = "ANZ Digital Assets";
    const recoveredAddress = verifyMessage(message, signature);

    return recoveredAddress === address
  }

  @Post()
  async mint_nft(@Body() requestObj) {

      console.log(JSON.stringify(requestObj))
    console.log("||||||----HIT MINT ---NFT||||||||")
    if(!this.validSignature(requestObj.signature, requestObj.address)){
      return {error: "Invalid signature."}
    }
    
    const provider = ethers.getDefaultProvider("goerli")
    const abi = [
     "function mintInvoice(uint256 orderId)"
    ]

    //Private key of the account used for sending transactions
    const privateKey = '6ae56201b98cb1e88fde983f462279ed6b3a8f97ed0ca47f3b705f4414e09a0a'; 
    // WARNING: Never hardcode private keys in production code

    // Create a wallet/signer from the private key
    const wallet = new Wallet(privateKey, provider);

    // Connect to the contract
    const contract = new Contract('0x299Ed1Cd8a329cbf343E4dd6FB63cd8b2E67b45c', abi, wallet);

    const tx = await contract.mintInvoice(parseInt(requestObj.orderNo));
    console.log("||||||||||||||||||||||||||||||||||||")
    await tx.wait();

    return {data: {id: 5, Symbol: "sym"}}
  }
}

