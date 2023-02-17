import React from "react";
import { Paper, Grid, Tooltip, useTheme, IconButton } from "@mui/material";
import { materialLight, materialOceanic } from "react-syntax-highlighter/dist/esm/styles/prism";
import SyntaxHighlighter from "react-syntax-highlighter";
import Box from "@mui/material/Box/Box";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import downloadFile from "components/utils/FileDownloader";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

export const CardClipboard = (content: string, downloadFileName: string) => {
    const theme = useTheme();
    const themeMode = theme.palette.mode;

    return (
        <Grid item xs={6} container justifyContent={"center"} spacing={1}>
            <Grid item xs="auto">
                <SyntaxHighlighter language="json" style={themeMode === "light" ? materialLight : materialOceanic} customStyle={{ fontSize: 10, padding: 20, borderRadius: 10, width: "fit-content", height: "fit-content" }} wrapLines={true} lineProps={{ style: { color: theme.palette.text.primaryLight } }}>
                    {content}
                </SyntaxHighlighter>
            </Grid>
            <Grid item xs="auto" container flexDirection={"column"} spacing={1}>
                <Grid item>
                    <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                        <Tooltip title="Copy to Clipboard">
                            <IconButton onClick={(ev) => { ev.stopPropagation(); navigator.clipboard.writeText(content); }}>
                                <ContentPasteIcon fontSize={"small"} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid item>
                    <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35 }}>
                        <Tooltip title="Download">
                            <IconButton onClick={(ev) => { ev.stopPropagation(); downloadFile(downloadFileName, content); }}>
                                <FileDownloadRoundedIcon fontSize={"small"} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Grid>
    );
};
