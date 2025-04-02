import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { Container, Typography, TextField, MenuItem, Button, Box } from '@mui/material';

const paymentMethods = [
  { label: 'Credit Card', value: 'card' },
  { label: 'PayPal', value: 'paypal' },
  { label: 'Cash on Delivery', value: 'cash' }
];

const CheckoutPage = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    const orderData = {
      address,
      paymentMethod,
      items: cartItems,
      total
    };
    console.log('Placing order:', orderData);
    clearCart();
    alert('Order placed successfully!');
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 500 }}>
        <TextField
          label="Delivery Address"
          multiline
          rows={4}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          select
          label="Payment Method"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          {paymentMethods.map((method) => (
            <MenuItem key={method.value} value={method.value}>
              {method.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="h6">Total: ${total.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={handleOrder}>
          Place Order
        </Button>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
