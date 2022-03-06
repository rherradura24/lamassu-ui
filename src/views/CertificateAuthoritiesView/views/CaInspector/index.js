import React from "react"
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import CaInspector from "./CaInspector";
import CerificateOverview from "./CerificateOverview";
import CloudProviders from "./CloudProviders";
import IssuedCertificates from "./IssuedCertificates";

export default ({caName}) => {
    return (
        <Routes>
            <Route path="/" element={<RoutedCaInspector caName={caName}/>}>
                <Route path="certs" element={ <IssuedCertificates caName={caName}/>} />
                <Route path="cloud-providers/*" element={<CloudProviders caName={caName}/>} />
                <Route index element={<CerificateOverview caName={caName}/>} />
            </Route>
        </Routes>
    )
}

const RoutedCaInspector = ({caName}) => {
    let params = useParams();
    let location = useLocation();
    console.log(params, location);
    var selectedTab = 0
    if(location.pathname.includes("certs")){
        selectedTab = 1
    }else if(location.pathname.includes("cloud-providers")){
        selectedTab = 2
    }
    return (
        <CaInspector urlCaInspectTab={selectedTab} caName={caName}/>
    )
}
