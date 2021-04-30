import { connect } from "react-redux";
import { useKeycloak } from '@react-keycloak/web'
import AppBar from './AppBar'
import SideBar from './SideBar'
import "./Dashboard.css"
import { Button, Grid, Paper } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { ContentWrapper } from "./ContentWrapper";

import blue from '@material-ui/core/colors/blue';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CertificatesListView from "views/certificates";
import { useState } from "react";
import RightSideBar from "views/RightSidebar";

const Dashboard = ({ }) => {
  const { keycloak, initialized } = useKeycloak()
  const [ darkTheme, setDarkTheme ] = useState(false)

  const theme = createMuiTheme({
    palette: {
      type: darkTheme ? 'dark' : 'light',
      primary: {
        main: "#25ee32",
      },
      secondary: {
        main: "#FF8533",
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <div className="main-wrapper">
        <Router>
          <Grid container className="full-height">  
            <AppBar background={darkTheme ? "#313131" : theme.palette.primary.main}/>
            <SideBar darkTheme={darkTheme} onTogleDark={()=>{setDarkTheme(!darkTheme)}}/>
              <div className="fluid">
                <Paper style={{borderRadius: 0, height: "100%", background: darkTheme ? "#4c4c4c" : ""}}>
                  <Switch>
                    <Route exact path="/" render={(props) => <ContentWrapper><RightSideBar /></ContentWrapper>} />
                    <Route exact path="/ca/certs" render={(props) => <ContentWrapper><CertificatesListView /></ContentWrapper>} />
                  </Switch>
                </Paper> 
              </div>
          </Grid>
        </Router>
      </div>
    </ThemeProvider>
  );
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);