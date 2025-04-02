import React, { useEffect, useState } from 'react';
import api from '../AxiosConfig'; 
import { Grid, Container, Typography } from '@mui/material';
import RestaurantCard from '../components/RestaurantCard';

const RestaurantsPage = () => {
  const [restaurants, setRestaurants] = useState([]);

  
useEffect(() => {
  api.get('/restaurants')  
      .then(res => setRestaurants(res.data))
    .catch(err => console.error(err));
}, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Restaurants</Typography>
      <Grid container spacing={3}>
        {restaurants.map(restaurant => (
          <Grid item xs={12} sm={6} md={4} key={restaurant.id}>
            <RestaurantCard restaurant={restaurant} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RestaurantsPage;
