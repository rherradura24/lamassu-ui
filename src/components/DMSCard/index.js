import { Box, Button, Chip, Icon, IconButton, Tooltip, Typography, useTheme } from "@material-ui/core"
import { blue, green, orange, red } from "@material-ui/core/colors"
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import DenseTable from 'components/DenseTable';
import { LamassuChip } from "components/LamassuChip";
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

function ConsulIcon({color}) {
    return (
        <svg 
            width="30px"
            height="30px"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="-25 -25 300 300"
            preserveAspectRatio="none"
        >
            <path d="M127.16 254.32C93.194 254.32 61.262 241.093 37.244 217.076 13.227 193.058 0 161.126 0 127.16 0 93.195 13.227 61.262 37.244 37.245 61.262 13.227 93.194 0 127.16 0 155.641 0 181.96 8.472 204.416 25.885 207.975 28.6453 208.623 33.7683 205.863 37.3275 203.102 40.8867 197.979 41.5343 194.42 38.774 174.851 23.6 151.989 16.311 127.16 16.311 97.551 16.311 69.715 27.842 48.778 48.778 27.841 69.715 16.311 97.552 16.311 127.16 16.311 156.769 27.841 184.606 48.778 205.542 69.715 226.479 97.551 238.009 127.16 238.009 151.827 238.009 175.173 230.082 194.673 215.086 198.243 212.34 203.363 213.009 206.109 216.579 208.855 220.149 208.186 225.269 204.616 228.015 182.24 245.224 155.456 254.32 127.16 254.32ZM153.47 126.79C153.47 141.53 141.52 153.48 126.78 153.48 112.04 153.48 100.09 141.53 100.09 126.79 100.09 112.049 112.04 100.1 126.78 100.1 141.52 100.1 153.47 112.049 153.47 126.79ZM188.399 126.749C188.399 132.368 183.844 136.923 178.225 136.923 172.607 136.923 168.052 132.368 168.052 126.749 168.052 121.129 172.607 116.575 178.225 116.575 183.844 116.575 188.399 121.129 188.399 126.749ZM221.525 107.472C221.525 113.091 216.97 117.646 211.351 117.646 205.733 117.646 201.178 113.091 201.178 107.472 201.178 101.853 205.733 97.298 211.351 97.298 216.97 97.298 221.525 101.853 221.525 107.472ZM221.525 147.837C221.525 153.457 216.97 158.011 211.351 158.011 205.733 158.011 201.178 153.456 201.178 147.837 201.178 142.218 205.733 137.663 211.351 137.663 216.97 137.663 221.525 142.218 221.525 147.837ZM256 107.472C256 113.091 251.445 117.646 245.826 117.646 240.208 117.646 235.653 113.091 235.653 107.472 235.653 101.853 240.208 97.298 245.826 97.298 251.446 97.298 256 101.853 256 107.472ZM239.195 68.672C239.195 74.291 234.64 78.846 229.021 78.846 223.403 78.846 218.848 74.291 218.848 68.672 218.848 63.053 223.403 58.498 229.021 58.498 234.64 58.498 239.195 63.053 239.195 68.672ZM239.195 185.566C239.195 191.186 234.64 195.74 229.021 195.74 223.403 195.74 218.848 191.185 218.848 185.566 218.848 179.947 223.403 175.392 229.021 175.392 234.64 175.392 239.195 179.947 239.195 185.566ZM256 147.837C256 153.457 251.445 158.011 245.826 158.011 240.208 158.011 235.653 153.456 235.653 147.837 235.653 142.218 240.208 137.663 245.826 137.663 251.446 137.663 256 142.218 256 147.837Z" fill={color}/>
        </svg>
    );
  }

export const DMSCard = ({ dmsData, title, status, isAdmin, onApproval, onDecline, styles={}, onDownloadClick, onRevokeClick, onServiceDiscoveryInfoClick }) => {
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
                            <Tooltip title="Download DMS cert">
                                <IconButton onClick={onDownloadClick}>
                                    <GetAppIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Service Discovery Configuration">
                                <IconButton onClick={onServiceDiscoveryInfoClick}>
                                    <ConsulIcon color={theme.palette.type == "light" ? "#595959" : "#ffffff"}/>
                                </IconButton>
                            </Tooltip>
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