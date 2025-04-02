import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../AxiosConfig';

import { Container, Typography, Grid } from '@mui/material';
import MenuItemCard from '../components/MenuItemCard';

const MenuPage = () => {
  const { id } = useParams();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    api.get(`/restaurants/${id}/menu`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Menu</Typography>
      <Grid container spacing={3}>
        {menuItems.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <MenuItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MenuPage;
