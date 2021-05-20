import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Box, Paper, Typography } from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";

const UserAvatar = ({ username, roles }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { keycloak, initialized } = useKeycloak()

    const handleClick = (event) => {
        if (anchorEl !== event.currentTarget) {
          setAnchorEl(event.currentTarget);
        }
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    return(
        <>
            <Box 
                onClick={handleClick}
                onMouseOver={handleClick}
                style={{display: "flex", justifyContent: "center", alignItems: "center"}}
            >
                 <div style={{height: 35, width: 35, borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center", background: "#ddd"}}>
                    <Typography>{username.charAt(0).toUpperCase()}</Typography>
                </div>
                <Box 
                    component={Paper} 
                    elevation={0} 
                    style={{background: "transparent", margin: 10}}
                >
                    <Typography variant="body1" style={{fontSize: 13}}>{username}</Typography>
                    <Typography variant="body2" style={{fontSize: 12}} color="textSecondary">{roles}</Typography>
                </Box>
            </Box>
            <Menu
                style={{marginTop: 25, width: 200}}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
            >
                 <MenuItem style={{width: "100%"}} onClick={(ev)=>{keycloak.logout(); handleClose(ev)}}>Logout</MenuItem>
            </Menu>
            
        </>
    )
}

export default UserAvatar;