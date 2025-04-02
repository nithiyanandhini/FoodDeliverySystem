import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3" gutterBottom>Welcome to Foodie</Typography>
      <Typography variant="h6" gutterBottom>Order your favorite food from top local restaurants</Typography>
      <Button variant="contained" color="primary" component={Link} to="/restaurants">
        Browse Restaurants
      </Button>
    </Container>
  );
};

export default HomePage;