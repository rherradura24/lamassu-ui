import { Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import DeviceInspector from "./views/DeviceInspector"
import DeviceList from "./views/DeviceList"

const RoutedDeviceInspector = ()=>{
    let params = useParams();
    let location = useLocation();
    // console.log(params, location);
    return (
        <DeviceInspector deviceId={params.deviceId}/>
    )
}

export default () => {
    return (
        <Routes>
            <Route path="/" element={<Outlet/>}>
                <Route path=":deviceId" element={<RoutedDeviceInspector />} />
                <Route path=":deviceId/edit" element={<div>edit view </div>} />
                <Route index element={<DeviceList />} />
            </Route>
        </Routes>
    )
}