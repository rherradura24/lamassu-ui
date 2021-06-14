import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as devicesActions from "ducks/devices/Actions";
import { createLoader } from "components/utils";
import { getDevices } from 'ducks/devices/Reducer';
import { DeviceInspect } from './DeviceInspect';

const createMapStateToProps = (state, {id}) => ({
  deviceData: getDevices
  (state, id).filter(dev => dev.id === id)[0]
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: ()=>{ dispatch(devicesActions.getDeviceById(id))},
  provisionDevice: ()=>{ dispatch(devicesActions.provisionDevice(id))},
  deleteDevice: ()=>{ dispatch(devicesActions.deleteDevice(id))},
})

export default connect(createMapStateToProps, mapDispatchToProps)(createLoader(DeviceInspect));