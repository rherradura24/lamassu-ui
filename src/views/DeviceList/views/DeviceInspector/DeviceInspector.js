import { useTheme } from "@emotion/react";
import { Button, Divider, Grid, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { DynamicIcon } from "components/IconDisplayer/DynamicIcon"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import moment from "moment";
import { LamassuChip } from "components/LamassuComponents/Chip";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { materialLight, materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LamassuTable } from "components/LamassuComponents/Table";
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { purple } from "@mui/material/colors";
import { GrayButton } from "components/LamassuComponents/GrayButton";

export const DeviceInspector = ({deviceId, deviceData}) => {
    console.log(deviceId,deviceData);
    const theme = useTheme()
    const decodedCert = deviceData !== undefined ? window.atob(deviceData.pem_base64) : ""
    const themeMode = theme.palette.mode

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
          setAnchorEl(event.currentTarget);
        }
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }


    const certificates = [
        {
            serial_number: "1c-45-7e-7c-30-8d-84-1c-9f-bb-13-28-59-62-00-34-97-08-29-e6",
            ca_name: "Lamassu-Root-CA2-RSA2048",
            status: "Active",
            status_color: "green",
            valid_from: "2022-02-09 08:33:20 +0000 UTC",
            valid_to: "2052-02-02 08:33:49 +0000 UTC"
        },
        {
            serial_number: "bb-13-28-59-62-00-34-97-08-29-e6-1c-45-7e-7c-30-8d-84-1c-9f",
            ca_name: "Lamassu-Root-CA2-RSA2048",
            status: "Revoked",
            status_color: "red",
            valid_from: "2022-02-09 08:33:20 +0000 UTC",
            valid_to: "2052-02-02 08:33:49 +0000 UTC"
        },
        {
            serial_number: "30-8d-84-1c-9f-bb-13-1c-45-7e-7c-28-59-62-00-34-97-08-29-e6",
            ca_name: "Lamassu-Root-CA2-RSA2048",
            status: "Revoked",
            status_color: "red",
            valid_from: "2022-02-09 08:33:20 +0000 UTC",
            valid_to: "2052-02-02 08:33:49 +0000 UTC"
        },
    ]

    const certTableColumns = [
        {key: "serialNumber", title: "Serial Number", align: "start", size: 3},
        {key: "caName", title: "CA Name", align: "center", size: 2},
        {key: "certificateStatus", title: "Certificate Status", align: "center", size: 1},
        {key: "issuedDate", title: "Issued Date", align: "center", size: 1},
        {key: "revokeDate", title: "Expiration/Revocation Date", align: "center", size: 1},
    ]

    const certificatesRenderer = certificates.map(cert => {
        return {
            serialNumber: <Typography style={{fontWeight: "500", fontSize: 13, color: theme.palette.text.primary}}>#{cert.serial_number.replaceAll("-","")}</Typography>,
            caName: <Typography style={{fontWeight: "500", fontSize: 13, color: theme.palette.text.primary}}>#{cert.ca_name}</Typography>,
            certificateStatus:(
                <LamassuChip label={cert.status} color={cert.status_color}/>
            ), 
            issuedDate: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{moment(cert.valid_from).format("DD-MM-YYYY")}</Typography>,
            revokeDate: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{moment(cert.valid_to).format("DD-MM-YYYY")}</Typography>,
        }
    })

    return (
        deviceData !== undefined && (
            <Box sx={{width: "100%"}}>
                <Box sx={{padding: "20px", width: "calc(100% - 40px)", borderRadius: 0}} component={Paper}>
                    <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <Box sx={{display: "flex", alignItems: "center"}}>
                            <Box component={Paper} sx={{padding: "5px", background: deviceData.icon_color, borderRadius: 2, width: 40, height: 40, display: "flex",justifyContent:"center", alignItems:"center" }}>
                                <DynamicIcon icon={deviceData.icon} size={30} color="#fff"/>
                            </Box>
                            <Box sx={{marginLeft: "15px"}}>
                                <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px"}}>{deviceData.alias}</Typography>
                                <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13}}>#{deviceData.id}</Typography>
                            </Box>
                            <Box sx={{marginLeft: "25px"}}>
                                    <Grid item container alignItems={"center"} flexDirection="column" spacing={0}>
                                        <Grid item container>
                                            <LamassuChip label={"Provisioned"} color="green" />
                                        </Grid>
                                        <Grid item container>
                                            <Box style={{display: "flex", alignItems: "center", marginTop: "3px"}}>
                                                <AccessTimeIcon style={{color: theme.palette.text.secondary, fontSize: 15,marginRight: 5}}/>
                                                <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13}}>{`Creation date: ${moment(deviceData.createdTs).format("DD/MM/YYYY")}`}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                            </Box>
                            <Box sx={{marginLeft: "55px"}}>
                                <Grid container sx={{width: "200px"}} spacing={0}>
                                    <Grid item container alignItems={"center"}>
                                        <Grid item xs={6} container>
                                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginRight: "5px"}}>Key Strength:</Typography>
                                        </Grid>
                                        <Grid item xs={6} container>
                                            <LamassuChip label={"Medium"} color="orange" />
                                        </Grid>
                                    </Grid>
                                    <Grid item container alignItems={"center"}>
                                        <Grid item xs={6} container>
                                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginRight: "5px"}}>Key Properties:</Typography>
                                        </Grid>
                                        <Grid item xs={6} container>
                                            <Box style={{display: "flex", alignItems: "center", marginTop: "3px"}}>
                                                <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginRight: "5px"}}>RSA 2048</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{marginLeft: "35px"}}>
                                {
                                    deviceData.tags.length > 0 ? (
                                        <Grid item xs={12} container spacing={1} style={{marginTop: "1px"}}>
                                            {
                                                deviceData.tags.map(tag => (
                                                    <Grid item>
                                                        <LamassuChip color={["#555", "#EEEEEE"]} label={tag} compact={true} compactFontSize/>
                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    ) : (
                                        <Grid item xs={12} style={{height: 37}}/>
                                    )
                                }
                            </Box>
                        </Box>
                        <Grid container spacing={2} sx={{width: "fit-content"}}>
                            <Grid item>
                                <IconButton onClick={()=>{}} style={{backgroundColor: theme.palette.primary.light}}>
                                    <RefreshIcon style={{color: theme.palette.primary.main}}/>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <GrayButton variant="contained" disableFocusRipple disableRipple endIcon={anchorEl ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={handleClick}>Actions</GrayButton>
                                <Menu
                                    style={{marginTop: 1, width: 200, borderRadius: 0}}
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    // MenuListProps={{ onMouseLeave: handleClose }}
                                >
                                    <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>Edit</MenuItem>
                                    <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>Revoke Certificate</MenuItem>
                                    <MenuItem style={{width: "100%"}} onClick={(ev)=>{}} disabled>Delete Device</MenuItem>
                                </Menu>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Box sx={{height: "100%", padding: "30px"}}>
                    <Grid container gap={5}>
                        <Grid item xs={3} component={Paper}>
                            <Box sx={{padding: "15px"}}>
                                <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 18}}>Active Certificate Details</Typography>
                            </Box>
                            <Divider />
                            <Box>
                                <Box style={{display: "flex", flexDirection: "column", padding: "15px"}}>
                                    <Box>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>CA Name</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>Lamassu-Root-CA2-RSA2048</Typography>
                                    </Box>
                                    <Box style={{marginTop: "10px"}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>Certificate Serial Number</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>43-df-be-13-b8-be-e4-6f-af-87-45-51-1f-7e-4d-27-88-21-9f-88</Typography>
                                    </Box>
                                    <Box style={{marginTop: "10px"}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>Expires</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>02/03/2022</Typography>
                                    </Box>
                                </Box>
                                <Divider />
                                <Box style={{display: "flex", flexDirection: "column", padding: "15px"}}>
                                    <Box style={{marginTop: "5px"}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>Country (C)</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>ES</Typography>
                                    </Box>
                                    <Box style={{marginTop: "5px"}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>State (ST)</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>Gipuzkoa</Typography>
                                    </Box>
                                    <Box style={{marginTop: "5px"}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>Locality (L)</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>Arrasate</Typography>
                                    </Box>
                                    <Box style={{marginTop: "5px"}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>Organization (O)</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>Ikerlan</Typography>
                                    </Box>
                                    <Box style={{marginTop: "5px"}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>Organization Unit (OU)</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>ZPD</Typography>
                                    </Box>
                                    <Box style={{marginTop: "5px"}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 14}}>Common Name (CN)</Typography>
                                        <Typography style={{color: theme.palette.text.primaryLight, fontWeight: "400", fontSize: 14}}>{deviceData.id}</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs component={Paper}>
                            <Box sx={{padding: "15px"}}>
                                <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 18}}>Certificates</Typography>
                            </Box>
                            <Divider />
                            <Box sx={{height: "100%", padding: "20px"}}>
                                <LamassuTable columnConf={certTableColumns} data={certificatesRenderer}/>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        )
    )
}