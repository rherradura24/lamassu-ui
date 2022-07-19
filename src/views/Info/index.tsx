import { Box, Divider, Grid, Paper, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export const InfoView = () => {
    const theme = useTheme();
    const caInfo: Array<[string, any]> = [
        ["Version", "1.0.0"],
        ["Build", "606fa0a84ea055932e0ae9e38a72f14f6284291b"],
        ["Certificate Engine Provider", "SoftHSM v2.0"],
        ["Cryptoki version", "2.40"],
        ["Manufacturer", "SoftHSM"],
        ["Library", "Implementation of PKCS11 (ver 2.6)"],
        ["RSA Supported", true],
        ["RSA Minimum Key Size (bits)", "512"],
        ["RSA Maximum Key Size (bits)", "16384"],
        ["EC Supported", false],
        ["EC Minimum Key Size (bits)", "-"],
        ["EC Maximum Key Size (bits)", "-"]
    ];

    const dmsInfo: Array<[string, any]> = [
        ["Version", "1.0.0"],
        ["Build", "606fa0a84ea055932e0ae9e38a72f14f6284291b"]
    ];

    const deviceManagerInfo: Array<[string, any]> = [
        ["Version", "1.0.0"],
        ["Build", "606fa0a84ea055932e0ae9e38a72f14f6284291b"],
        ["Minimum Reenrollment Days", "10 days"]
    ];

    const cloudProxyInfo: Array<[string, any]> = [
        ["Version", "1.0.0"],
        ["Build", "606fa0a84ea055932e0ae9e38a72f14f6284291b"]
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <Grid sx={{ overflowY: "auto", flexGrow: 1, height: "300px" }} component={Paper}>
                <Box style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box style={{ padding: "40px" }}>
                        <Grid item container spacing={2} justifyContent="flex-start">
                            <Grid item xs={12}>
                                <Box style={{ display: "flex", alignItems: "center" }}>
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px" }}>CA</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid sx={{ marginBottom: "20px" }}>
                            <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginTop: "10px" }}>Version, Build number, and other information regarding Lamassu CA API</Typography>
                        </Grid>

                        <Box component={Paper} sx={{
                            height: "75px",
                            width: "150px",
                            backgroundImage: "url('assets/vault.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            marginBottom: "20px"
                        }} />

                        {
                            caInfo.map((info: any, index: number) => {
                                console.log(info[1], typeof info[1] === "string");

                                return (
                                    <Grid key={index} item container spacing={2} justifyContent="space-between">
                                        <Grid item xs={6}>
                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 13, marginTop: "10px" }}>{info[0]}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {
                                                typeof info[1] === "boolean" && (
                                                    info[1] === true
                                                        ? (
                                                            <CheckCircleIcon htmlColor={theme.palette.success.main} />
                                                        )
                                                        : (
                                                            <CancelIcon htmlColor={theme.palette.error.main} />
                                                        )
                                                )
                                            }
                                            {
                                                typeof info[1] === "string" && (
                                                    <Typography style={{ color: theme.palette.text.primaryLight, fontWeight: "500", fontSize: 13 }}>
                                                        {info[1]}
                                                    </Typography>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }

                        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                        <Grid item container spacing={2} justifyContent="flex-start">
                            <Grid item xs={12}>
                                <Box style={{ display: "flex", alignItems: "center" }}>
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px" }}>DMS Enroller</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid sx={{ marginBottom: "10px" }}>
                            <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginTop: "10px" }}>Version, Build number, and other information regarding Lamassu DMS Enroller API</Typography>
                        </Grid>
                        {
                            dmsInfo.map((info: any, index: number) => {
                                return (
                                    <Grid key={index} item container spacing={2} justifyContent="space-between">
                                        <Grid item xs={6}>
                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 13, marginTop: "10px" }}>{info[0]}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {
                                                typeof info[1] === "boolean" && (
                                                    <CheckCircleIcon htmlColor={theme.palette.success.main} />
                                                )
                                            }
                                            {
                                                typeof info[1] === "string" && (
                                                    <Typography style={{ color: theme.palette.text.primaryLight, fontWeight: "500", fontSize: 13 }}>
                                                        {info[1]}
                                                    </Typography>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                        <Grid item container spacing={2} justifyContent="flex-start">
                            <Grid item xs={12}>
                                <Box style={{ display: "flex", alignItems: "center" }}>
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px" }}>Device Manager</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid sx={{ marginBottom: "10px" }}>
                            <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginTop: "10px" }}>Version, Build number, and other information regarding Lamassu Device Manager API</Typography>
                        </Grid>
                        {
                            deviceManagerInfo.map((info: any, index: number) => {
                                return (
                                    <Grid key={index} item container spacing={2} justifyContent="space-between">
                                        <Grid item xs={6}>
                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 13, marginTop: "10px" }}>{info[0]}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {
                                                typeof info[1] === "boolean" && (
                                                    <CheckCircleIcon htmlColor={theme.palette.success.main} />
                                                )
                                            }
                                            {
                                                typeof info[1] === "string" && (
                                                    <Typography style={{ color: theme.palette.text.primaryLight, fontWeight: "500", fontSize: 13 }}>
                                                        {info[1]}
                                                    </Typography>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                        <Divider sx={{ marginTop: "20px", marginBottom: "20px" }} />
                        <Grid item container spacing={2} justifyContent="flex-start">
                            <Grid item xs={12}>
                                <Box style={{ display: "flex", alignItems: "center" }}>
                                    <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px" }}>Cloud Proxy</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid sx={{ marginBottom: "10px" }}>
                            <Typography style={{ color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginTop: "10px" }}>Version, Build number, and other information regarding Lamassu Cloud Proxy API</Typography>
                        </Grid>
                        {
                            cloudProxyInfo.map((info: any, index: number) => {
                                return (
                                    <Grid key={index} item container spacing={2} justifyContent="space-between">
                                        <Grid item xs={6}>
                                            <Typography style={{ color: theme.palette.text.primary, fontWeight: "500", fontSize: 13, marginTop: "10px" }}>{info[0]}</Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            {
                                                typeof info[1] === "boolean" && (
                                                    <CheckCircleIcon htmlColor={theme.palette.success.main} />
                                                )
                                            }
                                            {
                                                typeof info[1] === "string" && (
                                                    <Typography style={{ color: theme.palette.text.primaryLight, fontWeight: "500", fontSize: 13 }}>
                                                        {info[1]}
                                                    </Typography>
                                                )
                                            }
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
};
