import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/300x140.png?text=Restaurant"
        alt={restaurant.name}
      />
      <CardContent>
        <Typography variant="h6">{restaurant.name}</Typography>
        <Typography variant="body2" color="text.secondary">{restaurant.cuisine}</Typography>
        <Button component={Link} to={`/menu/${restaurant.id}`} variant="outlined" sx={{ mt: 1 }}>
          View Menu
        </Button>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;

