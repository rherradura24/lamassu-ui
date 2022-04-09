import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as devicesActions from "ducks/devices/Actions";
import * as certActions from "ducks/certs/Actions";
import * as dmsEnrollerActions from "ducks/dms-enroller/Actions";
import { createLoader } from "components/utils";
import { getDevices } from 'ducks/devices/Reducer';
import { getCAs } from 'ducks/certs/Reducer';
import { getAllDMS } from 'ducks/dms-enroller/Reducer';
import { DeviceInspect } from './DeviceInspect';

const createMapStateToProps = (state, {id}) => ({
  deviceData: getDevices(state, id).filter(dev => dev.id === id)[0],
  caList: getCAs(state),
  dmsList: getAllDMS(state)
})

const mapDispatchToProps = (dispatch, {id}) => ({
  onMount: ()=>{ dispatch(certActions.getCAs()); dispatch(devicesActions.getDeviceById(id)); dispatch(dmsEnrollerActions.getAllDMS());},
  //provisionDevice: (data)=>{ dispatch(devicesActions.provisionDevice(data))},
  provisionDevice: (deviceId, caName, dmsProvisionUrl, deviceCertInfo)=>{ dispatch(devicesActions.provisionDevice(deviceId, caName, dmsProvisionUrl, deviceCertInfo))},
  provisionDeviceCsr: (deviceId, caName, dmsProvisionUrl, csr)=>{ dispatch(devicesActions.provisionDeviceCsr(deviceId, caName, dmsProvisionUrl, csr))},
  renewDevice: (deviceId, dmsRenewUrl)=>{ dispatch(devicesActions.renewDevice(deviceId, dmsRenewUrl))},
  deleteDevice: ()=>{ dispatch(devicesActions.deleteDevice(id))},
  revokeDeviceCert: ()=>{ dispatch(devicesActions.revokeDeviceCert(id))},
})

export default connect(createMapStateToProps, mapDispatchToProps)(createLoader(DeviceInspect));