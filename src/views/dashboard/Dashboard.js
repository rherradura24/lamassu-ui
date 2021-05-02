import { connect } from "react-redux";
import { useKeycloak } from '@react-keycloak/web'
import AppBar from './AppBar'
import SideBar from './SideBar'
import "./Dashboard.css"
import { Box, Button, Grid, Paper } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentWrapper } from "./ContentWrapper";

import blue from '@material-ui/core/colors/blue';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";
import RightSideBar from "views/RightSidebar";
import CAList from "views/CA";

const Dashboard = ({ }) => {
  const [ darkTheme, setDarkTheme ] = useState(false)
  const [ collapsed, setCollapsed ] = useState(false)

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      primary: {
        main: "#1272E9",
      },
      secondary: {
        main: "#FF8533",
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
        <Router>
          <Box className={collapsed ? "dashboard-layout-collapsed" : "dashboard-layout"}>  
            <AppBar className="header" background={darkTheme ? "#313131" : theme.palette.primary.main}/>
            <SideBar className="sidebar" darkTheme={darkTheme} onTogleDark={()=>{setDarkTheme(!darkTheme)}} onCollapse={()=>{setCollapsed(!collapsed)}}/>
            <Box className="content">
              <Paper style={{borderRadius: 0, height: "100%", background: darkTheme ? "#4c4c4c" : ""}}>
                <Switch>
                  <Route exact path="/" render={(props) => <ContentWrapper><RightSideBar /></ContentWrapper>} />
                  <Route exact path="/ca/certs" render={(props) => <ContentWrapper><CAList /></ContentWrapper>} />
                </Switch>
              </Paper> 
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