import React from "react"
import { Routes, Route, useParams, useLocation } from "react-router-dom"
import CaInspector from "./CaInspector"
import CerificateOverview from "./CerificateOverview"
import CertificateView from "./CertificateContent"
import CloudProviders from "./CloudProviders"
import IssuedCertificates from "./IssuedCertificates"

export default ({ caName }) => {
  return (
        <Routes>
            <Route path="/" element={<RoutedCaInspector caName={caName}/>}>
                <Route path="cert" element={ <CertificateView caName={caName}/>} />
                <Route path="issued" element={ <IssuedCertificates caName={caName}/>} />
                <Route path="cloud-providers/*" element={<CloudProviders caName={caName}/>} />
                <Route index element={<CerificateOverview caName={caName}/>} />
            </Route>
        </Routes>
  )
}

const RoutedCaInspector = ({ caName }) => {
  const params = useParams()
  const location = useLocation()
  let selectedTab = 0
  if (location.pathname.includes("cert")) {
    selectedTab = 1
  } else if (location.pathname.includes("issued")) {
    selectedTab = 2
  } else if (location.pathname.includes("cloud-providers")) {
    selectedTab = 3
  }
  return (
        <CaInspector urlCaInspectTab={selectedTab} caName={caName}/>
  )
}
