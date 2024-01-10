import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config/index';

function FarmerPage() {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [acceptOrderId, setAcceptOrderId] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [price, setPrice] = useState('');

  const apiBaseUrl: string = config.apiBaseUrl;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/orders`, { withCredentials: true });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleShipOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    if (!orderId || typeof orderId !== 'string') {
      setErrorMessage('Please enter a valid Order ID.');
      return;
    }
    console.log("orderID: ", orderId)
    const orderToShip = orders.find(order => 
      order.id !== undefined && order.id.toString() === orderId && (order.status == 'accepted')
    );
    console.log(orderToShip)
    if (!orderToShip) {
      setErrorMessage('Invalid order ID or order not in a state to be shipped.');
      return;
    }
  
    try {
      await axios.patch(`${apiBaseUrl}/orders/${orderId}/ship`, {}, { withCredentials: true });
      setOrders(orders.map(order => 
        order.id !== undefined && order.id.toString() === orderId ? { ...order, status: 'Shipped' } : order
      ));
      window.location.reload()
    } catch (error) {
      console.error('Error shipping order:', error);
      setErrorMessage('Failed to ship the order.');
    }
  };

  const handleAcceptOrder = async (e) => {
    e.preventDefault();
    setErrorMessage('');
  
    if (!acceptOrderId || typeof acceptOrderId !== 'string') {
      setErrorMessage('Please enter a valid Order ID.');
      return;
    }

    // if (!price || isNaN(price) || parseFloat(price) < 0) {
    //   setErrorMessage('Please enter a valid price.');
    //   return;
    // }
  
    const orderToRequest = orders.find(order => 
      order.id !== undefined && order.id.toString() === acceptOrderId && !(order.status == 'Requested')
    );
  
    if (!orderToRequest) {
      setErrorMessage('Invalid order ID or order already Accepted.');
      return;
    }
  
    try {
      console.log("PRICE->", price)
      await axios.patch(`${apiBaseUrl}/orders/${acceptOrderId}/accept`, {price: price}, {withCredentials: true,});
      setOrders(orders.map(order => 
        order.id !== undefined && order.id.toString() === orderId ? { ...order, status: 'Accepted' } : order
      ));
      window.location.reload()
    } catch (error) {
      console.error('Error shipping order:', error);
      setErrorMessage('Failed to ship the order.');
    }
  };

  return (
    <div>
      <h1>Farmer Page</h1>
      <p>This is a page exclusively for Farmer activities.</p>

      <form onSubmit={handleAcceptOrder}>
        <input 
          type="text" 
          value={acceptOrderId} 
          onChange={(e) => setAcceptOrderId(e.target.value)} 
          placeholder="Order ID" 
        />
        <input 
        type="text" 
        value={price} 
        onChange={(e) => setPrice(e.target.value)} 
        placeholder="Unit Price" 
        min="0" // This ensures only non-negative numbers are entered
        />
        <button type="submit">Accept Order</button>
      </form>

      <form onSubmit={handleShipOrder}>
        <input 
          type="text" 
          value={orderId} 
          onChange={(e) => setOrderId(e.target.value)} 
          placeholder="Order ID" 
        />
        <button type="submit">Ship Order</button>
      </form>

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
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.id || 'null'}</td>
              <td>{order.bakerAddress || 'null'}</td>
              <td>{order.quantity || 'null'}</td>
              <td>{order.requested_backer_id || 'null'}</td>
              <td>{order.status || 'null'}</td>
              <td>{order.date_requested || 'null'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmerPage;
