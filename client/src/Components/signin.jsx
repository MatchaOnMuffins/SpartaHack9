import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useAuth0 } from '@auth0/auth0-react';

export default function SignIn() {

    

    const { loginWithRedirect } = useAuth0();


  return (
    <div>
      <Typography variant="h5">Sign in</Typography>
      <Button variant="contained" color="primary" onClick={loginWithRedirect}>
        Sign In with Auth0
      </Button>
    </div>
  );
}