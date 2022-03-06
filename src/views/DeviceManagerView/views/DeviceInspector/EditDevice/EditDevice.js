import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react"
import { Button, Grid, Menu, Paper, Skeleton, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system";
import { IconPicker } from "components/IconDisplayer/IconPicker";
import TagsInput from "components/LamassuComponents/TagsInput";
import { BlockPicker } from "react-color";

export const EditDevice = ({refreshing, deviceId, deviceData}) => {
    console.log(refreshing, deviceId, deviceData);
    const theme = useTheme()
    const [editableDeviceData, setEditableDeviceData] = useState(deviceData)
    
    const [anchorElColorPicker, setAnchorElColorPicker] = useState(null);
    
    const handleClickColorPicker = (event) => {
        if (anchorElColorPicker !== event.currentTarget) {
            setAnchorElColorPicker(event.currentTarget);
        }
    }

    const handleCloseColorPicker = (event) => {
        setAnchorElColorPicker(null);
    }
    useEffect(()=>{
        setEditableDeviceData(deviceData)
    }, [deviceData])

    if(!refreshing && editableDeviceData == undefined) {
        return (
            <div>Resource not found</div>
        )
    }

    return (
        <Grid container sx={{padding: "20px"}}>
            <Grid item sm={6} xl={4} container component={Paper}>
                <Grid item xs={12} container sx={{padding: "20px", borderBottom: `1px solid ${theme.palette.divider}`}}>
                    <Typography sx={{fontWeight: "400", fontSize: 22}}>Edit Device</Typography>
                </Grid>
                <Grid item xs={12} container sx={{padding: "20px"}} spacing={2}>
                    <Grid item xs={12} container alignItems={"center"}>
                        <Grid item xs={4}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <Typography sx={{fontWeight: "400"}}>Icon</Typography>
                                )
                            }
                        </Grid>
                        <Grid item xs={8}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <IconPicker value={editableDeviceData.icon} onChange={newIcon=>{setEditableDeviceData(prevData => ({...prevData, icon: newIcon}))}}/>
                                )
                            }
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems={"center"}>
                        <Grid item xs={4}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <Typography sx={{fontWeight: "400"}}>Color</Typography>
                                )
                            }
                        </Grid>
                        <Grid item xs={8}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <>
                                        <Box onClick={ev => handleClickColorPicker(ev)} sx={{width: 30, height: 30, borderRadius: 30, cursor: "pointer", background: editableDeviceData.icon_color}}/>
                                        <Menu
                                            sx={{marginTop: 1, width: "770px", borderRadius: 0}}
                                            MenuListProps={{style: {padding: 0}}}
                                            id="simple-menu"
                                            anchorEl={anchorElColorPicker}
                                            open={Boolean(anchorElColorPicker)}
                                            onClose={handleCloseColorPicker}
                                        > 
                                            <BlockPicker triangle="hide" color={editableDeviceData.icon_color} onChange={newColor=>{setEditableDeviceData(prevData => ({...prevData, icon_color: newColor.hex}))}}/>
                                        </Menu>
                                    </>
                                )
                            }
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems={"center"}>
                        <Grid item xs={4}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <Typography sx={{fontWeight: "400"}}>Device Alias</Typography>
                                )
                            }
                        </Grid>
                        <Grid item xs={8}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <TextField
                                        variant="standard"
                                        value={editableDeviceData.alias}
                                        fullWidth
                                    />
                                )
                            }
                            
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems={"center"}>
                        <Grid item xs={4}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <Typography sx={{fontWeight: "400"}}>Description</Typography>
                                )
                            }
                        </Grid>
                        <Grid item xs={8}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <TextField
                                        variant="standard"
                                        value={editableDeviceData.description}
                                        fullWidth
                                        multiline
                                    />
                                )
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container alignItems={"center"}>
                        <Grid item xs={4}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <Typography sx={{fontWeight: "400"}}>Tags</Typography>
                                )
                            }
                        </Grid>
                        <Grid item xs={8}>
                            {
                                refreshing ? (
                                    <Skeleton variant="rect" width={"100%"} height={22} />
                                ) : (
                                    <TagsInput
                                        tags={editableDeviceData.tags}
                                        selectedTags={(tags)=>{}}
                                        fullWidth
                                        variant="standard"
                                    />
                                )
                            }
                        </Grid>
                    </Grid>
                    <Grid item xs={12} container justifyContent={"flex-end"}>
                        <Box sx={{marginTop: "20px"}}>
                            <Button variant="outlined" sx={{marginRight: "15px"}}>Cancel</Button>
                            <Button variant="contained">Save</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}