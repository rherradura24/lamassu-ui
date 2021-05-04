import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as certsActions from "ducks/certs/Actions";
import { createLoader } from "components/utils";
import { getCAs } from 'ducks/certs/Reducer';
import CAListView from './CAListView';

const mapStateToProps = (state) => ({
  casData : getCAs(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(certsActions.getCAs()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CAListView));