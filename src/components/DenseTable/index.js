import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function DenseTable() {
  
    const data = [
        {label : "Serial Number", content: "27-a5-b8-01-55-74-d1-cc"},
        {label : "Status", content: "Issued"},
        {label : "Issuer", content: "ra.ikerlan.es"},
        {label : "Valid From", content: "24-04-2021 15:30:00+02:00"},
        {label : "Valid To", content: "24-04-2022 16:20:00+02:00"},
        {label : "Subject DN", content: "demo.ikerlan.es"},
        {label : "Common Name", content: "CN=demo.ikerlan.es"},
        {label : "CA", content: "ca.ikerlan.es"},
    ]

    return (
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.label}>
                <TableCell component="th" scope="row">
                  {row.label}
                </TableCell>
                <TableCell align="left">{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  