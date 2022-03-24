
import { connect, useSelector } from "react-redux"
import cloudproxyDuck from "redux/ducks/cloud-proxy"

import React from "react"
import { Routes, Route, useParams, useLocation, Outlet } from "react-router-dom"
import AwsIotCoreConnector from "./Types/AwsIotCore"
import CloudProviders from "./CloudProviders"
import { Box } from "@mui/system"

const RoutedIndex = ({ caName, onAccessPolicyChange }) => {
  return (
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="awsiotcore" element={<Outlet />}>
          <Route path=":connectorId" element={<RoutedAwsIotCoreConnector caName={caName} onAccessPolicyChange={onAccessPolicyChange} />} />
        </Route>
        <Route index element={<CloudProviders caName={caName} />} />
      </Route>
    </Routes>
  )
}

const RoutedAwsIotCoreConnector = ({ caName, onAccessPolicyChange }) => {
  const params = useParams()
  const location = useLocation()
  const configuration = useSelector(state => cloudproxyDuck.reducer.getCloudConnectorById(state, params.connectorId))

  console.log(params, location, configuration)
  return (
    configuration === undefined ? (
      <Box sx={{fontStyle: "italic"}}>Cloud connector not found</Box>
    ) : (
      <AwsIotCoreConnector caName={caName} connectorId={params.connectorId} connectorConfig={configuration} onAccessPolicyChange={onAccessPolicyChange} />
    )
  )
}

const mapStateToProps = (state, { caName, connectorId }) => ({
  requestStatus: cloudproxyDuck.reducer.isRequestInProgress(state)
})

const mapDispatchToProps = (dispatch, { caName }) => ({
  onAccessPolicyChange: (connectorId, newPolicy) => { dispatch(cloudproxyDuck.actions.updateAccessPolicy(connectorId, caName, newPolicy)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutedIndex)
