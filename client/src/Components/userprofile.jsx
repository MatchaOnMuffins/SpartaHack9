import React, { useState } from 'react';
import { Container, Grid, Button, Drawer, Avatar, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth0 } from '@auth0/auth0-react';

const UserProfile = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const openDrawer = () => {
    setDrawerOpened(true);
  };

  const closeDrawer = () => {
    setDrawerOpened(false);
  };
  const { user } = useAuth0();

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Button onClick={openDrawer} style={{ position: 'fixed', top: 20, left: 20 }} variant="text">
            <AccountCircleIcon />
          </Button>
          <Drawer anchor="left" open={drawerOpened} onClose={closeDrawer}>
            <div style={{ padding: '16px' }}>
              <AccountCircleIcon />
              <Typography variant="h6">{`${user.name}`}</Typography>
              <Typography variant="body2">{`${user.email}`}</Typography>
              <Typography variant="body2">Student</Typography> {/* Replace with dynamic designation based on user role */}
            </div>
            {/* Add more menu items or user information as needed */}
          </Drawer>
        </Grid>
      </Grid>
      {/* Your main content goes here */}
    </Container>
  );
};

export default UserProfile;
