import { useAppSelector } from "ducks/hooks";
import React from "react";
import * as caSelector from "ducks/features/cas/reducer";
import { useTheme } from "@mui/system";
import { Grid } from "@mui/material";
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";

interface Props {
    caName: string
}

export const CertificateView: React.FC<Props> = ({ caName }) => {
    const theme = useTheme();
    const themeMode = theme.palette.mode;

    const caData = useAppSelector((state) => caSelector.getCA(state, caName)!);
    const decodedCert = window.atob(caData.certificate);

    return (
        <Grid item container sx={{ width: "100%" }} spacing={1}>
            <SyntaxHighlighter language="json" style={themeMode === "light" ? materialLight : materialOceanic} customStyle={{ fontSize: 10, padding: 20, borderRadius: 10, width: "fit-content", height: "fit-content" }} wrapLines={true} lineProps={{ style: { color: theme.palette.text.primaryLight } }}>
                {decodedCert}
            </SyntaxHighlighter>
        </Grid>
    );
};
