import React, { useEffect, useState } from "react";

import { Button, Grid, Typography, useTheme } from "@mui/material";

import { LamassuSwitch } from "components/LamassuComponents/Switch";
import { LamassuChip } from "components/LamassuComponents/Chip";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import * as caSelector from "ducks/features/cas/reducer";
import * as caActions from "ducks/features/cas/actions";
import { CertificateAuthority } from "ducks/features/cas/models";
import { LamassuTableWithDataController, LamassuTableWithDataControllerConfigProps } from "components/LamassuComponents/Table";
import deepEqual from "fast-deep-equal/es6";

interface Props {
    onClose: any,
    childToParent: any
}

export const BootstrapDMS: React.FC<Props> = ({ onClose = () => { }, childToParent }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const caRequestStatus = useAppSelector((state) => caSelector.getRequestStatus(state));
    const caList = useAppSelector((state) => caSelector.getCAs(state));
    const totalCAs = useAppSelector((state) => caSelector.getTotalCAs(state));
    const [selectedCas, setSelectedCas] = useState<Array<string>>([]);
    const [caName, setCaName] = useState("");

    const [tableConfig, setTableConfig] = useState<LamassuTableWithDataControllerConfigProps>(
        {
            filter: {
                enabled: false,
                filters: []
            },
            sort: {
                enabled: true,
                selectedField: "name",
                selectedMode: "asc"
            },
            pagination: {
                enabled: true,
                options: [10, 25, 50],
                selectedItemsPerPage: 10,
                selectedPage: 0
            }
        }
    );

    const refreshAction = () => dispatch(caActions.getCAsAction.request({
        offset: tableConfig.pagination.selectedPage! * tableConfig.pagination.selectedItemsPerPage!,
        limit: tableConfig.pagination.selectedItemsPerPage!,
        sortField: tableConfig.sort.selectedField!,
        sortMode: tableConfig.sort.selectedMode!,
        filterQuery: tableConfig.filter.filters!.map((f:any) => { return f.propertyKey + "[" + f.propertyOperator + "]=" + f.propertyValue; })
    }));

    useEffect(() => {
        refreshAction();
    }, []);

    useEffect(() => {
        if (tableConfig !== undefined) {
            console.log("call ", tableConfig);
            refreshAction();
        }
    }, [tableConfig]);

    const casTableColumns = [
        { key: "bootstrap", title: "Bootstrap CAs", align: "start", size: 1 },
        { key: "ca", title: "Main CA", align: "start", size: 1 },
        { key: "name", title: "Name", dataKey: "name", align: "center", query: true, size: 2 },
        { key: "serialnumber", title: "Serial Number", align: "center", size: 3 },
        { key: "status", title: "Status", align: "center", size: 1 },
        { key: "keystrength", title: "Key Strength", align: "center", size: 1 },
        { key: "keyprops", title: "Key Properties", align: "center", size: 1 }
    ];

    const casRender = (ca: CertificateAuthority) => {
        console.log(ca.name, selectedCas.includes(ca.name));
        return {
            bootstrap: <><LamassuSwitch value={selectedCas.includes(ca.name)} onChange={() => {
                setSelectedCas((prev: string[]) => {
                    if (prev.includes(ca.name)) {
                        prev.splice(prev.indexOf(ca.name), 1);
                    } else {
                        prev.push(ca.name);
                    }
                    return prev;
                }); console.log(selectedCas);
            }} />
            </>,
            ca: (ca.name === caName
                ? <LamassuSwitch value={ca.name} style={{ color: theme.palette.secondary.dark }} checked={true} onChange={() => {
                    setCaName(ca.name); console.log(caName);
                }} />
                : <LamassuSwitch value={ca.name} style={{ color: "grey" }} checked={false} onChange={() => {
                    setCaName(ca.name); console.log(caName);
                }} />),
            name: <Typography style={{ fontWeight: "500", fontSize: 14, color: theme.palette.text.primary }}>{ca.name}</Typography>,
            serialnumber: <Typography style={{ fontWeight: "500", fontSize: 14, color: theme.palette.text.primary }}>{ca.serial_number}</Typography>,
            status: <LamassuChip label={ca.status} color={ca.status_color} />,
            keystrength: <LamassuChip label={ca.key_metadata.strength} color={ca.key_metadata.strength_color} />,
            keyprops: <Typography style={{ fontWeight: "400", fontSize: 14, color: theme.palette.text.primary, textAlign: "center" }}>{`${ca.key_metadata.type} ${ca.key_metadata.bits}`}</Typography>
        };
    };

    return (
        <Grid container spacing={12} justifyContent="center" alignItems="center" >
            <Grid item xs={12}>
                <Grid container style={{ marginTop: "10px" }}>
                    <Grid item xs={12}>
                        <Typography variant="button">Bootstrap CA Name: </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} container sx={{ marginTop: "20px" }}>
                    <LamassuTableWithDataController
                        data={caList}
                        invertContrast={true}
                        totalDataItems={totalCAs}
                        columnConf={casTableColumns}
                        renderDataItem={casRender}
                        isLoading={caRequestStatus.isLoading}
                        emptyContentComponent={
                            <Typography>No CAs</Typography>
                        }
                        config={tableConfig}
                        onChange={(ev: any) => {
                            console.log(ev, tableConfig);
                            if (!deepEqual(ev, tableConfig)) {
                                setTableConfig(prev => ({ ...prev, ...ev }));
                                // refreshAction();
                            }
                        }}
                    />
                </Grid>
                <Button onClick={() => onClose()} variant="outlined">Cancel</Button>
                <Button onClick={() => childToParent(selectedCas, caName)} variant="contained">Accept</Button>
            </Grid>
        </Grid>
    );
};
