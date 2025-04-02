import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Container, Typography, List, ListItem, ListItemText, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Shopping Cart</Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={`${item.name} x${item.quantity}`} secondary={`$${item.price}`} />
            <IconButton edge="end" onClick={() => removeFromCart(item.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" sx={{ mt: 2 }}>Total: ${total.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" component={Link} to="/checkout" sx={{ mt: 2 }}>
        Proceed to Checkout
      </Button>
    </Container>
  );
};

export default CartPage;
