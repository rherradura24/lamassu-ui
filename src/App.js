import logo from './logo.svg';
import './App.css';
import configureStore from './redux';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, {keycloakProps} from './keycloak'

import Dashboard from "views/Dashboard";
import { useState } from 'react';
import NotificationService from 'components/NotificationService';

const store = configureStore();

function App({ }) {

  const onKeycloakEvent = async (event, error) => {
    console.log(event, error);
  }

  const onKeycloakTokens = async (tokens) => {
    console.log("tokens", tokens);
  }



  return (
    <ReactKeycloakProvider 
      authClient={keycloak} 
      initOptions={{onLoad: "login-required"}}
      LoadingComponent={<div style={{padding:5}}>Loading...</div>}
      onEvent={onKeycloakEvent}
      onTokens={onKeycloakTokens}
      autoRefreshToken={true}
    >
      <Provider store={store}>
        <SnackbarProvider preventDuplicate maxSnack={3}>
          <NotificationService />
          <Dashboard />
        </SnackbarProvider>
      </Provider>
    </ReactKeycloakProvider>
  );
}

export default App;