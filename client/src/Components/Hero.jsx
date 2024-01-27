import React from 'react';
import { Button, Container, Typography, Paper } from '@mui/material';
import SignIn from './SignIn';

const HeroPage = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80vh',
        padding: '20px',
        borderRadius: '15px',
        backgroundColor:'primary.main'
      }
    }
    >
      <Typography variant="h2" component="div" gutterBottom sx={{textAlign: 'center' }} color="secondary">
        Welcome to VTA!
      </Typography>
      <Typography variant="subtitle1" sx={{ color: 'white', textAlign: 'center', mb: 4 }}>
        Explore, Learn, and Enjoy!
      </Typography>
      <SignIn/>
    </Paper>
  );
};

export default HeroPage;
