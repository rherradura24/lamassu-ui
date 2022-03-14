import React from "react"
import { Routes, Route, useParams, useLocation, Outlet } from "react-router-dom";
import AwsIotCoreConnector from "./Types/AwsIotCore";
import CloudProviders from "./CloudProviders";

export default ({caName}) => {
    return (
        <Routes>
            <Route path="/" element={<Outlet/>}>
                <Route path="awsiotcore" element={<Outlet/>}>
                    <Route path=":connectorId" element={<RoutedAwsIotCoreConnector caName={caName}/>} />
                </Route>
                <Route index element={<CloudProviders caName={caName}/>} />
            </Route>
        </Routes>
    )
}

const RoutedAwsIotCoreConnector = ({caName}) => {
    let params = useParams();
    let location = useLocation();
    console.log(params, location);
    return (
        <AwsIotCoreConnector caName={caName} connectorId={params.connectorId}/>
    )
}
