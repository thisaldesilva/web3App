import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class SmartContractService {
  private provider: ethers.Provider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;
  private readonly abi = [
    "function shipWheat(address baker, uint256 quantity, uint256 price)"
  ];
  private readonly contractAddress = '0x299Ed1Cd8a329cbf343E4dd6FB63cd8b2E67b45c';

  constructor() {
    this.provider = ethers.getDefaultProvider('goerli');
    this.wallet = new ethers.Wallet('6ae56201b98cb1e88fde983f462279ed6b3a8f97ed0ca47f3b705f4414e09a0a', this.provider);
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.wallet);
  }

  async shipWheat(bakerAddress: string, quantity: number, price: number): Promise<void> {
    try {
        console.log("Calling the shipWheat function on the smartContract....")
        console.log(bakerAddress, quantity)
        // Call the shipWheat function of the smart contract
        const transaction = await this.contract.shipWheat(bakerAddress, quantity, price);
        await transaction.wait();
        console.log('Transaction successful:', transaction);
    } catch (error) {
        console.error('Error in shipWheat transaction:', error);
        throw error;
    }
  }
}
