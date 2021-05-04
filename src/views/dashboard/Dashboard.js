import { connect } from "react-redux";
import { useKeycloak } from '@react-keycloak/web'
import AppBar from './AppBar'
import SideBar from './SideBar'
import "./Dashboard.css"
import { Box, Button, Grid, Paper } from "@material-ui/core";
import { createMuiTheme, useTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import blue from '@material-ui/core/colors/blue';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";
import CertInspectorSideBar from "views/CertInspectorSideBar";
import CAListView from "views/CA";
import Home from "views/home";
import IssuedCACerts from "views/CA/IssuedCACerts";

const Dashboard = ({ }) => {
  const [ darkTheme, setDarkTheme ] = useState(false)
  const [ collapsed, setCollapsed ] = useState(false)

  const overrides = {
    overrides: {
      MuiDataGrid: {
        cell: {
          outline: "none",
          background: "red"
        }
      }
    }
  }

  const lightThemeMUI = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      primary: {
        main: "#1272E9",
      },
      secondary: {
        main: "#FF8533",
      },
      background: {
        default: "#F5F5F5"
      },
      appbar:{
        background: "#1272E9"
      }
    },
    ...overrides
  })

  
  const darkThemeMUI = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      primary: {
        main: "#02B6DC",
      },
      secondary: {
        main: "#2F657B",
      },
      background: {
        default: "#525252"
      },
      appbar:{
        background: "#313131"
      }
    },
    ...overrides
  })

  const theme = darkTheme ? darkThemeMUI : lightThemeMUI


  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box className={collapsed ? "dashboard-layout-collapsed" : "dashboard-layout"}>  
          <AppBar className="header" background={theme.palette.appbar.background}/>
          <SideBar className="sidebar" darkTheme={darkTheme} onTogleDark={()=>{setDarkTheme(!darkTheme)}} onCollapse={()=>{setCollapsed(!collapsed)}}/>
          <Box className="content">
            <Box className={"main-content"} >
              <Paper style={{borderRadius: 0, height: "100%", background: theme.palette.background.default}}>
                <Switch>
                  <Route exact path="/" render={(props) => <Home />} />
                  <Route exact path="/ca/certs" render={(props) => <CAListView />} />
                  <Route exact path="/ca/issued-certs" render={(props) => <IssuedCACerts />} />
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