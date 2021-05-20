import { connect } from "react-redux";
import { useKeycloak } from '@react-keycloak/web'

import React, { useState, useEffect } from 'react';

import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import Brightness5OutlinedIcon from '@material-ui/icons/Brightness5Outlined';
import KeyboardArrowLeftOutlinedIcon from '@material-ui/icons/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined';
import TimerOffOutlinedIcon from '@material-ui/icons/TimerOffOutlined';
import VerifiedUserOutlinedIcon from '@material-ui/icons/VerifiedUserOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';
import BlockOutlinedIcon from '@material-ui/icons/BlockOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import RouterOutlinedIcon from '@material-ui/icons/RouterOutlined';

import { MenuButton, MenuItem, MenuSectionTitle, MenuSeparator }  from "./SidebarMenuItem"
import { useTranslation } from 'react-i18next'

import "./SideBar.css"
import { Button, Grid, Paper } from "@material-ui/core";


const SideBar = ({ darkTheme, onTogleDark, onCollapse }) => {
  const { keycloak, initialized } = useKeycloak()
  const { t, i18n } = useTranslation()

  const [ selectedPath , setSelectedPath ] = useState(window.location.pathname);
  const [ collapsed , setCollapsed ] = useState(false);

  return (
    <Paper style={{borderRadius: 0}}>
      <Grid item className="sidebar-wrapper">
        <div>
          <MenuButton title="Collapse" icon={collapsed ? <KeyboardArrowRightOutlinedIcon /> : <KeyboardArrowLeftOutlinedIcon/>} onClick={()=>{setCollapsed(!collapsed); onCollapse(collapsed)}} collapsed={collapsed}/> 
          <MenuSeparator/>
          {
            keycloak.tokenParsed.realm_access.roles.includes("admin") && (
              <>
                <MenuItem 
                  title={t("home")} 
                  link="/"
                  collapsed={collapsed}
                  active={selectedPath}
                  onSelect={(link)=>{setSelectedPath(link)}} 
                  icon={<DashboardOutlinedIcon/>}
                />
                <MenuSeparator/>
                <MenuSectionTitle title="certificate authorities" collapsed={collapsed}/>
                <MenuItem 
                  title="CAs" 
                  link="/ca/certs" 
                  active={selectedPath}
                  collapsed={collapsed}
                  onSelect={(link)=>{setSelectedPath(link)}} 
                  icon={<AccountBalanceOutlinedIcon/>}
                />
                <MenuItem 
                  title="Certificates issued by CAs"
                  link="/ca/issued-certs" 
                  active={selectedPath}
                  collapsed={collapsed}
                  onSelect={(link)=>{setSelectedPath(link)}} 
                  icon={<ListAltOutlinedIcon/>}
                />
                <MenuItem 
                  title="CRL"
                  link="/ca/crl" 
                  active={selectedPath}
                  collapsed={collapsed}
                  onSelect={(link)=>{setSelectedPath(link)}} 
                  icon={<BlockOutlinedIcon/>}
                />
                <MenuSeparator/>
              </>
            )
          }
          <MenuSectionTitle title="device manufacturing systems" collapsed={collapsed}/>
          <MenuItem 
            title="List of DMS" 
            link="/dms/list" 
            active={selectedPath}
            collapsed={collapsed}
            onSelect={(link)=>{setSelectedPath(link)}} 
            icon={<ListAltOutlinedIcon/>}
          />
          <MenuItem 
            title="Devices" 
            link="/dms/devices" 
            active={selectedPath}
            collapsed={collapsed}
            onSelect={(link)=>{setSelectedPath(link)}} 
            icon={<RouterOutlinedIcon/>}
          />
          <MenuItem 
            title={"Certifiactes issued by DMS"} 
            link="/dms/issued-cert" 
            active={selectedPath}
            collapsed={collapsed}
            onSelect={(link)=>{setSelectedPath(link)}} 
            icon={<VerifiedUserOutlinedIcon/>}
          />
          <MenuSeparator/>
          <MenuSectionTitle title="utils" collapsed={collapsed}/>
          <MenuItem 
            title="Certificate" 
            link="/utils/cert-checker" 
            active={selectedPath}
            collapsed={collapsed}
            onSelect={(link)=>{setSelectedPath(link)}} 
            icon={<BuildOutlinedIcon/>}
          />
          <MenuSeparator/>
          <MenuButton title={darkTheme ? t("theme.light") : t("theme.dark")} icon={darkTheme ? <Brightness5OutlinedIcon/> : <Brightness2OutlinedIcon/>} onClick={onTogleDark} collapsed={collapsed}/> 

        </div>
      </Grid>  
    </Paper>  
  );
}


const mapStateToProps = (state) => ({ 

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps) (SideBar);