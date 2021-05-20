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

function uncamelize(str, separator) {
  // Assume default separator is a single space.
  if(typeof(separator) == "undefined") {
    separator = " ";
  }
  // Replace all capital letters by separator followed by lowercase one
  var str = str.replace(/[A-Z]/g, function (letter) 
  {
    return separator + letter.toLowerCase();
  });
  // Remove first separator
  return str.replace("/^" + separator + "/", '');
}

function capitalizeFirstLetter(words) {
  var separateWord = words.toLowerCase().split(' ');
  for (var i = 0; i < separateWord.length; i++) {
     separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
     separateWord[i].substring(1);
  }
  return separateWord.join(' ');
}


export default function DenseTable({ data, dense, parseRowTitle=false }) {


    
  const classes = useStyles();

    return (
      <TableContainer>
        <Table size="small" aria-label="a dense table">
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.label}>
                <TableCell component="th" scope="row" className={dense && classes.root} width={150}>
                  {capitalizeFirstLetter(uncamelize(row.label.replace("_", " ")))}
                </TableCell>
                <TableCell align="left">{row.content}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
  