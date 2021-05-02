import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Typography } from "@material-ui/core";
import { useKeycloak } from "@react-keycloak/web";

const UserAvatar = ({ username }) => {
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
            <div 
                onClick={handleClick}
                onMouseOver={handleClick}
                style={{height: 30, width: 30, borderRadius: 20, display: "flex", justifyContent: "center", alignItems: "center", background: "#ddd"}}
            >
                <Typography>{username.charAt(0).toUpperCase()}</Typography>
            </div>
            <Menu
                style={{marginTop: 0}}
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
            >
                 <MenuItem onClick={(ev)=>{keycloak.logout(); handleClose(ev)}}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserAvatar;