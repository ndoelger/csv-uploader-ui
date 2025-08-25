// import { StrictMode } from 'react'
import { Auth0Provider } from '@auth0/auth0-react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const domain: string = import.meta.env.VITE_DOMAIN || '';

console.log(domain)
const clientId: string = import.meta.env.VITE_CLIENT_ID || '';
console.log(clientId)

createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <App />
  </Auth0Provider>
);
