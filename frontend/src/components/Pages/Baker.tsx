import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css';

function BakerPage() {
  const [orders, setOrders] = useState([]);
  const [wheatQuantity, setWheatQuantity] = useState('');
  const [confirmOrderId, setConfirmOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const bakerId = JSON.parse(localStorage.getItem('user')).id;
      try {
        const response = await axios.get(`http://localhost:3000/orders/${bakerId}`, { withCredentials: true });
        console.log("RES_> ", response.data)
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderWheat = async () => {
    if (!isFinite(wheatQuantity)) {
      setErrorMessage('Please enter a valid number for quantity.');
      return;
    }

    // MetaMask integration to get bakerAddress
    // ...

    try {
      const bakerId = JSON.parse(localStorage.getItem('user')).id;
      await axios.post('http://localhost:3000/orders', {
        bakerAddress: 'MetamaskBakerAddress', // Replace with actual address from MetaMask
        quantity: parseFloat(wheatQuantity),
        requested_backer_id: bakerId
      }, { withCredentials: true });

      setWheatQuantity('');
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage('Failed to place the order.');
    }
  };

  const handleConfirmOrder = () => {
    const order = orders.find(o => o._id === confirmOrderId && o.shipped);
    if (!order) {
      setErrorMessage('Invalid order ID or order not shipped.');
      return;
    }

    // Handle order confirmation logic
    // ...
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={wheatQuantity}
          onChange={(e) => setWheatQuantity(e.target.value)}
          placeholder="Enter Wheat Quantity (Kg)"
        />
        <button onClick={handleOrderWheat}>Order Wheat</button>
      </div>

      <div>
        <input
          type="text"
          value={confirmOrderId}
          onChange={(e) => setConfirmOrderId(e.target.value)}
          placeholder="Enter Order ID to Confirm"
        />
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <table>
        <thead>
          <tr>
          <th>Order ID</th>
            <th>Baker Address</th>
            <th>Quantity</th>
            <th>Requested Baker ID</th>
            <th>Shipped</th>
            <th>Date Requested</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.id || 'null'}</td>
              <td>{order.bakerAddress}</td>
              <td>{order.quantity}</td>
              <td>{order.requested_backer_id}</td>
              <td>{order.shipped.toString()}</td>
              <td>{new Date(order.date_requested).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BakerPage;
