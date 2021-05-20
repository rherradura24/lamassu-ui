import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { createLoader } from "components/utils";
import * as dmsActions from "ducks/dms/Actions";
import * as dmsSelector from 'ducks/dms/Reducer';
import DMSList from './DMSList';

const mapStateToProps = (state) => ({
  dmsListData : dmsSelector.getAllDMS(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(dmsActions.getAllDMS()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(DMSList));