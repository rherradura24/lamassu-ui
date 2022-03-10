import React from "react"
import { Routes, Route, useParams, useLocation, Outlet } from "react-router-dom";
import AwsCloudIntegration from "./AwsCloudIntegration";
import CloudProviders from "./CloudProviders";

export default ({caName}) => {
    return (
        <Routes>
            <Route path="/" element={<Outlet/>}>
                <Route path="aws" element={<Outlet/>}>
                    <Route path=":connectorId" element={<RoutedAwsCloudIntegration caName={caName}/>} />
                </Route>
                <Route index element={<CloudProviders caName={caName}/>} />
            </Route>
        </Routes>
    )
}

const RoutedAwsCloudIntegration = ({caName}) => {
    let params = useParams();
    let location = useLocation();
    console.log(params, location);
    return (
        <AwsCloudIntegration caName={caName} connectorId={params.connectorId}/>
    )
}
