import { useState } from 'react';
import HelloService from '../../service/hello';
import reactLogo from  '../../assets/react.svg';

import '../../App.css';

function BackerPage() {
  const [data, setData] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [verifyData, setVerifyData] = useState<string | null>(null);
  const [verifyError, setVerifyError] = useState<boolean>(false);
  const [verifyLoading, setVerifyLoading] = useState<boolean>(false);

  const [mintData, setMintData] = useState<string | null>(null);
  const [mintError, setMintError] = useState<boolean>(false);
  const [mintLoading, setMintLoading] = useState<boolean>(false);

  const [wheatQuantity, setInputValue] = useState<string>('');
  const [orderNo, setOrderNoValue] = useState<string>('');
  const [mintOrderValue, setMintOrderNoValue] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleOrderNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrderNoValue(event.target.value);
  };

  const handleMintOrderNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMintOrderNoValue(event.target.value);
  };

  const getData = async () => {
    try {
      setLoading(true);
      setError(false);
      setData(null);
      const response = await HelloService.request(parseInt(wheatQuantity));
      setData(response);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const verifyOrder = async () => {
    try {
      setVerifyLoading(true);
      setVerifyError(false);
      setVerifyData(null);
      const response = await HelloService.verify(parseInt(orderNo));
      setVerifyData(response);
    } catch (error) {
      setVerifyError(true);
    } finally {
      setVerifyLoading(false);
    }
  };

  const mintNFT = async () => {
    try {
      setMintLoading(true);
      setMintError(false);
      setMintData(null);
      const response = await HelloService.mint_nft(parseInt(mintOrderValue));
      setMintData(response);
    } catch (error) {
      setMintError(true);
    } finally {
      setMintLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
         
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>prototype</h1>
      <div className='card'>
      <input
          type="text"
          placeholder="Wheat Quantity"
          value={wheatQuantity}
          onChange={handleInputChange}
        />
        <button disabled={loading} onClick={getData}>
          Request Wheat
        </button>
        <p>
          {loading && 'Loading...'}
          {error && 'Error'}
          {data && data}
        </p>
        <input
          type="text"
          placeholder="Order No"
          value={orderNo}
          onChange={handleOrderNoChange}
        />
        <button disabled={loading} onClick={verifyOrder}>
          Verify Order
        </button>
        <p>
          {verifyLoading && 'Loading...'}
          {verifyError && 'Error'}
          {verifyData && verifyData}
        </p>
        <input
          type="text"
          placeholder="Order No"
          value={mintOrderValue}
          onChange={handleMintOrderNoChange}
        />
        <button disabled={loading} onClick={mintNFT}>
          Mint NFT
        </button>
        <p>
          {mintLoading && 'Loading...'}
          {mintError && 'Error'}
          {mintData && mintData}
        </p>
      </div>
      <p className='read-the-docs'></p>
    </>
  );
}

export default BackerPage;
