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
import { LoadingDashboard } from 'views/Dashboard/LoadingDashboard';

const store = configureStore();

function App({ }) {

  const [isAuthAlive, setIsAuthAlive] = useState(false)

  const onKeycloakEvent = async (event, error) => {
    console.log("%c Keycloak Event %c" + " - " + new Date(), "background:#CDF1E3; border-radius:5px;font-weight: bold;", "", event, error);
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
        autoRefreshToken={true}
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