import { Alert } from "@mui/material";
import { CryptoEngine } from "ducks/features/cas/models";
import { CryptoEngineViewer, CryptoEngineViewerProps } from "./CryptoEngineViewer";
import { FetchViewer } from "components/FetchViewer";
import React from "react";
import useCachedEngines from "components/cache/cachedEngines";

interface Props extends Omit<CryptoEngineViewerProps, "engine"> {
    engineID?: string,
    defaultEngine?: boolean
}

export const CryptoEngineFetchViewer: React.FC<Props> = ({ engineID, defaultEngine = false, ...rest }) => {
    const { getEnginesData } = useCachedEngines();
    return (
        <FetchViewer fetcher={() => getEnginesData()} renderer={(engines) => {
            let engine: CryptoEngine | undefined;
            if (defaultEngine) {
                engine = engines.find(engine => engine.default);
            } else {
                engine = engines.find(engine => engine.id === engineID);
            }

            if (engine) {
                return (
                    <CryptoEngineViewer engine={engine} {...rest} />
                );
            }
            return (
                <Alert severity="warning">
                    {`Could not find engine "${engineID}"`}
                </Alert>
            );
        }} />

    );
};
