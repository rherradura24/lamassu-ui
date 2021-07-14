import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as devicesActions from "ducks/devices/Actions";
import * as certsActions from "ducks/certs/Actions";
import * as dmsEnrollerActions from "ducks/dms-enroller/Actions";
import { createLoader } from "components/utils";
import { getDevices, getIssuedCertsByDmsLastThirtyDays } from 'ducks/devices/Reducer';
import { getAllDMS, getDMSsExpiringXDays } from 'ducks/dms-enroller/Reducer';
import { getCAsExpiringXDays, getCAs , getCertsExpiringXDays, getIssuedCertByCAs} from 'ducks/certs/Reducer';
import { Home } from './Home';

const mapStateToProps = (state) => ({
  issuedCerts: getIssuedCertByCAs(state),
  cas: getCAs(state),
  dmss: getAllDMS(state),
  devices: getDevices(state),
  thirtyDaysCAs: getCAsExpiringXDays(state, 30),
  thirtyDaysDms: getDMSsExpiringXDays(state, 30),
  thirtyDaysCerts: getCertsExpiringXDays(state, 30),
  expiringCertsTimeline: getCertsExpiringXDays(state, 30),
  issuedCertsByDmsLastThirtyDays: getIssuedCertsByDmsLastThirtyDays(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ 
      dispatch(certsActions.getCerts("", "ops")) 
      dispatch(certsActions.getCAs()) 
      dispatch(devicesActions.getAllDevices()) 
      dispatch(dmsEnrollerActions.getAllDMS()) 
      dispatch(devicesActions.getIssuedCertsByDmsLastThirtyDays()) 
  },
  
  createDevice: (data)=>{ dispatch(devicesActions.createDevice(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(Home));