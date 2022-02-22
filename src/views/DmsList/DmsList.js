import { useTheme } from "@emotion/react"
import { Box, Button, Divider, Grid, IconButton, InputBase, Paper, Typography } from "@mui/material"
import { DmsCard } from "./components/DmsCard";
import {AiOutlineSearch} from "react-icons/ai"
import AddIcon from '@mui/icons-material/Add';

export const DmsList = ({dmsList}) => {
    const theme = useTheme()
    return (
        <Box sx={{padding: "25px", height: "calc(100% - 50px)", background: theme.palette.background.lightContrast}}>
            <Grid container alignItems={"center"} sx={{marginBottom: "35px"}} columns={15}>
                <Box component={Paper} sx={{padding: "5px", height: 30, display: "flex", alignItems: "center", width: 300}}>
                    <AiOutlineSearch size={20} color="#626365" style={{marginLeft: 10, marginRight: 10}}/>
                    <InputBase fullWidth={true} style={{color: "#555", fontSize: 14}}/>
                </Box>
                <Box component={Paper} elevation={0} style={{borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40, marginLeft: 10}}>
                    <IconButton style={{background: theme.palette.primary.light}}>
                        <AddIcon style={{color: theme.palette.primary.main}}/>
                    </IconButton>
                </Box>

            </Grid>
            <Grid container spacing={3}>
            {
                dmsList.map(dms=>(
                    <Grid item container xs={3} key={dms.id}>
                        <DmsCard 
                            name={dms.name}
                            status={dms.status}
                            statusColor={dms.status_color}
                            subject={dms.certificate.subject}
                            serialNumber={dms.certificate.serial_number}
                            requestDate={dms.request_date}
                            expirationDate={dms.expiration_date}
                            emmitedCerts={dms.emmited_certificates}
                        />
                    </Grid>
                ))
            }
            </Grid>
        </Box>
    )
}