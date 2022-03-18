
import { connect } from "react-redux"
import cloudproxyDuck from "redux/ducks/cloud-proxy"
import { createLoader } from "components/utils"

import React from "react"
import { Routes, Route, useParams, useLocation, Outlet } from "react-router-dom"
import AwsIotCoreConnector from "./Types/AwsIotCore"
import CloudProviders from "./CloudProviders"

const RoutedIndex = ({ caName, onAccessPolicyChange }) => {
  return (
        <Routes>
            <Route path="/" element={<Outlet/>}>
                <Route path="awsiotcore" element={<Outlet/>}>
                    <Route path=":connectorId" element={<RoutedAwsIotCoreConnector caName={caName} onAccessPolicyChange={onAccessPolicyChange}/>} />
                </Route>
                <Route index element={<CloudProviders caName={caName}/>} />
            </Route>
        </Routes>
  )
}

const RoutedAwsIotCoreConnector = ({ caName, onAccessPolicyChange }) => {
  const params = useParams()
  const location = useLocation()
  console.log(params, location)
  return (
        <AwsIotCoreConnector caName={caName} connectorId={params.connectorId} onAccessPolicyChange={onAccessPolicyChange}/>
  )
}

const mapStateToProps = (state, { caName }) => ({
})

const mapDispatchToProps = (dispatch, { caName }) => ({
  onAccessPolicyChange: (connectorId, newPolicy) => { dispatch(cloudproxyDuck.actions.updateAccessPolicy(connectorId, caName, newPolicy)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(RoutedIndex)
