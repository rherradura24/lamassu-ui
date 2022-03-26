import { Box, useTheme } from "@mui/system";
import React, { useEffect, useState } from "react";
import * as caActions from "ducks/features/cas/actions";
import * as caSelector from "ducks/features/cas/reducer";
import { useDispatch } from "react-redux";
import { useAppSelector } from "ducks/hooks";
import { Outlet, useNavigate } from "react-router-dom";
import { Grid, IconButton, InputBase, Paper, Typography, Slide, Skeleton } from "@mui/material";
import { CertificateCard } from "views/CertificateAuthoritiesView/components/CertificateCard";
import { AiOutlineSearch } from "react-icons/ai";
import AddIcon from "@mui/icons-material/Add";
import { CertificateAuthority } from "ducks/features/cas/models";

interface Props {
  preSelectedCaName?: string
}

export const CaList: React.FC<Props> = ({ preSelectedCaName }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const requestStatus = useAppSelector((state) => caSelector.getRequestStatus(state));
    const caList = useAppSelector((state) => caSelector.getCAs(state));

    const [filteredCaList, setFilteredCaList] = useState(caList);
    const [selectedCa, setSelectedCa] = useState(preSelectedCaName);
    const [isMainMoadlOpen, setIsMainMoadlOpen] = useState(true);

    const containerRef = React.useRef(null);

    useEffect(() => {
        dispatch(caActions.getCAsAction({}));
    }, []);

    // useEffect(() => {
    //     setSelectedCa(preSelectedCaName);
    // }, [preSelectedCaName]);

    useEffect(() => {
        console.log(caList);

        setFilteredCaList(caList);
    }, [caList]);

    const filterCAs = (name: string) => {
        const interlanlFilteredCaList = caList.filter(caItem => {
            const lowecaseCaName = caItem.name!.toLocaleLowerCase();
            const lowercasePartialCaName = name.toLocaleLowerCase();
            return lowecaseCaName.includes(lowercasePartialCaName);
        });
        setFilteredCaList(interlanlFilteredCaList);
    };
    return (
        <Grid container style={{ height: "100%" }}>
            <Grid item xs={12} md={3} container direction="column" style={{ background: theme.palette.background.lightContrast, width: "100%" }}>
                <Box style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box sx={{ padding: "20px" }}>
                        <Grid item xs={12} container alignItems="center">
                            <Grid item xs={10}>
                                <Box component={Paper} sx={{ padding: "5px", height: 30, display: "flex", alignItems: "center", width: "100%" }}>
                                    <AiOutlineSearch size={20} color={theme.palette.text.primary} style={{ marginLeft: 10, marginRight: 10 }} />
                                    <InputBase onChange={(ev) => filterCAs(ev.target.value)} fullWidth style={{ color: theme.palette.text.primary, fontSize: 14 }} />
                                </Box>
                            </Grid>
                            <Grid item xs={2} container justifyContent={"flex-end"}>
                                <Box component={Paper} elevation={0} style={{ borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40, marginLeft: 10 }}>
                                    <IconButton style={{ background: theme.palette.primary.light }} onClick={() => { setIsMainMoadlOpen(true); navigate("actions/create"); }}>
                                        <AddIcon style={{ color: theme.palette.primary.main }} />
                                    </IconButton>
                                </Box>
                            </Grid>
                        </Grid>
                        {
                            !requestStatus.isLoading && (
                                <Grid item xs={12} style={{ padding: 10 }}>
                                    <Typography style={{ fontWeight: 500, fontSize: 12, color: theme.palette.text.primaryLight }}>{caList.length} RESULTS</Typography>
                                </Grid>
                            )
                        }
                    </Box>
                    <Box style={{ padding: "0px 20px 20px 20px", overflowY: "auto", height: 300, flexGrow: 1 }}>

                        {
                            requestStatus.isLoading
                                ? (
                                    <>
                                        <Skeleton variant="rectangular" width={"100%"} height={100} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                                        <Skeleton variant="rectangular" width={"100%"} height={100} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                                        <Skeleton variant="rectangular" width={"100%"} height={100} sx={{ borderRadius: "10px", marginBottom: "20px" }} />
                                    </>
                                )
                                : (
                                    filteredCaList.map((caItem: CertificateAuthority) => (
                                        <Box style={{ marginBottom: 20 }} key={caItem.name}>
                                            <CertificateCard
                                                onClick={() => {
                                                    setIsMainMoadlOpen(true);
                                                    navigate(caItem.name);
                                                }}
                                                name={caItem.name!}
                                                keyType={caItem.key_metadata.type}
                                                keySize={caItem.key_metadata.bits}
                                                keyStrength={caItem.key_metadata.strength}
                                                keyStrengthColor={caItem.key_metadata.strength_color}
                                                status={caItem.status}
                                                expirationDate={caItem.valid_to}
                                                selected={selectedCa !== undefined ? caItem.name === selectedCa : false}
                                            />
                                        </Box>
                                    ))
                                )
                        }
                    </Box>
                </Box>
            </Grid>

            <Grid item xs={12} md={9} style={{ height: "100%", overflow: "hidden", background: theme.palette.background.default }} ref={containerRef}>
                <Slide direction="left" in={isMainMoadlOpen} container={containerRef.current} style={{ height: "100%" }}>
                    <Box>
                        <Outlet />
                    </Box>
                </Slide>
            </Grid>

        </Grid>
    );
};
