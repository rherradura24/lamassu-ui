import React, { useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Badge, Box, Paper, Typography, useTheme } from "@material-ui/core"
import NotificationService from "components/NotificationService"
import NotificationsIcon from '@material-ui/icons/Notifications';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import AccessAlarmsOutlinedIcon from '@material-ui/icons/AccessAlarmsOutlined';
import { MenuSeparator } from "./SidebarMenuItem";
import { connect } from "react-redux";
import { getNotificationHistory } from 'ducks/notifications/Reducer';
import moment from "moment";

const LamassuNotifications = ({ notificationHistory }) =>{ 

    const [anchorEl, setAnchorEl] = React.useState(null);
    const theme = useTheme()

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
          setAnchorEl(event.currentTarget);
        }
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }
    
    const info = {
        color:"#687EEB",
        bg: theme.palette.type == "light" ? "#D4E9FF" : "#47576b"
    }
    const success= {
        bg: theme.palette.type == "light" ? "#D0F9DB" : "#4a6952",
        color: theme.palette.type == "light" ? "green" : "#25ee32"
    }
    const warn= {
        bg: theme.palette.type == "light" ? "#FFE9C4" : "#635d55",
        color: "orange"
    }
    const error= {
        bg: theme.palette.type == "light" ? "#FFB1AA" : "#6d504e",
        color: "red"
    }
    
    var notifications = []
    
    for (let index = notificationHistory.length -1 ; index >= 0; index--) {
        const e = notificationHistory[index];
        var color = info
        switch (e.type) {
            case "info":
                color = info
                break;
            case "warning":
                color = warn
                break;
            case "error":
                color = error
                break;
            case "success":
                color = success
                break;
        
            default:
                break;
        }
        notifications.push(
            <Box style={{display: "flex", padding: "20px 20px 20px 20px"}}>
                <Box style={{width: 50}}>
                    <Box style={{display: "flex", justifyContent: "center", alignItems: "center", background: color.bg, borderRadius: 50, height: 30, width: 30}}>
                        <AssignmentOutlinedIcon style={{fontSize:20, color: color.color}}/>
                    </Box>
                </Box>
                <Box style={{display: "flex", alignItems: "flex-start", flexDirection: "column", width: 280}}>
                    <Typography component="div" variant="body2">{e.msg}</Typography>
                    <Box style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <AccessAlarmsOutlinedIcon style={{fontSize:15, color: "#999"}}/>
                        <Typography style={{color: "#999", fontSize: 13}}>{moment(e.timestamp).fromNow()}</Typography>
                    </Box>
                </Box>
            </Box>
        )
        if(index >= 1){
            notifications.push(<MenuSeparator/>)
        }
    }

    return (
        <>
            <NotificationService />
            <Box 
                onClick={handleClick}
                style={{cursor: "pointer"}}
            >
                <Badge badgeContent={notificationHistory.length} color="primary" style={{marginRight: 30}}>
                    <NotificationsIcon style={{color: "#F1F2F8"}}/>
                </Badge>
            </Box>
            <Menu
                style={{marginTop: 25, width: 400}}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
            >
                <Box style={{width: 400}}>
                    {
                        notifications.length == 0 ? (
                            <Box style={{padding: "10px 20px 10px 20px"}}>
                                <Typography variant="caption" style={{fontStyle: "italic"}}>No notifications</Typography>
                            </Box>
                        ) : (
                            notifications
                        )
                    }
                </Box>
            </Menu>
        </>
    )
}


const mapStateToProps = (state) => ({
    notificationHistory : getNotificationHistory(state)
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps)(LamassuNotifications);