import React, { useContext, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const navigate = useNavigate();

  // Safe reduce even if cartItems is undefined
  const total = (cartItems ?? []).reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Show message if cart is empty
  if (!cartItems || cartItems.length === 0) return <p>Your cart is empty.</p>;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      const orderPayload = {
        items: cartItems.map(item => ({
          menuItemId: item.id,
          quantity: item.quantity
        })),
        address,
        paymentMethod,
        totalAmount: total
      };

      await axios.post('http://localhost:8082/api/orders', orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      clearCart();
      navigate('/order-confirmation'); // redirect to confirmation screen
    } catch (error) {
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>🛒 Your Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ₹{item.price}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{total.toFixed(2)}</h3>

      <div>
        <label>Delivery Address:</label>
        <textarea
          value={address}
          onChange={e => setAddress(e.target.value)}
          rows={3}
          placeholder="Enter delivery address"
        />
      </div>

      <div>
        <label>Payment Method:</label>
        <select
          value={paymentMethod}
          onChange={e => setPaymentMethod(e.target.value)}
        >
          <option value="COD">Cash on Delivery</option>
          <option value="CARD">Credit/Debit Card</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      <button onClick={handlePlaceOrder} disabled={loading}>
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default CartPage;
