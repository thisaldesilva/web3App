import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class SmartContractService {

  private provider: ethers.Provider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;
  private readonly abi = [
    "function shipWheat(address baker, uint256 quantity, uint256 price)",
    "function getInvoiceIdByOrderId(uint256 orderId)",
    "function getnextInvoiceId()",
    {
        "constant": true,
        "inputs": [],
        "name": "nextInvoiceId",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
  ];
  private readonly contractAddress = '0x6601e1455aDc08e0FE037249ab461E7e01E48506';

  constructor() {
    console.log("****************SmartContractService Service HIT")
    //this.provider = ethers.getDefaultProvider('goerli');
    this.provider = new ethers.InfuraProvider('goerli', '5a5ad7ff61d340348952bd8458971143');
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
        console.log('Transaction successful:');
    } catch (error) {
        console.error('Error in shipWheat transaction:', error);
        throw error;
    }
  }

  async getCurrentInvoiceId(): Promise<number>{
    try{
        const nextInvoiceId = await this.contract.nextInvoiceId()
        const currentInvoiceId = parseInt(nextInvoiceId) - 1
        return currentInvoiceId

    } catch(error) {
        console.error('Error in getting the nextInvoiceId:', error);
        throw error;
    }
  }

  async getInvoiceIdByOrderId(orderId: number) {
    try{
      let invoiceId = await this.contract.getInvoiceIdByOrderId()
      invoiceId = parseInt(invoiceId)
      return invoiceId

  } catch(error) {
      console.error('Error in getting the nextInvoiceId:', error);
      throw error;
  }
  }
}
