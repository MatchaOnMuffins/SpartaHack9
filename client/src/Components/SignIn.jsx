import * as React from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

export default function SignIn() {
const { loginWithRedirect } = useAuth0();
  return (
      <Button  color="inherit" onClick={loginWithRedirect}>
        Sign in
      </Button>
  );
}