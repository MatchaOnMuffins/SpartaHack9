import React from 'react';
import {Typography, Paper } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import SignIn from './SignIn';
import {useNavigate} from 'react-router-dom'
import { useEffect} from "react";

const HeroPage = () => {

    const {isAuthenticated} = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        // Check if the user is already logged in
        if (isAuthenticated) {
          // Redirect to the home page or another route if needed
          navigate('/dash');
        }
      }, [isAuthenticated, navigate]);
    
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        padding: '20px',
        borderRadius: '15px',
        backgroundColor:'primary.main'
      }
    }
    >
      <Typography variant="h2" component="div" gutterBottom sx={{textAlign: 'center' }} color="secondary">
        Welcome to VTA!
      </Typography>
      <Typography variant="subtitle1" sx={{textAlign: 'center', mb: 4 }} color="secondary">
        Explore, Learn, and Enjoy!
      </Typography>
      <SignIn/>
    </Paper>
  );
};

export default HeroPage;
