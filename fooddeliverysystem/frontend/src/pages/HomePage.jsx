import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import RestaurantCard from '../components/RestaurantCard';
import api from '../AxiosConfig';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api.get('/restaurants').then(res => setRestaurants(res.data));
  }, []);

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Restaurants Near You</Typography>
      <Grid container spacing={3}>
        {restaurants.map(r => (
          <Grid item xs={12} sm={6} md={4} key={r.id}>
            <RestaurantCard {...r} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
