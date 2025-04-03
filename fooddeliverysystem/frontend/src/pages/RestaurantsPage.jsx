import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const RestaurantCard = ({ restaurant }) => {
  useEffect(() => {
    api.get('/restaurants')  
      .then(res => {
        console.log("API Response:", res.data); // check if it's array of objects
        setRestaurants(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{restaurant.name}</Typography>
        <Typography variant="body2">{restaurant.cuisine}</Typography>
        {/* Example: only show strings, not full objects */}
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
