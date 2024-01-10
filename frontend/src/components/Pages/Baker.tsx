import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import MetaMaskService from '../../service/MetaMaskService';
import { Contract, ethers } from 'ethers';
import config from '../../config/index';

function BakerPage() {
  const [orders, setOrders] = useState([]);
  const [wheatQuantity, setWheatQuantity] = useState('');
  const [confirmInvoiceId, setConfirmOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const apiBaseUrl: string = config.apiBaseUrl;

  useEffect(() => {
    const fetchOrders = async () => {
      const bakerId = JSON.parse(localStorage.getItem('user')).id;
      try {
        
        const response = await axios.get(`${apiBaseUrl}/orders/${bakerId}`, { withCredentials: true });
        console.log("RES_> ", response.data)
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderWheat = async () => {
    console.log("-----------------------------")
    if (isNaN(parseFloat(wheatQuantity)) || !isFinite(parseFloat(wheatQuantity))) {
      setErrorMessage('Please enter a valid number for quantity.');
      return;
    }

    // MetaMask integration to get bakerAddress
    const walletData = await MetaMaskService.getSignatireAndAddress()
    console.log("Wallet Data  ->  ", walletData)

    try {
      const bakerId = JSON.parse(localStorage.getItem('user')).id;
      await axios.post(`${apiBaseUrl}/orders`, {
        bakerAddress: walletData.address,
        metaMaskSignature: walletData.signature ,
        quantity: parseFloat(wheatQuantity),
        requested_backer_id: bakerId
      }, { withCredentials: true });

      setWheatQuantity('');
      window.location.reload()
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage('Failed to place the order.');
    }
  };

  const handleConfirmOrder = async () => {
    console.log("** Hit handleConfirmOrder **", orders)
    const order = orders.find(o => o.invoiceId == confirmInvoiceId && o.status == 'shipped');
    console.log(order)
    if (!order) {
      console.log(order, confirmInvoiceId)
      setErrorMessage('Invalid order ID or order not shipped.');
      return;
    }
    console.log("Validation passed on the invoiceId")
    try {
    
      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log("|||PROVIDER|||", provider)
      const signer = await provider.getSigner();
      console.log("|||SIGNER|||", signer)

      const abi = [
        "function acceptWheat(uint256 orderId)"
      ]

      console.log("Creating contract....")
      const contract = new Contract("0x3F228B40D4e532f2759677D31f73eA9626CB1Ecf", abi, signer);
      console.log("About to call the function on the contract....")
      const tx = await contract.acceptWheat(order.invoiceId);
      console.log("Awaiting for the transaction....")
      await tx.wait();
      console.log("Done.... ")
      return "Done";

    } catch (error) {
      console.error(error);
      throw new Error("Aiiioo");
    }

    // Handle order confirmation logic
    // ...
  };

  return (
    <div>
      <div>
      <h1>Baker Page</h1>
      <p>This is a page exclusively for Baker activities.</p>
        <input
          type="text"
          value={wheatQuantity}
          onChange={(e) => setWheatQuantity(e.target.value)}
          placeholder="Enter Wheat Quantity"
        />
        <button onClick={handleOrderWheat}>Order Wheat</button>
      </div>

      <div>
        <input
          type="text"
          value={confirmInvoiceId}
          onChange={(e) => setConfirmOrderId(e.target.value)}
          placeholder="Enter Order ID"
        />
        <button onClick={handleConfirmOrder}>Order Received</button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <table>
        <thead>
          <tr>
          <th>Order ID</th>
            <th>Baker Address</th>
            <th>Quantity</th>
            <th>Requested Baker ID</th>
            <th>Status</th>
            <th>Date Requested</th>
            <th>Invoice ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.id || 'N/A'}</td>
              <td>{order.bakerAddress}</td>
              <td>{order.quantity}</td>
              <td>{order.requested_backer_id}</td>
              <td>{order.status}</td>
              <td>{new Date(order.date_requested).toLocaleString()}</td>
              <td>{order.invoiceId || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BakerPage;
