import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { getLastNotification } from 'ducks/notifications/Reducer';
import { NotificationService } from './NotificationService';

const mapStateToProps = (state) => ({
  notification : getLastNotification(state)
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationService);