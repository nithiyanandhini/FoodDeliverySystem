import React, { useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Button,
  Box
} from '@mui/material';
import { useCart } from '../context/CartContext';
import foodData from '../data/foodData';

const restaurants = [
  { id: 1, name: 'Tadka King' },
  { id: 2, name: 'PizzaPizza' },
  { id: 3, name: 'Punjabi By Nature' },
  { id: 4, name: 'KFC' }
];

const cuisines = ['Chinese', 'Indian', 'English', 'South Indian'];

const RestaurantSelection = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState(null);
  const [quantities, setQuantities] = useState({}); // ✅ Track quantity per item

  const { addToCart } = useCart();

  const incrementQty = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1
    }));
  };

  const decrementQty = (itemId) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 1) - 1, 1)
    }));
  };

  const selectedFoods =
    selectedRestaurant && selectedCuisine
      ? foodData[selectedRestaurant.name]?.[selectedCuisine] || []
      : [];

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>🍴 Select a Restaurant</Typography>
      <Grid container spacing={2}>
        {restaurants.map((rest) => (
          <Grid item xs={12} sm={6} md={3} key={rest.id}>
            <Card
              sx={{
                cursor: 'pointer',
                border: selectedRestaurant?.id === rest.id ? '2px solid #1976d2' : 'none'
              }}
              onClick={() => {
                setSelectedRestaurant(rest);
                setSelectedCuisine(null);
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">{rest.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {selectedRestaurant && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            🥘 Select Cuisine at {selectedRestaurant.name}
          </Typography>
          <Grid container spacing={2}>
            {cuisines.map((cuisine) => (
              <Grid item key={cuisine}>
                <Chip
                  label={cuisine}
                  clickable
                  color={selectedCuisine === cuisine ? 'primary' : 'default'}
                  onClick={() => setSelectedCuisine(cuisine)}
                  sx={{ fontSize: 16, padding: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {selectedCuisine && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            ✅ Showing: <strong>{selectedRestaurant.name}</strong> - <strong>{selectedCuisine}</strong>
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Grid container spacing={2}>
            {selectedFoods.length === 0 ? (
              <Typography variant="body1" sx={{ px: 2 }}>No items available.</Typography>
            ) : (
              selectedFoods.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card sx={{ p: 2 }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">Price: ₹{item.price}</Typography>

                    {/* Quantity Selector */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => decrementQty(item.id)}
                      >
                        -
                      </Button>
                      <Typography>{quantities[item.id] || 1}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => incrementQty(item.id)}
                      >
                        +
                      </Button>
                    </Box>

                    {/* Add to Cart Button */}
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() =>
                        addToCart({
                          ...item,
                          quantity: quantities[item.id] || 1
                        })
                      }
                    >
                      🛒 Add to Cart
                    </Button>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default RestaurantSelection;
