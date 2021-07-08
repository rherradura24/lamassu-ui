import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as devicesActions from "ducks/devices/Actions";
import * as certsActions from "ducks/certs/Actions";
import * as dmsEnrollerActions from "ducks/dms-enroller/Actions";
import { createLoader } from "components/utils";
import { getDevices } from 'ducks/devices/Reducer';
import { getAllDMS } from 'ducks/dms-enroller/Reducer';
import { getAllCerts, getCAs , getCertsExpiringXDays} from 'ducks/certs/Reducer';
import { Home } from './Home';

const mapStateToProps = (state) => ({
  issuedCerts: getAllCerts(state).length,
  cas: getCAs(state).length,
  dmss: getAllDMS(state).length,
  devices: getDevices(state).length,
  oneDayCerts: getCertsExpiringXDays(state, 1).length,
  sevenDaysCerts: getCertsExpiringXDays(state, 7).length,
  thirtyDaysCerts: getCertsExpiringXDays(state, 30).length,
  expiringCertsTimeline: getCertsExpiringXDays(state, 30)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ 
      dispatch(devicesActions.getAllDevices()) 
      dispatch(dmsEnrollerActions.getAllDMS()) 
      dispatch(certsActions.getCAs()) 
      dispatch(certsActions.getCerts()) 
  },
  
  createDevice: (data)=>{ dispatch(devicesActions.createDevice(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(Home));