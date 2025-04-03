import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ id, name, cuisine, rating, deliveryTime, image }) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography>{cuisine}</Typography>
        <Typography>Rating: ⭐ {rating}</Typography>
        <Typography>Delivery: ⏰ {deliveryTime}</Typography>
        <Button onClick={() => navigate(`/restaurant/${id}`)} variant="contained" fullWidth>
          View Menu
        </Button>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
