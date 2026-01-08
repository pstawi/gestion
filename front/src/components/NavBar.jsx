import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(localStorage.getItem('role'));

    const navigate = useNavigate();

    // setToken(localStorage.getItem('token'));

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');

        setToken(null);
        setRole(null);
        navigate('/login');
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button variant="h6" component="div" href="/" sx={{ flexGrow: 1 }}>
            Home
          </Button>
          {role === 'admin' && (
            <Button variant="h6" component="div" href="/admin" sx={{ flexGrow: 1 }}>
              Admin
            </Button>
          )}
          {token ? (
            <Button color="inherit" onClick={logout}>Logout</Button>
          ) : (
            <Button color="inherit" href="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}