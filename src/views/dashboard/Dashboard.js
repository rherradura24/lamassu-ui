import { connect } from "react-redux";
import AppBar from './AppBar'
import SideBar from './SideBar'
import "./Dashboard.css"
import { Box, Paper, Typography } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import {lightThemeConfig, darkThemeConfig} from "theme"


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";
import CAListView from "views/CA";
import Home from "views/home";
import IssuedCACerts from "views/CA/IssuedCACerts";
import { CertChecker } from "views/Utils/CertChecker";
import DMSList from "views/DMS";
import { useKeycloak } from "@react-keycloak/web";

const Dashboard = ({ }) => {
  const [ darkTheme, setDarkTheme ] = useState(false)
  const [ collapsed, setCollapsed ] = useState(false)
  const { keycloak, initialized } = useKeycloak()

  const overrides = {
    overrides: {
      MuiDataGrid: {
        cell: {
          outline: "none",
        }
      },
    }
  }
  
  const lightThemeMUI = createMuiTheme({...lightThemeConfig, ...overrides})
  
  const darkThemeMUI = createMuiTheme({...darkThemeConfig, ...overrides})

  const theme = darkTheme ? darkThemeMUI : lightThemeMUI


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box className={collapsed ? "dashboard-layout-collapsed" : "dashboard-layout"}>  
          <AppBar 
            className="header" 
            background={theme.palette.appbar.background}
            logo={
              <div style={{background: "white", borderRadius: 10, height:30, width: 120, display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Typography variant="button">Lamassu IoT</Typography>
              </div>
            }
          />
          <SideBar className="sidebar" darkTheme={darkTheme} onTogleDark={()=>{setDarkTheme(!darkTheme)}} onCollapse={()=>{setCollapsed(!collapsed)}}/>
          <Box className="content">
            <Box className={"main-content"} >
              <Paper style={{borderRadius: 0, height: "100%", background: theme.palette.background.default}}>
                <Switch>
                  <Route exact path="/" render={(props) => <Home />} />
                  <Route exact path="/dms/list" render={(props) => <DMSList />} />
                  <Route exact path="/utils/cert-checker" render={(props) => <CertChecker />} />
                  {
                    keycloak.tokenParsed.realm_access.roles.includes("admin") && (
                      <>
                        <Route path="/ca/issued-certs" render={(props) => <IssuedCACerts />} />
                        <Route exact path="/ca/certs" render={(props) => <CAListView />} /> 
                      </>                     
                  )}
                </Switch>
              </Paper> 
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);