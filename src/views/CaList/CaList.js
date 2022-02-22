import { Divider, Grid, IconButton, InputBase, Paper, Tab, Tabs, Button, Typography, Popper, Fade, Slide, LinearProgress } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { CertificateCard } from "views/CaList/components/CertificateCard"
import React, { useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {AiOutlineSearch} from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


import { Overview } from "./views/CertificateOverview";
import  IssuedCertificates from "./views/IssuedCertificates";
import { CloudProviders } from "./views/CloudProviders";
import { CreateCA } from "./views/CreateCA";
import { ImportCA } from "./views/ImportCA";
import { LamassuChip } from "components/LamassuComponents/Chip";
import moment from "moment";

export const CaList = ({refreshing, caList}) => {
    const theme = useTheme()

    const containerRef = React.useRef(null);

    const contentType = {
        CA_DETAIL: "CA_DETAIL",
        CA_ACTION: "CA_ACTION",
    }

    const [filteredCaList, setFilteredCaList] = useState(caList)
    const [mainContent, setMainContent] = useState()
    const [selectedCa, setSelectedCa] = useState()
    const [selectedTab, setSelectedTab] = useState(0)
    const [isMoadlOpen, setIsMoadlOpen] = useState(false);
       
    useEffect(()=>{
        setSelectedTab(0)
    }, [selectedCa])

    useEffect(()=>{
        if(mainContent == contentType.CA_ACTION){
            setSelectedCa({})
        }
    }, [mainContent])

    useEffect(()=>{
        setFilteredCaList(caList)
    }, [caList])

    const filterCAs = (partialCaName) => {
        const interlanlFilteredCaList = caList.filter(caItem => {
            const lowecaseCaName = caItem.name.toLocaleLowerCase()
            const lowercasePartialCaName = partialCaName.toLocaleLowerCase()
            return lowecaseCaName.includes(lowercasePartialCaName)
        })
        setFilteredCaList(interlanlFilteredCaList)
    }
    
    return(
        <Grid container style={{height: "100%"}}>
            <Grid item xs={5} xl={3} container direction="column" style={{background: theme.palette.background.lightContrast}}>
                <Box style={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <Box container style={{padding: 20}}>
                        <Grid item xs={12} container alignItems="center">
                            <Grid item xs={10}>
                                <Box component={Paper} sx={{padding: "5px", height: 30, display: "flex", alignItems: "center", width: "100%"}}>
                                    <AiOutlineSearch size={20} color="#626365" style={{marginLeft: 10, marginRight: 10}}/>
                                    <InputBase  onChange={(ev)=>filterCAs(ev.target.value)} fullWidth style={{color: "#555", fontSize: 14}}/>
                                </Box>
                            </Grid>
                            <Grid item xs={2} container justifyContent={"flex-end"}>
                                <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40, marginLeft: 10}}>
                                    <IconButton style={{background: theme.palette.primary.light}} onClick={()=>{setIsMoadlOpen(true); setMainContent(contentType.CA_ACTION); setIsMoadlOpen(true)}}>
                                        <AddIcon style={{color: theme.palette.primary.main}}/>
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                        {
                            refreshing ? (
                                <LinearProgress sx={{marginTop: "20px"}}/>
                            ) : (
                                <Grid item xs={12} style={{padding: 10}}>
                                    <Typography style={{fontWeight: 500, fontSize: 12, color: theme.palette.text.primaryLight}}>{caList.length} RESULTS</Typography>
                                </Grid>
                            )
                        }
                    </Box>
                    <Box style={{padding: "0px 20px 20px 20px" , overflowY: "auto", height: 300, flexGrow: 1}}>
                        {
                            filteredCaList.map(caItem=>(
                                <Box style={{marginBottom: 20}} key={caItem.serial_number}>
                                    <CertificateCard 
                                        onClick={()=>{
                                            setSelectedCa(caItem)
                                            setMainContent(contentType.CA_DETAIL)
                                            setIsMoadlOpen(true)
                                        }} 
                                        name={caItem.name} 
                                        keyType={caItem.key_metadata.type}
                                        keySize={caItem.key_metadata.bits}
                                        keyStrength={caItem.key_metadata.strength} 
                                        keyStrengthColor={caItem.key_metadata.strength_color} 
                                        status={caItem.status} 
                                        expirationDate={caItem.valid_to} 
                                        selected={selectedCa && caItem.serial_number === selectedCa.serial_number}
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={7} xl={9} style={{height: "100%", overflow: "hidden"}} ref={containerRef}>
                <Slide direction="left" in={isMoadlOpen} container={containerRef.current} style={{height: "100%"}}>
                    <Box>
                    {
                        mainContent === contentType.CA_DETAIL && selectedCa && (
                            <Box style={{display: "flex", flexDirection: "column", height: "100%"}}>
                                <Box style={{padding: "40px 40px 0 40px"}}>
                                    <Grid item container spacing={2} justifyContent="flex-start">
                                        <Grid item xs={9}>
                                            <Box style={{display: "flex", alignItems: "center"}}>
                                                <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px"}}>{selectedCa.name}</Typography>
                                                <LamassuChip color={selectedCa.key_metadata.strength_color} label={selectedCa.key_metadata.strength} rounded/> 
                                                <LamassuChip color={selectedCa.status_color} label={selectedCa.status} rounded style={{marginLeft: "5px"}}/> 
                                            </Box>
                                        </Grid>
                                        <Grid item xs={3} container justifyContent="flex-end">
                                            <Grid item>
                                                <IconButton style={{background: theme.palette.error.light}}>
                                                    <DeleteIcon style={{color: theme.palette.error.main}}/>
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item container spacing={2} justifyContent="flex-start" style={{marginTop: 0}}>
                                        <Grid item style={{paddingTop: 0}}>
                                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13}}>#{`${selectedCa.key_metadata.type} ${selectedCa.key_metadata.bits}`}</Typography>
                                        </Grid>
                                        <Grid item style={{paddingTop: 0}}>
                                            <Box style={{display: "flex", alignItems: "center"}}>
                                                <AccessTimeIcon style={{color: theme.palette.text.secondary, fontSize: 15,marginRight: 5}}/>
                                                <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13}}>{`Expiration date: ${moment(selectedCa.valid_to).format("DD/MM/YYYY")}`}</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Box style={{marginTop: 15, position: "relative", left: "-15px"}}>
                                        <Tabs value={selectedTab} onChange={(ev, newValue)=>setSelectedTab(newValue)}>
                                            <Tab label="Overview" />
                                            <Tab label="Issued Certificates" />
                                            <Tab label="Cloud Providers" />
                                        </Tabs>
                                    </Box>
                                </Box>
                                <Divider></Divider>
                                <Box style={{padding: 40, flexGrow: 1, height: 500, overflowY: "auto"}}>
                                    <Grid container>
                                        {
                                            selectedTab === 0 && (
                                                <Overview ca={selectedCa}/>
                                            )
                                        }
                                        {
                                            selectedTab === 1 && (
                                                <IssuedCertificates caName={selectedCa.name}/>
                                            )
                                        }
                                        {
                                            selectedTab === 2 && (
                                                <CloudProviders />
                                                /* <>
                                                    <Box style={{borderRadius: 10, background: "#263238", padding: 10}}>
                                                        <SyntaxHighlighter language="json" style={materialOceanic} customStyle={{fontSize: 11}}>
                                                            {JSON.stringify(awsPolicy, null, 4)}
                                                        </SyntaxHighlighter>
                                                    </Box>

                                                </> */
                                            )
                                        }
                                    </Grid>
                                </Box>
                            </Box>
                        )
                    }
                    {
                        mainContent === contentType.CA_ACTION && (
                            <Box sx={{width: "100%"}}>
                                <Box style={{display: "flex", flexDirection: "column", height: "100%"}}>
                                    <Box style={{padding: "40px 40px 0 40px"}}>
                                        <Grid item container spacing={2} justifyContent="flex-start">
                                            <Grid item xs={12}>
                                                <Box style={{display: "flex", alignItems: "center"}}>
                                                    <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px", marginRight: "10px"}}>Create a new CA</Typography>
                                                </Box>
                                            </Grid>
                                        </Grid>
                                        <Grid>
                                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13, marginTop: "10px"}}>To create a new CA certificate, please provide the apropiate information</Typography>
                                        </Grid>
                                        <Box style={{marginTop: 15, position: "relative", left: "-15px"}}>
                                            <Tabs value={selectedTab} onChange={(ev, newValue)=>setSelectedTab(newValue)}>
                                                <Tab label="Standard" />
                                                <Tab label="Import" />
                                            </Tabs>
                                        </Box>
                                    </Box>
                                    <Divider></Divider>
                                    <Box style={{padding: "20px 40px 20px 40px", flexGrow: 1, height: 500, overflowY: "auto", height: "100%"}}>
                                        <Grid container>
                                            {
                                                selectedTab === 0 && (
                                                    <CreateCA />
                                                )
                                            }
                                            {
                                                selectedTab === 1 && (
                                                    <ImportCA />
                                                )
                                            }
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Box>
                        )
                    }
                        
                        
                    </Box>
                </Slide>                    
            </Grid>
            {/* <LamassuMultiModal 
                type={ModalType.CA_CREATION}
                open={isMoadlOpen}
                handleClose={()=>{setIsMoadlOpen(false)}} 
                handleSubmit={(ev)=>{setIsMoadlOpen(false)}} 
            /> */}
        </Grid>
    )
}