import { connect } from "react-redux";
import { useKeycloak } from '@react-keycloak/web'

import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Paper, Tooltip, Typography, useTheme } from "@material-ui/core";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import crt from "./test.json"
import DenseTable from "components/DenseTable";

const RightSideBar = ({ }) => {
  const theme = useTheme();

  return (
    <Box component={Paper} elevation={10} style={{height: "100%", width: 600, borderRadius: 0, position: "absolute", right: 0}}>
      <div style={{padding:"5px 10px", height: 40, background: theme.palette.secondary.main, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <Typography>Certificado 45-68-25-a2-02-b1-c1-5a</Typography>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Tooltip title="Download cert">
          <IconButton>
            <GetAppIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Revoke cert">
          <IconButton>
            <DeleteIcon/>
          </IconButton>
        </Tooltip>
        <Tooltip title="Close">
          <IconButton>
            <CloseIcon/>
          </IconButton>
          </Tooltip>
        </div>
      </div>
      <div style={{overflowY: "auto", height: "100%"}}>
        <div style={{background: "#333", padding: 10}}>
          <code style={{color: "white"}}>
            {crt.key}
          </code>
        </div>
        <DenseTable data={[]}/>
      </div>
    </Box>  
  );
}


const mapStateToProps = (state) => ({ 

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps) (RightSideBar);