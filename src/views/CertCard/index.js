import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import CertCard from "./CertCard";
import * as casActions from "ducks/cas/Actions";
import { createLoader } from "components/utils";
import { getCAs } from 'ducks/cas/Reducer';

const mapStateToProps = (state) => ({
  casData : getCAs(state)
})

const mapDispatchToProps = (dispatch) => ({
  onMount: ()=>{ dispatch(casActions.getCAs()) }
})

export default connect(mapStateToProps, mapDispatchToProps)(createLoader(CertCard));