import { CertificateAuthority } from "ducks/features/cas/models";
import { FetchHandle, FetchViewer } from "components/FetchViewer";
import { Typography } from "@mui/material";
import React, { ReactElement, Ref, useEffect } from "react";
import useCachedCA from "components/cache/cachedCAs";

type Props = {
    id: string
    renderer: (item: CertificateAuthority) => React.ReactElement
}

const Viewer = (props: Props, ref: Ref<FetchHandle>) => {
    const { getCAData } = useCachedCA();

    if (props.id === "") {
        return <Typography sx={{ fontStyle: "italic" }}>Unspecified</Typography>;
    }

    useEffect(() => {
        // @ts-ignore
        if (ref && ref.current) {
            // @ts-ignore
            ref.current.refresh();
        }
    }, [props.id]);

    return (
        <FetchViewer
            fetcher={(controller) => { return getCAData(props.id); }}
            renderer={(item: CertificateAuthority) => props.renderer(item)}
            ref={ref}
        />
    );
};

export const CACustomFetchViewer = React.forwardRef(Viewer) as (props: Props & { ref?: Ref<FetchHandle> }) => ReactElement;
