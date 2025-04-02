import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Foodie</Link>y
          
        </Typography>
        <Button color="inherit" component={Link} to="/restaurants">Restaurants</Button>
        {user?.role === 'RESTAURANT_OWNER' && (
          <Button color="inherit" component={Link} to="/owner">Restaurant Dashboard</Button>
        )}
        {user?.role === 'ADMIN' && (
          <Button color="inherit" component={Link} to="/admin">Admin Dashboard</Button>
        )}
        {user && (
          <Button color="inherit" onClick={logout}>Logout</Button>
        )}
        {!user && (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
        <Button color="inherit" component={Link} to="/profile">Profile</Button>
        <IconButton color="inherit" component={Link} to="/cart">
          <ShoppingCart />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
