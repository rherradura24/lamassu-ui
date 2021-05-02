import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import * as casActions from "ducks/cas/Actions";
import { createLoader } from "components/utils";
import { getCAs } from 'ducks/cas/Reducer';
import CAList from './CAList';

const mapStateToProps = (state) => ({
  casData : getCAs(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(casActions.getCAs()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CAList));