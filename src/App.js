import logo from './logo.svg';
import './App.css';
import configureStore from './redux';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'

import Dashboard from "views/Dashboard";
import { useState } from 'react';
import { LoadingDashboard } from 'views/Dashboard/LoadingDashboard';


const store = configureStore();

function App({ }) {

  const [isAuthAlive, setIsAuthAlive] = useState(false)

  const onKeycloakEvent = async (event, error) => {
    console.log("%c Keycloak Event %c" + " - " + new Date(), "background:#CDF1E3; border-radius:5px;font-weight: bold;", "", event, error);
    if (event == "onTokenExpired") {
      console.log('The token has exprired')

      keycloak
        .updateToken(5)
        .then(function (refreshed) {
          if (refreshed) {
            console.log('Token was successfully refreshed') // '+keycloak.token);
          } else {
            console.log('Token is still valid')
          }
        })
        .catch(function () {
          console.log('Failed to refresh the token, or the session has expired')
        })

    }
  }
  
  const onKeycloakTokens = async (tokens) => {
    console.log("%c Keycloak Tokens %c" + " - " + new Date(), "background:#CDF1E3; border-radius:5px;font-weight: bold;", "", tokens);
  }

  return (
    isAuthAlive ? (
      <ReactKeycloakProvider 
        authClient={keycloak} 
        initOptions={{onLoad: "login-required"}}
        LoadingComponent={<LoadingDashboard checkAuthServer={false}/>}
        onEvent={onKeycloakEvent}
        onTokens={onKeycloakTokens}
        autoRefreshToken={false}
      >
        <Provider store={store}>
          <SnackbarProvider preventDuplicate maxSnack={3}>
            <Dashboard />
          </SnackbarProvider>
        </Provider>
      </ReactKeycloakProvider>
    ) : (
      <LoadingDashboard checkAuthServer={true} onAlive={()=>setIsAuthAlive(true)}/>
    )
  );
}

export default App;