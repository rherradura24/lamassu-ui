import React, { useState } from "react"

import { useTheme } from "@emotion/react"
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputBase, Menu, MenuItem, Paper, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { dmsStatus } from "redux/ducks/dms-enroller/Constants";
import { LamassuTable } from "components/LamassuComponents/Table";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { ColoredButton } from "components/LamassuComponents/ColoredButton";
import {AiOutlineSearch} from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate } from "react-router-dom";
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ApproveDms from "../DmsActions/ApproveDms";
import DeclineDms from "../DmsActions/DeclineDms";
import RevokeDms from "../DmsActions/RevokeDms";

export const DmsList = ({dmsList}) => {
    const theme = useTheme()

    const navigate = useNavigate()

    const [selectedDmsId, setSelectedDmsId] = useState();

    const [isDialogOpen, setIsDialogOpen] = useState({open: false});

    const [anchorElSort, setAnchorElSort] = useState(null);
    const handleClick = (event) => {
        if (anchorElSort !== event.currentTarget) {
            setAnchorElSort(event.currentTarget);
        }
    }

    const handleCloseSort = (event) => {
        setAnchorElSort(null);
    }

    const dmsTableColumns = [
        {key: "id", title: "DMS ID", align: "start", size: 3},
        {key: "name", title: "Name", align: "center", size: 2},
        {key: "creation", title: "Creation Date", align: "center", size: 1},
        {key: "status", title: "Status", align: "center", size: 1},
        {key: "expiration", title: "Expiration / Revocation / Rejection Date", align: "center", size: 1},
        {key: "keystrength", title: "Key Strength", align: "center", size: 1},
        {key: "keyprops", title: "Key Properties", align: "center", size: 1},
        {key: "enrolled", title: "Enrolled Devices", align: "center", size: 1},
        {key: "actions", title: "Actions", align: "center", size: 2},
    ]

    const dmsRender = dmsList.map(dms => {
        return {
            id: <Typography style={{fontWeight: "500", fontSize: 14, color: theme.palette.text.primary}}>#{dms.id}</Typography>,
            name: <Typography style={{fontWeight: "500", fontSize: 14, color: theme.palette.text.primary}}>{dms.name}</Typography>,
            status: <LamassuChip label={dms.status} color={dms.status_color} />,
            creation:  <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center"}}>{dms.request_date}</Typography>,
            keystrength: <LamassuChip label={dms.key_metadata.strength} color={dms.key_metadata.strength_color} />,
            keyprops: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center"}}>{`${dms.key_metadata.type} ${dms.key_metadata.bits}`}</Typography>,
            enrolled: (dms.status === dmsStatus.APPROVED || dms.status === dmsStatus.REVOKED) ? (
                <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center"}}>{dms.authorized_enroll_requests}</Typography>
            ) : (
                <Typography>-</Typography>
            ),
            expiration: (dms.status === dmsStatus.REVOKED || dms.status === dmsStatus.APPROVED || dms.status === dmsStatus.REJECTED) ? (
                <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center"}}>{dms.status === dmsStatus.REVOKED ? dms.revocation_date : (dms.status === dmsStatus.APPROVED ? dms.expiration_date : dms.rejection_date)}</Typography>
            ) : (
                <Typography>-</Typography>
            ),
            actions: (
                <Box>
                    <Grid container spacing={1} alignItems="center">
                        {
                            dms.status === dmsStatus.PENDING ? (
                                <>
                                    <Grid item>
                                        <ColoredButton 
                                            customtextcolor={theme.palette.success.main} 
                                            customcolor={theme.palette.success.light} 
                                            startIcon={<DoneIcon />} 
                                            variant="contained" 
                                            size="small" 
                                            onClick={()=>{
                                                setSelectedDmsId(dms.id)
                                                setIsDialogOpen({open: true, type: "APPROVE"})
                                            }}
                                        >
                                            Approve
                                        </ColoredButton>
                                    </Grid>
                                    <Grid item>
                                        <ColoredButton 
                                            customtextcolor={theme.palette.error.main} 
                                            customcolor={theme.palette.error.light} 
                                            startIcon={<CloseIcon />}
                                            variant="contained" 
                                            size="small"
                                            onClick={()=>{
                                                setSelectedDmsId(dms.id)
                                                setIsDialogOpen({open: true, type: "DECLINE"})
                                            }}
                                        >
                                            Reject
                                        </ColoredButton>
                                    </Grid>
                                </>
                            ) : (
                                dms.status === dmsStatus.APPROVED ? (
                                    <>
                                        <Grid item>
                                            <ColoredButton 
                                                customtextcolor={theme.palette.error.main} 
                                                customcolor={theme.palette.error.light} 
                                                startIcon={<CloseIcon />} 
                                                variant="contained" 
                                                size="small"
                                                onClick={()=>{
                                                    setSelectedDmsId(dms.id)
                                                    setIsDialogOpen({open: true, type: "REVOKE"})
                                                }}
                                            >
                                                Revoke
                                            </ColoredButton>
                                        </Grid>
                                        <Grid item>
                                            <Box component={Paper} elevation={0} style={{borderRadius: 8, background: theme.palette.background.lightContrast, width: 35, height: 35}}>
                                                <IconButton>
                                                    <FormatAlignJustifyIcon fontSize={"small"} />
                                                </IconButton>
                                            </Box>
                                        </Grid>
                                    </>
                                ) : (
                                    <></>
                                )
                            )
                        }
                    </Grid>
                </Box>
            )
        }
    })

    return (
        <Grid container style={{height: "100%"}}>
            <Grid item xs={12} container>
                <Box sx={{padding: "25px", width: "calc(100% - 50px)", height: "calc(100% - 50px)"}}>
                    <Grid container alignItems={"center"} justifyContent="space-between" sx={{marginBottom: "35px"}}>
                        <Grid item xs="auto" container alignItems={"center"}>
                            <Box component={Paper} sx={{padding: "5px", height: 30, display: "flex", alignItems: "center", width: 300}}>
                                <AiOutlineSearch size={20} color="#626365" style={{marginLeft: 10, marginRight: 10}}/>
                                <InputBase fullWidth={true} style={{color: "#555", fontSize: 14}}/>
                            </Box>
                            <Box component={Paper} elevation={0} style={{borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40, marginLeft: 10}}>
                                <IconButton style={{background: theme.palette.primary.light}} onClick={()=>{navigate("create")}}>
                                    <AddIcon style={{color: theme.palette.primary.main}}/>
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item xs="auto" container spacing={4}>
                            <Grid item xs="auto" container alignItems={"center"} spacing={2}>
                                <Grid item>
                                    <Typography variant="button">Sort By</Typography>
                                </Grid>
                                <Grid item>
                                    <ColoredButton customtextcolor={theme.palette.text.primary} customcolor={theme.palette.gray.light} size="small" variant="contained" disableFocusRipple disableRipple endIcon={anchorElSort ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} onClick={handleClick}>Name</ColoredButton>
                                    <Menu
                                        style={{marginTop: 1, width: 200, borderRadius: 0}}
                                        id="simple-menu"
                                        anchorEl={anchorElSort}
                                        open={Boolean(anchorElSort)}
                                        onClose={handleCloseSort}
                                        // MenuListProps={{ onMouseLeave: handleClose }}
                                    >
                                        <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>Name</MenuItem>
                                        <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>ID</MenuItem>
                                        <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>Status</MenuItem>
                                        <MenuItem style={{width: "100%"}} onClick={(ev)=>{}}>Enrolled Devices</MenuItem>
                                    </Menu>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Box sx={{padding: "25px", height: "calc(100% - 125px)"}} component={Paper}>
                        <LamassuTable data={dmsRender} columnConf={dmsTableColumns} />
                    </Box>
                </Box>
            </Grid>
            
            {
                isDialogOpen.open && (
                    <>
                        {
                            isDialogOpen.type == "APPROVE" && (
                                <ApproveDms dmsId={selectedDmsId} isOpen={isDialogOpen.open} onClose={()=>{setIsDialogOpen({open:false})}}/>
                            )
                        }

                        {
                            isDialogOpen.type == "DECLINE" && (
                                <DeclineDms dmsId={selectedDmsId} isOpen={isDialogOpen.open} onClose={()=>{setIsDialogOpen({open:false})}}/>
                            )
                        }

                        {
                            isDialogOpen.type == "REVOKE" && (
                                <RevokeDms dmsId={selectedDmsId} isOpen={isDialogOpen.open} onClose={()=>{setIsDialogOpen({open:false})}}/>
                            )
                        }
                    </>
                )
            }
        </Grid>
    )
}