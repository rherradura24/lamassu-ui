import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { connect } from "react-redux";
import { Box, Chip, Grid, makeStyles, Paper } from '@material-ui/core';
import { blue, green, yellow, red, orange } from '@material-ui/core/colors';
import { DataGrid } from '@material-ui/data-grid';
import RightSideBar from 'views/certificates';


const CertificatesListView = ({ }) => {
  const [display, setDisplay] = useState(false);

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
      issuer: "ra.ikerlan.es",
      validFrom: "24-04-2021 15:30:00+02:00",
      validTo: "24-04-2022 16:30:00+02:00",
      subjectDN: "CN=demo.ikerlan.es",
      ca: "ca.ikerlan.es"
    },
    {
      id: "90-ac-93-8d-a1-20-b1-34",
      status: "Issued",
      issuer: "ra.ikerlan.es",
      validFrom: "24-04-2021 15:30:00+02:00",
      validTo: "24-04-2022 16:30:00+02:00",
      subjectDN: "CN=demo.ikerlan.es",
      ca: "ca.ikerlan.es"
    },
    {
      id: "a1-20-b1-34-20-ac-93-8d",
      status: "Expired",
      issuer: "ra.ikerlan.es",
      validFrom: "24-04-2020 15:30:00+02:00",
      validTo: "24-04-2021 16:30:00+02:00",
      subjectDN: "CN=demo.ikerlan.es",
      ca: "ca.ikerlan.es"
    },
    {
      id: "75-b1-34-20-ac-93-8d-a1",
      status: "Revoked",
      issuer: "ra.ikerlan.es",
      validFrom: "24-04-2021 15:30:00+02:00",
      validTo: "24-04-2022 16:30:00+02:00",
      subjectDN: "CN=demo.ikerlan.es",
      ca: "ca.ikerlan.es"
    },{
      id: "47-a5-b8-01-55-74-d1-cc",
      status: "Issued",
      issuer: "ra.ikerlan.es",
      validFrom: "24-04-2021 15:30:00+02:00",
      validTo: "24-04-2022 16:30:00+02:00",
      subjectDN: "CN=demo.ikerlan.es",
      ca: "ca.ikerlan.es"
    },
    {
      id: "30-ac-93-8d-a1-20-b1-34",
      status: "Issued",
      issuer: "ra.ikerlan.es",
      validFrom: "24-04-2021 15:30:00+02:00",
      validTo: "24-04-2022 16:30:00+02:00",
      subjectDN: "CN=demo.ikerlan.es",
      ca: "ca.ikerlan.es"
    },
    {
      id: "21-20-b1-34-20-ac-93-8d",
      status: "Expired",
      issuer: "ra.ikerlan.es",
      validFrom: "24-04-2020 15:30:00+02:00",
      validTo: "24-04-2021 16:30:00+02:00",
      subjectDN: "CN=demo.ikerlan.es",
      ca: "ca.ikerlan.es"
    },
    {
      id: "15-b1-34-20-ac-93-8d-a1",
      status: "Revoked",
      issuer: "ra.ikerlan.es",
      validFrom: "24-04-2021 15:30:00+02:00",
      validTo: "24-04-2022 16:30:00+02:00",
      subjectDN: "CN=demo.ikerlan.es",
      ca: "ca.ikerlan.es"
    },
    
  ]

  const columns = [
    { field: 'id', headerName: 'Serial Number', width: 350 },
    { field: 'status', headerName: 'Status', width: 100,
      renderCell: (params) => (
        <Chip 
          size="small"
          label={params.value}
          color="primary"
          variant="outlined"
          clickable={true}
          style={{margin:2}}
        />
      ),
    },
    { field: 'validFrom', headerName: 'Valid From', width: 250 },
    { field: 'validTo', headerName: 'Valid To', width: 250 },
    { field: 'subjectDN', headerName: 'Subject DN', width: 250 },
    { field: 'issuer', headerName: 'Issuer', width: 150 },
    { field: 'ca', headerName: 'CA', width: 150 },

  ];

  return (
      <Box component={Paper} >
        <DataGrid autoHeight={true} rows={data} columns={columns} pageSize={10} disableSelectionOnClick={false} onRowClick={(ev)=>{setDisplay(true)}}/>
      </Box>
  );
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(CertificatesListView);