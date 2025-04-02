import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, Box, TextField, Divider, List, ListItem, ListItemText, CircularProgress, Snackbar, Alert } from '@mui/material';
import api from '../axiosConfig';

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', description: '' });
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [toast, setToast] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    api.get('/owner/restaurant').then(res => setRestaurant(res.data)).catch(console.error);
    api.get('/owner/menu').then(res => setMenuItems(res.data)).catch(console.error);
    api.get('/owner/orders')
      .then(res => setOrders(res.data))
      .catch(() => setToast({ open: true, message: 'Failed to load orders', severity: 'error' }))
      .finally(() => setLoadingOrders(false));
  }, []);

  const handleAddItem = () => {
    api.post('/owner/menu', newItem).then(res => {
      setMenuItems(prev => [...prev, res.data]);
      setNewItem({ name: '', price: '', description: '' });
      setToast({ open: true, message: 'Menu item added!', severity: 'success' });
    });
  };

  const updateStatus = (orderId, status) => {
    api.patch(`/owner/orders/${orderId}`, { status })
      .then(() => {
        setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
        setToast({ open: true, message: `Order marked as ${status}`, severity: 'success' });
      })
      .catch(() => setToast({ open: true, message: 'Update failed', severity: 'error' }));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Restaurant Dashboard</Typography>

      {restaurant && (
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6">{restaurant.name}</Typography>
          <Typography>{restaurant.address}</Typography>
          <Typography>{restaurant.cuisine} | {restaurant.operatingHours}</Typography>
        </Paper>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Menu Items</Typography>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menuItems.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Add New Menu Item</Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Name"
                value={newItem.name}
                onChange={e => setNewItem({ ...newItem, name: e.target.value })}
              />
              <TextField
                label="Price"
                type="number"
                value={newItem.price}
                onChange={e => setNewItem({ ...newItem, price: e.target.value })}
              />
              <TextField
                label="Description"
                value={newItem.description}
                onChange={e => setNewItem({ ...newItem, description: e.target.value })}
              />
              <Button variant="contained" onClick={handleAddItem}>Add</Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Incoming Orders</Typography>
            {loadingOrders ? (
              <CircularProgress />
            ) : orders.length === 0 ? (
              <Typography>No orders yet.</Typography>
            ) : (
              orders.map(order => (
                <Box key={order.id} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    Order #{order.id} - {order.status} - ${order.totalAmount} - {new Date(order.orderTime).toLocaleString()}
                  </Typography>
                  <List dense>
                    {order.orderItems.map((item, idx) => (
                      <ListItem key={idx}>
                        <ListItemText primary={`${item.quantity}x ${item.menuItem.name}`} secondary={`$${item.subTotal}`} />
                      </ListItem>
                    ))}
                  </List>
                  <Box display="flex" gap={1}>
                    {order.status === 'RECEIVED' && <Button size="small" onClick={() => updateStatus(order.id, 'PREPARING')}>Mark as Preparing</Button>}
                    {order.status === 'PREPARING' && <Button size="small" onClick={() => updateStatus(order.id, 'DELIVERED')}>Mark as Delivered</Button>}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))
            )}
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.severity}
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default RestaurantDashboard;