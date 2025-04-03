import React from 'react';
import { useCart } from '../context/CartContext';
import {
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Button
} from '@mui/material';

const CartPage = () => {
  const { cart, clearCart } = useCart(); // ✅ Called inside component

  const subtotal = cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const gst = +(subtotal * 0.05).toFixed(2); // 5% GST
  const tax = +(subtotal * 0.1).toFixed(2);  // 10% service tax
  const total = +(subtotal + gst + tax).toFixed(2);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>🛒 Your Cart</Typography>

      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map(item => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={`${item.name} x${item.quantity || 1}`}
                  secondary={`₹${item.price} x ${item.quantity || 1} = ₹${item.price * (item.quantity || 1)}`}
                />
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Typography>Subtotal: ₹{subtotal.toFixed(2)}</Typography>
          <Typography>GST (5%): ₹{gst.toFixed(2)}</Typography>
          <Typography>Service Tax (10%): ₹{tax.toFixed(2)}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Total: ₹{total.toFixed(2)}</Typography>

          <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={clearCart}>
            Clear Cart
          </Button>
        </>
      )}
    </Container>
  );
};

export default CartPage;
