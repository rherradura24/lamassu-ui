import { Box, Breadcrumbs, Button, makeStyles, Typography } from "@material-ui/core"
import { DMSCard } from "components/DMSCard"
import Link from '@material-ui/core/Link';

import AddCircleIcon from '@material-ui/icons/AddCircle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { LamassuModalPolyphormic } from "components/Modal";

const useStyles = makeStyles((theme) => ({
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gridTemplateRows: "1fr",
        height: "100%"
    },
    content:{
        gridRow: 1,
        gridColumn: "1/4",

    },
    contentCollapsed:{
        gridRow: 1,
        gridColumn: "1/3",

    },
    rightSidebar: {
        gridRow: 1,
        gridColumn: 3,
    }    
}))

const DMSList = ({ dmsListData }) => {
    const classes = useStyles();
    const { keycloak, initialized } = useKeycloak()
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState({open: false, type: null})

    const resetModal = () =>{
        setModalInfo({
            open: false,
            type: null,
        })
    }
    const handleDmsCreateClick = () => {
        setModalInfo({
            open: true,
            type: "dmsCreate",
            handleSubmit: (data)=>{/*createCA(data);*/ resetModal()}
        })
    }

    const handleDmsImportClick = () => {

    }

    console.log(dmsListData);
    return (
        <>
            <Box className={classes.grid}>
                <Box className={rightSidebarOpen ? classes.contentCollapsed : classes.content} style={{padding: 20}}>
                    <Box style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                            <Link color="inherit" href="/"  >
                                Home
                            </Link>
                            <Typography color="textPrimary">DMSs</Typography>
                        </Breadcrumbs>
                        <Box>
                            <Button
                                color="default"
                                startIcon={<AddCircleIcon />}
                                style={{marginRight: 10}}
                                onClick={handleDmsCreateClick}
                            >
                                Create DMS
                            </Button>
                            <Button
                                color="default"
                                startIcon={<CloudUploadIcon />}
                                onClick={handleDmsImportClick}
                            >
                                Import DMS
                            </Button>
                        </Box>
                    </Box>

                    <Box style={{display: "flex", flexWrap: "wrap", marginTop: 20}}>
                    {
                        dmsListData.map(dmsData => {
                            return (
                                <DMSCard
                                    isAdmin={keycloak.tokenParsed.realm_access.roles.includes("admin")}
                                    title={dmsData.name} 
                                    status={dmsData.status} 
                                    dmsData={dmsData.subject_dn}
                                    key={dmsData.name} 
                                    styles={{margin: 10}}
                                /> 
                            )
                        })
                    }
                    </Box>
                </Box>
                <LamassuModalPolyphormic handleClose={()=>resetModal()} {...modalInfo}/>
            </Box>
        </>
    )
}

export default DMSList