import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from './Logout';
import SignIn from './SignIn';
import UserProfile  from './userprofile';
export default function Header() {
  
    const {isAuthenticated} = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <UserProfile />
            
          </IconButton> 
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          {
            isAuthenticated ? (
              <LogoutButton />
            ) : (
              <SignIn />
            )
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}