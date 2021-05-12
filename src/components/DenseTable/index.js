import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    paddingLeft: 0,
  }, // a style rule
});

export default function DenseTable({ data, dense }) {
    
  const classes = useStyles();

    return (
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.label}>
                <TableCell component="th" scope="row" className={dense && classes.root} width={150}>
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
  