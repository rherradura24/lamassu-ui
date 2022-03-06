import React from "react"

import { Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import DeviceInspector from "./views/DeviceInspector"
import EditDevice from "./views/DeviceInspector/EditDevice";
import DeviceList from "./views/DeviceList"

const RoutedDeviceInspector = ()=>{
    let params = useParams();
    let location = useLocation();
    // console.log(params, location);
    return (
        <DeviceInspector deviceId={params.deviceId}/>
    )
}

const RoutedEditDevice = ()=>{
    let params = useParams();
    let location = useLocation();
    // console.log(params, location);
    return (
        <EditDevice deviceId={params.deviceId}/>
    )
}

export default () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet/>}>
                <Route path=":deviceId" element={<RoutedDeviceInspector />} />
                <Route path=":deviceId/edit" element={<RoutedEditDevice />} />
                <Route index element={<DeviceList />} />
            </Route>
        </Routes>
    )
}

