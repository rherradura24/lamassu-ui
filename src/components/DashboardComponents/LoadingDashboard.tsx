import React, { useEffect, useState } from "react";

interface Props {
    onAlive?: any,
    checkAuthServer: boolean,
}

export const LoadingDashboard: React.FC<Props> = ({ onAlive = () => {}, checkAuthServer = true }) => {
    const refreshRate = 5;

    const [isIniting, setIsIniting] = useState(true);
    const [refreshCountDown, setRefreshCountDown] = useState(5);
    const isAuthServerAlive = async () => {
        try {
            await sleep(1000);
            const response = await fetch(process.env.REACT_APP_AUTH_ENDPOINT + "/realms/" + process.env.REACT_APP_AUTH_REALM);
            if (response.status !== 200) {
                return false;
            }
            return true;
        } catch (er) {
            return false;
        }
    };

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    useEffect(() => {
        async function retry () {
            setRefreshCountDown(refreshRate);
            for (let i = refreshRate; i >= 0; i--) {
                await sleep(1000);
                setRefreshCountDown(i);
            }
            setIsIniting(true);
            return await isAuthServerAlive();
        }
        async function init () {
            setIsIniting(true);
            if (await isAuthServerAlive()) {
                setIsIniting(false);
                onAlive();
            } else {
                setIsIniting(false);
                let isAlive = false;
                while (!isAlive) {
                    isAlive = await retry();
                    setIsIniting(false);
                }
                onAlive();
            }
        }
        if (checkAuthServer) {
            init();
        }
    }, []);

    return (
        <>
            {
                isIniting
                    ? (
                        <div>Loading: Checking authority service status</div>
                    )
                    : (
                        <>
                            <div>Could not connect with the authority service</div>
                            <div>Retrying in: {refreshCountDown}</div>
                        </>
                    )
            }
        </>
    );
};
