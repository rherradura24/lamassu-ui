import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { Box, Chip, Grid, IconButton, makeStyles, Paper, Tooltip, useTheme } from '@material-ui/core';
import { blue, green, yellow, red, orange } from '@material-ui/core/colors';
import { DataGrid } from '@material-ui/data-grid';
import RightSideBar from 'views/certificates';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DenseTable from 'components/DenseTable';

import ListIcon from '@material-ui/icons/List';
import GetAppIcon from '@material-ui/icons/GetApp';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';

const CertificatesListView = ({ }) => {
  const [display, setDisplay] = useState(false);
  const theme = useTheme()
  const verbs = {
    GET: green[400],
    POST: blue[400],
    PUT: orange[400],
    DELETE: red[400],
  }

  const data = [
    {
      id: "27-a5-b8-01-55-74-d1-cc",
      status: "Issued",
      c: "ES",
      cn: "ca.lksnext.es",
      l: "Donostia",
      mail: "info@lksnext.es",
      o: "LKS",
      ou: "Next",
      st: "Gipuzkoa"
    },
    {
      id: "15-b1-34-20-ac-93-8d-a1",
      status: "Revoked",
      c: "ES",
      cn: "ca.ikerlan.es",
      l: "Arrasate",
      mail: "info@ikerlan.es",
      o: "Ikerlan",
      ou: "ZPD",
      st: "Gipuzkoa"
    },
    
  ]

  return ( 
    data.map(datapoint => (
      <Card style={{margin: 10, width: 375}}>
        <div style={{padding:10 , height: 40, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <div>
            <Typography variant="h5" component="h2" color="textPrimary">
              {datapoint.cn}
            </Typography>
          </div>
          <div>
          <Chip label="Issued" style={{background: green[400]}}/>

          </div>
        </div>
        <CardContent>
          <DenseTable />
        </CardContent>
        <CardActions disableSpacing>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
            <div>
              <Tooltip title="Emmited certs">
                <IconButton>
                  <ListIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Download CA cert">
                <IconButton>
                  <GetAppIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Inspect CA">
                <IconButton>
                    <VisibilityIcon />
                  </IconButton>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Revoke CA">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
          
        </CardActions> 
    </Card>
    ))
          
  );
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CertificatesListView);