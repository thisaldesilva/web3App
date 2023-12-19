import { AxiosResponse } from 'axios';
import { stringify } from 'flatted';
import { Contract, ethers } from "ethers";
import http from './http-common';
import { Signature } from '../../node_modules/ethers/lib.commonjs/ethers';

class MetaMaskService {
  async getHello() {
    try {
      const response: AxiosResponse = await http.get('/');
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error while getting hello');
    }
  }

  async getSignatireAndAddress(): Promise<{address: string, signature: string}>{
    try{
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Get the user's Ethereum address
      const address = await signer.getAddress();

      // Get the user's Ethereum address
      const signature = await signer.signMessage("ANZ Digital Assets");

      return {
        address,
        signature
      }
      
    } catch(error){
      console.log("Error while MetaMask Intergration")
      
    }
  }

  async request(wheatQuantity: number) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // const abi = [
      //   "function getnextInvoiceId() view public returns(uint256)",
      //   "function symbol() view returns (string)",
      //   "function add() public"
      // ]
      
      // Get the user's Ethereum address
      const address = await signer.getAddress();

      // Sign a message
      const signature = await signer.signMessage("ANZ Digital Assets");
      http.post('/', {
        address: address,
        signature: signature,
        wheatQuantity: wheatQuantity
      })

      return 'Request sent to backend...';

    } catch (error) {
      console.error(error);
      return error
    }
  }


  async verify(orderNo: number) {
    try {
    
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("|||PROVIDER|||", provider)
      const signer = await provider.getSigner();
      console.log("|||SIGNER|||", signer)

      const abi = [
        "function acceptWheat(uint256 orderId)"
      ]

      const contract = new Contract("0x299Ed1Cd8a329cbf343E4dd6FB63cd8b2E67b45c", abi, signer);
      const tx = await contract.acceptWheat(orderNo);
      await tx.wait();
      

      return "Done";

    } catch (error) {
      console.error(error);
      throw new Error("Aiiioo");
    }
  }

  async mint_nft(orderNo: number) {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // const abi = [
      //   "function getnextInvoiceId() view public returns(uint256)",
      //   "function symbol() view returns (string)",
      //   "function add() public"
      // ]

      // Get the user's Ethereum address
      const address = await signer.getAddress();
      console.log("MINT @@@@@@@@@@@@@@")
      // Sign a message
      const signature = await signer.signMessage("ANZ Digital Assets");
      http.post('/mintNFT', {
        address: address,
        signature: signature,
        orderNo: orderNo 
      })

      console.log("Address: ", address);
      console.log("Signature: ", signature);

      return "Minted";


    } catch (error) {
      console.error(error);
      throw new Error("Aiiioo");
    }
  }
  
}

export default new MetaMaskService();
