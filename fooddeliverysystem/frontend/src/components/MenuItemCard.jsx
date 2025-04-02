import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { CartContext } from '../context/CartContext';

const MenuItemCard = ({ item }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/300x140.png?text=Menu+Item"
        alt={item.name}
      />
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2">{item.description}</Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>${item.price}</Typography>
        <Button onClick={() => addToCart(item)} variant="contained" sx={{ mt: 1 }}>
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default MenuItemCard;
