import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import api from '../AxiosConfig';

const MenuPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    api.get(`/restaurants/${id}/menu`).then(res => setMenu(res.data));
  }, [id]);

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4">Menu</Typography>
      <Grid container spacing={2}>
        {menu.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>{item.description}</Typography>
                <Typography>${item.price}</Typography>
                <Button variant="contained" fullWidth>Add to Cart</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MenuPage;
