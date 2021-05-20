import { connect } from "react-redux";
import AppBar from './AppBar'
import SideBar from './SideBar'
import "./Dashboard.css"
import { Box, Paper } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';


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
      },
      certInspector:{
        tabs: "#bbb",
        separator: "#eee"
      }
    },
    ...overrides
  })

  
  const darkThemeMUI = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      primary: {
        main: "#02B6DC", //02B6DC //25ee32
      },
      secondary: {
        main: "#2F657B", //2F657B  //25ee32
      },
      background: {
        default: "#525252"
      },
      appbar:{
        background: "#313131"
      },
      certInspector:{
        tabs: "#222",
        separator: "#525252"
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
                  <Route exact path="/dms/list" render={(props) => <DMSList />} />
                  <Route exact path="/utils/cert-checker" render={(props) => <CertChecker />} />
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