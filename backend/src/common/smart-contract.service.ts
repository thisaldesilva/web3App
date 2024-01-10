import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import { OrdersService } from '../orders/orders.service';
import { OrderStatus } from '../common/enums/order-status.enum'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SmartContractService implements OnModuleInit {

  private provider: ethers.Provider;
  private wallet: ethers.Wallet;
  private contract: ethers.Contract;
  private readonly abi = [
    "function shipWheat(address baker, uint256 orderId, uint256 quantity, uint256 price)",
    "function getInvoiceIdByOrderId(uint256 orderId)",
    "function getnextInvoiceId()",
    "event WheatShipped(uint256 indexed invoiceId, uint256 indexed orderId, address indexed baker, uint256 quantity, uint256 price)",
    "event WheatAccepted(uint256 indexed invoiceId, address indexed baker)",
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
  private readonly contractAddress: string //= '0x3F228B40D4e532f2759677D31f73eA9626CB1Ecf';

  constructor(@Inject(forwardRef(() => OrdersService)) private ordersService: OrdersService, private configService: ConfigService) 
  {
    console.log("****************SmartContractService Service HIT")
    //this.provider = ethers.getDefaultProvider('goerli');

    this.contractAddress = this.configService.get<string>('CONTRACT_ADDRESS');
    const privateKey = this.configService.get<string>('WALLET_PRIVATE_KEY'); // '6ae56201b98cb1e88fde983f462279ed6b3a8f97ed0ca47f3b705f4414e09a0a'
    const providerUrl = this.configService.get<string>('INFURA_URL');
    const network = this.configService.get<string>('BLOCKCHAIN_NETWORK');


    this.provider = new ethers.InfuraProvider(network, providerUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.wallet);
  }

  onModuleInit() {
    this.listenToWheatShippedEvents();
  }

  private listenToWheatShippedEvents() {
    this.contract.on('WheatShipped', async (invoiceId, orderId, baker, quantity, price, event) => {
      try {
        console.log(`***************** Wheat Shipped Event: InvoiceId ${invoiceId}, OrderId ${event.args.orderId} ********************`);
        await this.ordersService.updateOrderStatusAndInvoiceId(Number(event.args.orderId), OrderStatus.Shipped, Number(invoiceId));
      } catch (error) {
        console.error('Error handling WheatShipped event:', error);
      }
    });
  }

  async shipWheat(bakerAddress: string, orderId: number, quantity: number, price: number): Promise<void> {
    try {
        console.log("Calling the shipWheat function on the smartContract....")
        console.log(bakerAddress, quantity)
        // Call the shipWheat function of the smart contract
        const transaction = await this.contract.shipWheat(bakerAddress, orderId, quantity, price);
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
