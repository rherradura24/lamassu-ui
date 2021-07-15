import { Box, Button, Chip, Icon, IconButton, Tooltip, Typography, useTheme } from "@material-ui/core"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DenseTable from 'components/DenseTable';
import { LamassuChip } from "components/LamassuChip";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from "moment";

export const DMSCard = ({ dmsData, title, status, lastIssued, isAdmin, onApproval, onDecline, styles={}, onDownloadClick, onRevokeClick }) => {
    const theme = useTheme()
    
    const keys = Object.keys(dmsData)
    const denseTableData = []
    keys.forEach(key => {
        denseTableData.push({
        label: key,
        content: dmsData[key]
        })
    });

    var statusColor;
    if (status == "APPROVED") {
      statusColor = "green"
    }else if(status == "REVOKED" || status == "DENIED"){
      statusColor = "red"
    }else if(status == "NEW"){
      statusColor = "orange"
      status = "PENDING"
    }

    return (
        <Card style={{width: 500, borderTop: "3px solid " + theme.palette.primary.main, ...styles}}>
        <div style={{padding:10 , height: 40, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div>
            <Typography variant="h5" component="h2" color="textPrimary">
                {title}
            </Typography>
            </div>
            <div>
                <LamassuChip status={statusColor} label={status} />
            </div>
        </div>
        <CardContent>
            <DenseTable dense={true} data={denseTableData}/>
        </CardContent>
        {
            <Box style={{display: "flex", justifyContent: "flex-start", alignItems: "center", marginLeft: 20}}>
            <Typography variant="button" style={{marginRight: 5}}>Last Issued Certificate: </Typography>
            {
                lastIssued != "nan" ? (
                    <LamassuChip status="unknown" label={moment(lastIssued).format("MMMM D YYYY hh:mm")} rounded={false}/>
                            
                ):(
                    <LamassuChip status="unknown" label={"Non issued"} rounded={false}/>
                )
            }
            </Box>       
        }
        {
            isAdmin && status == "PENDING" && (
                <CardActions disableSpacing>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                        <Button variant="contained" color="primary" fullWidth style={{marginRight:10}} onClick={onApproval}>Approve</Button>
                        <Button variant="contained" fullWidth style={{marginLeft:10}} onClick={onDecline}>Decline</Button>
                    </div>
                </CardActions> 
            )
        }{
            isAdmin && status == "APPROVED" && (
                <CardActions disableSpacing>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                        <Box style={{display: "flex"}}>
                            {
                                /*
                                    <Tooltip title="List Devices">
                                        <IconButton onClick={onDownloadClick} style={{maxHeight: 48}}>
                                            <ListIcon />
                                        </IconButton>
                                    </Tooltip>
                                 */
                            }
                            <Tooltip title="Download DMS cert">
                                <IconButton onClick={onDownloadClick} style={{maxHeight: 48}}>
                                    <GetAppIcon />
                                </IconButton>
                            </Tooltip>
                            {
                                /*
                                <Tooltip title="Service Discovery Configuration">
                                    <IconButton onClick={onServiceDiscoveryInfoClick} style={{maxHeight: 48, maxWidth: 48}}>
                                        <ConsulIcon color={theme.palette.type == "light" ? "#595959" : "#ffffff"}/>
                                    </IconButton>
                                </Tooltip>
                                */
                            }
                        </Box>
                        <div>
                            <Tooltip title="Revoke DMS">
                                <IconButton onClick={onRevokeClick}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </CardActions> 
            )
        }
    </Card>    
    )
}