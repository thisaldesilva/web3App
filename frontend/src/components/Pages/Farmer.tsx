import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FarmerPage() {
  const [orders, setOrders] = useState([]);
  const [orderId, setOrderId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/orders', { withCredentials: true });
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
  
    // Ensure orderId is defined and is a string
    if (!orderId || typeof orderId !== 'string') {
      setErrorMessage('Please enter a valid Order ID.');
      return;
    }
  
    // Find the order to ship
    const orderToShip = orders.find(order => 
      order.id !== undefined && order.id.toString() === orderId && !order.shipped
    );
  
    if (!orderToShip) {
      setErrorMessage('Invalid order ID or order already shipped.');
      return;
    }
  
    try {
      console.log("---------->")
      await axios.patch(`http://localhost:3000/orders/${orderId}/ship`, {}, { withCredentials: true });
      setOrders(orders.map(order => 
        order.id !== undefined && order.id.toString() === orderId ? { ...order, shipped: true } : order
      ));
    } catch (error) {
      console.error('Error shipping order:', error);
      setErrorMessage('Failed to ship the order.');
    }
  };
  

  return (
    <div>
      <h1>Farmer Page</h1>
      <p>This is a page exclusively for Farmer activities.</p>

      <form onSubmit={handleShipOrder}>
        <input 
          type="text" 
          value={orderId} 
          onChange={(e) => setOrderId(e.target.value)} 
          placeholder="Enter Order ID" 
        />
        <button type="submit">Ship Order</button>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <table>
        <thead>
          <tr>
            <th>Baker Address</th>
            <th>Quantity</th>
            <th>Requested Baker ID</th>
            <th>Shipped</th>
            <th>Date Requested</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.bakerAddress || 'null'}</td>
              <td>{order.quantity || 'null'}</td>
              <td>{order.requested_backer_id || 'null'}</td>
              <td>{order.shipped !== undefined ? order.shipped.toString() : 'null'}</td>
              <td>{order.date_requested || 'null'}</td>
              <td>{order.id || 'null'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmerPage;
