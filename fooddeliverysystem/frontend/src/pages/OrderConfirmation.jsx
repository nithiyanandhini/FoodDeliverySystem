// src/pages/OrderConfirmation.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="order-confirmation">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Your food is being prepared. You'll receive updates soon.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default OrderConfirmation;
