import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* App Title */}

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        🍕 Food Delivery
      </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button color="inherit" component={Link} to="/restaurants">Restaurants</Button>

          {user?.role === 'RESTAURANT_OWNER' && (
            <Button color="inherit" component={Link} to="/owner">Owner Dashboard</Button>
          )}

          {user?.role === 'ADMIN' && (
            <Button color="inherit" component={Link} to="/admin">Admin Dashboard</Button>
          )}

          {user ? (
            <>
              <Button color="inherit" onClick={logout}>Logout</Button>
              <Button color="inherit" component={Link} to="/profile">Profile</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}

<Box sx={{ display: 'flex', alignItems: 'center' }}>
  <IconButton color="inherit" component={Link} to="/cart">
    <ShoppingCart />
  </IconButton>
  <Typography variant="body2" color="inherit">Cart</Typography>
</Box>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
