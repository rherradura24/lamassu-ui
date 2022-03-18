import React from "react"
import { useTheme } from "@emotion/react";
import { Grid } from "@mui/material"
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialLight, materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';


export const CertificateView = ({caData}) => {
    const decodedCert = window.atob(caData.certificate.pem_base64)
    const theme = useTheme()
    const themeMode = theme.palette.mode

    return (
        <Grid item container sx={{width: "100%"}} spacing={1}>
            <SyntaxHighlighter language="json" style={themeMode == "light" ? materialLight : materialOceanic} customStyle={{fontSize: 10, padding:20, borderRadius: 10, width: "fit-content", height: "fit-content"}} wrapLines={true} lineProps={{style:{color: theme.palette.text.primaryLight}}}>
                {decodedCert}
            </SyntaxHighlighter>
        </Grid>
    )
}