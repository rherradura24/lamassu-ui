import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as devicesActions from "ducks/devices/Actions";
import { createLoader } from "components/utils";
import { getDevices } from 'ducks/devices/Reducer';
import { getAllDMS } from 'ducks/dms-enroller/Reducer';
import { DeviceList } from './DeviceList';

const mapStateToProps = (state) => ({
  devicesData: getDevices(state),
  dmsList: getAllDMS(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(devicesActions.getAllDevices()) },
  
  createDevice: (data)=>{ dispatch(devicesActions.createDevice(data)) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(DeviceList));