// import { StrictMode } from 'react'
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain="dev-tm4xrzwhmq41km04.us.auth0.com"
    clientId="RqBl7W7Ybddt8KMClLVPcfbsrP95osFM"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
);
