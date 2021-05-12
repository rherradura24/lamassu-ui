import { connect } from "react-redux";
import NotificationsIcon from '@material-ui/icons/Notifications';

import { blue } from '@material-ui/core/colors';
import { useKeycloak } from '@react-keycloak/web'

import { Badge, Box, Grid, MenuItem, Select, Typography } from "@material-ui/core";
import UserAvatar from "./UserAvatar";

import { useTranslation } from 'react-i18next'
import { useState } from "react";


const AppBar = ({ className, background }) => {
  const { keycloak, initialized } = useKeycloak()
  console.log(keycloak);
  const [lang, setLang] = useState("en")
  const { t, i18n } = useTranslation()

  return (
    <Box className={className} style={{background: background, display: "flex", alignItems: "center", padding: "5px 10px", justifyContent: "space-between"}}>
      <div style={{background: "white", borderRadius: 10, height:30, width: 120, display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Typography variant="button">Lamassu IoT</Typography>
      </div>
      <div style={{background: background, height: 50, display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          onChange={(ev)=>{setLang(ev.target.value); i18n.changeLanguage(ev.target.value)}}
          disableUnderline
          style={{marginRight: 15}}
        >
          <MenuItem value={"es"}>ES</MenuItem>
          <MenuItem value={"en"}>EN</MenuItem>
          <MenuItem value={"eus"}>EUS</MenuItem>
        </Select>

        <Badge badgeContent={4} color="primary" style={{marginRight: 30}}>
          <NotificationsIcon style={{color: "#F1F2F8"}}/>
        </Badge>

        <UserAvatar username={keycloak.tokenParsed.preferred_username}/>
      </div>
    </Box>
  );
}

const mapStateToProps = (state) => ({ 
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps) (AppBar);