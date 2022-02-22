import { ReactKeycloakProvider } from '@react-keycloak/web';
import { LoadingDashboard } from 'components/DashboardComponents/LoadingDashboard';
import { useState } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux/ducks';
import DashboardLayout from 'views';
import keycloak from './keycloak'

export default () => {
  
    const store = configureStore();

    const [isAuthAlive, setIsAuthAlive] = useState(false)

    const onKeycloakEvent = async (event, error) => {
        // console.log("%c Keycloak Event %c" + " - " + new Date(), "background:#CDF1E3; border-radius:5px;font-weight: bold;", "", event, error);
        if (event == "onTokenExpired") {
        //   console.log('The token has exprired')
    
          keycloak
            .updateToken(5)
            .then(function (refreshed) {
              if (refreshed) {
                // console.log('Token was successfully refreshed') // '+keycloak.token);
              } else {
                // console.log('Token is still valid')
              }
            })
            .catch(function () {
            //   console.log('Failed to refresh the token, or the session has expired')
            })
    
        }
      }

    return (
        // isAuthAlive ? (
        //     <ReactKeycloakProvider 
        //         authClient={keycloak} 
        //         initOptions={{onLoad: "login-required"}}
        //         LoadingComponent={<LoadingDashboard checkAuthServer={false}/>}
        //         onEvent={onKeycloakEvent}
        //         autoRefreshToken={true}
        //     >
                <Provider store={store}>
                  <DashboardLayout loading={false}/>
                </Provider>
                
        //     </ReactKeycloakProvider>
        // ) : (
        //     <LoadingDashboard checkAuthServer={true} onAlive={()=>setIsAuthAlive(true)}/>
        // )   
    )
}