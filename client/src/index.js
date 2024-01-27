import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import SignIn from './Components/signin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain="dev-z380ibh4oio2lb58.us.auth0.com"
    clientId="NXf8bfjafsYZTNNdbEIvL4JFY0eGI63q"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  <SignIn />
  </Auth0Provider>
    
);
