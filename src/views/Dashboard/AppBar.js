import { connect } from "react-redux";
import NotificationsIcon from '@material-ui/icons/Notifications';

import { blue } from '@material-ui/core/colors';
import { useKeycloak } from '@react-keycloak/web'

import {  Box, MenuItem, Select, Typography } from "@material-ui/core";
import UserAvatar from "./UserAvatar";

import { useTranslation } from 'react-i18next'
import { useState } from "react";
import LamassuNotifications from "./LamassuNotifications";


const AppBar = ({ className, background, logo }) => {
  const { keycloak, initialized } = useKeycloak()
  const [lang, setLang] = useState("en")
  const { t, i18n } = useTranslation()

  return (
    <Box className={className} style={{background: background, display: "flex", alignItems: "center", padding: "5px 10px", justifyContent: "space-between"}}>
      {logo}
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
        
        <LamassuNotifications />

        <UserAvatar 
          username={keycloak.tokenParsed.email ? keycloak.tokenParsed.email : keycloak.tokenParsed.preferred_username}
          roles={keycloak.tokenParsed.realm_access.roles.filter(role=>role!="offline_access" && role!="uma_authorization")}
        />
      </div>
    </Box>
  );
}

const mapStateToProps = (state) => ({ 
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps) (AppBar);