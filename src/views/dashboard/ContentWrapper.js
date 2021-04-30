import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Grid } from '@material-ui/core';

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  

export const ContentWrapper  = ({ children }) => {

    return (
        <div style={{padding: 20}}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" style={{marginBottom: 20}}>
                <Link color="inherit" href="/" onClick={handleClick} c>
                    Material-UI
                </Link>
                <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
                    Core
                </Link>
                <Typography color="textPrimary">Breadcrumb</Typography>

            </Breadcrumbs>
            {
                children
            }
        </div>
    )
}