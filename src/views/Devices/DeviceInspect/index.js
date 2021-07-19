import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as devicesActions from "ducks/devices/Actions";
import * as certActions from "ducks/certs/Actions";
import { createLoader } from "components/utils";
import { getDevices } from 'ducks/devices/Reducer';
import { getCAs } from 'ducks/certs/Reducer';
import { DeviceInspect } from './DeviceInspect';

const createMapStateToProps = (state, {id}) => ({
  deviceData: getDevices(state, id).filter(dev => dev.id === id)[0],
  caList: getCAs(state)
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: ()=>{ dispatch(certActions.getCAs());dispatch(devicesActions.getDeviceById(id))},
  //provisionDevice: (data)=>{ dispatch(devicesActions.provisionDevice(data))},
  provisionDevice: (deviceId, caName, dmsProvisionUrl, deviceCertInfo)=>{ dispatch(devicesActions.provisionDevice(deviceId, caName, dmsProvisionUrl, deviceCertInfo))},
  provisionDeviceCsr: (deviceId, caName, dmsProvisionUrl, csr)=>{ dispatch(devicesActions.provisionDeviceCsr(deviceId, caName, dmsProvisionUrl, csr))},
  renewDevice: (deviceId, dmsRenewUrl)=>{ dispatch(devicesActions.renewDevice(deviceId, dmsRenewUrl))},
  deleteDevice: ()=>{ dispatch(devicesActions.deleteDevice(id))},
  revokeDeviceCert: ()=>{ dispatch(devicesActions.revokeDeviceCert(id))},
})

export default connect(createMapStateToProps, mapDispatchToProps)(createLoader(DeviceInspect));