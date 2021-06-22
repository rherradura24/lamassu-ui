import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { createLoader } from "components/utils";
import * as dmsActions from "ducks/dms-enroller/Actions";
import * as dmsSelector from 'ducks/dms-enroller/Reducer';
import DMSList from './DMSList';

const mapStateToProps = (state) => ({
  dmsListData : dmsSelector.getAllDMS(state),
  dmsPrivKeyResponse: dmsSelector.getLastPrivKeyResponse(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(dmsActions.getAllDMS()) },

  createDmsViaCsr: (name, csr)=> {dispatch(dmsActions.createDmsViaCsr(name, csr))},
  createDmsViaForm: (name, csrForm)=> {dispatch(dmsActions.createDmsViaForm(name, csrForm))},
  updateDmsStatus: (id, dms, status)=>{dispatch(dmsActions.updateDmsStatus(id, dms, status))},
  deletePrivKeyStorage: ()=> {dispatch(dmsActions.deletePrivKeyStorage())}
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(DMSList));