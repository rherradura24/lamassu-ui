import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import DashboardLayout from "views"

export const LoadingDashboard = ({onAlive, checkAuthServer = true}) => {
    const [isIniting, setIsIniting] = useState(true)
    const [refreshRate, setRefreshRate] = useState(5)
    const [refreshCountDown, setRefreshCountDown] = useState(5)
    const isAuthServerAlive = async () => {
        try{
            await sleep(1000)
            const response = await fetch(process.env.REACT_APP_AUTH_ENDPOINT + "/realms/" +  process.env.REACT_APP_AUTH_REALM)
            if (response.status != 200){
                return false
            } else {
                return true
            }
        }catch(er){
            return false
        }
    }

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
        
        useEffect(()=>{
        async function retry() {
            setRefreshCountDown(refreshRate)
            for (let i = refreshRate; i >= 0; i--) {
                await sleep(1000)
                setRefreshCountDown(i)                
            }
            setIsIniting(true)
            return await isAuthServerAlive()
        }
        async function init(){
            setIsIniting(true)
            if(await isAuthServerAlive()){
                setIsIniting(false)
                onAlive()
                return 
            }else{
                setIsIniting(false)
                var isAlive = false
                while(!isAlive){
                    isAlive = await retry()
                    setIsIniting(false)
                }
                onAlive()
                return
            }
        }
        if(checkAuthServer){
            init()
        }
    }, [])
    
    return (
        <>
            {
                isIniting ? (
                    <div>Loading: Checking authority service status</div>
                    ) : ( 
                    <>
                        <div>Could not connect with the authority service</div>
                        <div>Retrying in: {refreshCountDown}</div>
                    </>
                )
            }
        </>
    )
}