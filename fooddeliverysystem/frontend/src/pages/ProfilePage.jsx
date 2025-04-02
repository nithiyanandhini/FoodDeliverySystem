import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Paper, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import api from '../AxiosConfig';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/user/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Failed to fetch orders:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Profile</Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6">Account Info</Typography>
        <Typography>Name: {user?.name}</Typography>
        <Typography>Email: {user?.email}</Typography>
        <Typography>Role: {user?.role}</Typography>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Order History</Typography>
        {loading ? (
          <CircularProgress />
        ) : orders.length === 0 ? (
          <Typography>No orders found.</Typography>
        ) : (
          <List>
            {orders.map((order) => (
              <div key={order.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`Order #${order.id} - $${order.totalAmount} - ${order.status}`}
                    secondary={`Placed on ${new Date(order.orderTime).toLocaleString()}`}
                  />
                </ListItem>
                <List sx={{ pl: 4 }}>
                  {order.orderItems?.map((item, idx) => (
                    <ListItem key={idx}>
                      <ListItemText
                        primary={`${item.quantity}x ${item.menuItem.name}`}
                        secondary={`$${item.subTotal}`}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider component="li" />
              </div>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default ProfilePage;

