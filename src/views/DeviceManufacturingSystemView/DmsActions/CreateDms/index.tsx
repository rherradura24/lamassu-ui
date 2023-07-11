import React, { useState } from "react";

import { Button, Chip, Dialog, DialogContent, DialogTitle, Divider, Grid, MenuItem, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "ducks/hooks";
import * as dmsSelector from "ducks/features/dms-enroller/reducer";
import * as dmsApicalls from "ducks/features/dms-enroller/apicalls";
import { useDispatch } from "react-redux";
import * as CG from "react-icons/cg";
import { useForm } from "react-hook-form";
import { Icon } from "components/LamassuComponents/dui/IconInput";
import { FormTextField } from "components/LamassuComponents/dui/form/TextField";
import { FormSelect } from "components/LamassuComponents/dui/form/Select";
import { SubsectionTitle } from "components/LamassuComponents/dui/typographies";
import { FormIconInput } from "components/LamassuComponents/dui/form/IconInput";
import { FormSwitch } from "components/LamassuComponents/dui/form/Switch";
import Label from "components/LamassuComponents/dui/typographies/Label";
import CertificateImporter from "components/LamassuComponents/composed/CreateCAForm/CertificateImporter";
import { TextField } from "components/LamassuComponents/dui/TextField";

import CASelector from "components/LamassuComponents/lamassu/CASelector";
import { FormMultiTextInput } from "components/LamassuComponents/dui/form/MultiTextInput";
import { CertificateAuthority } from "ducks/features/cas/models";
type StaticCertificate = {
    name: string
    certificate: string
}

const StaticCertificateListInput = () => {
    const [openAddCertModal, setOpenAddCertModal] = useState(false);
    const [certificates, setCertificates] = useState<StaticCertificate[]>([]);

    const [newCertificateName, setNewCertificateName] = useState("");

    return (
        <Grid container spacing={1} alignItems={"center"}>
            {
                certificates.map((cert, idx) => (
                    <Grid item key={idx}>
                        <Chip label={cert.name} sx={{ borderRadius: "5px" }} onDelete={() => {
                            const newArray = [...certificates];
                            newArray.splice(idx, 1);
                            setCertificates(newArray);
                        }} />
                    </Grid>
                ))
            }
            <Grid item>
                <Button variant="outlined" onClick={() => { setOpenAddCertModal(true); }}>Add New Certificate</Button>
            </Grid>
            {
                openAddCertModal && (
                    <Dialog open={openAddCertModal} onClose={() => setOpenAddCertModal(false)} maxWidth={"md"}>
                        <DialogTitle>
                            <Typography variant="h2" sx={{ fontWeight: "500", fontSize: "1.25rem" }}>Add New Certificate</Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2} flexDirection={"column"}>
                                <Grid item>
                                    <TextField label="Name" value={newCertificateName} onChange={(ev) => setNewCertificateName(ev.target.value)} />
                                </Grid>
                                <Grid item>
                                    <CertificateImporter onCreate={(crt) => {
                                        setCertificates([...certificates, { certificate: crt, name: newCertificateName }]);
                                        setOpenAddCertModal(false);
                                        setNewCertificateName("");
                                    }} />
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                )
            }
        </Grid>
    );
};

type FormData = {
    dmsDefinition: {
        name: string;
        deploymentMode: "onpremise" | "cloud";
    }
    enrollProtocol: {
        protocol: "EST"
        estAuthMode: "BOOTSTRAP_MTLS";
        enrollmentCA: undefined | CertificateAuthority;
        validationCA: undefined | CertificateAuthority;
        overrideEnrollment: false,
    }
    enrollDeviceRegistration: {
        icon: Icon,
        tags: string[]
    },
    reEnroll: {
        allowedRenewalDelta: string;
        allowExpired: boolean;
    },
    caDistribution: {
        includeDownstream: boolean;
        includeAuthorized: boolean;
        managedCAs: CertificateAuthority[]
        staticCAs: StaticCertificate[]
    },
    iotIntegrations: {
        enableShadow: boolean;
        enableCADistributionSync: boolean
        shadowType: "classic" | "named";
    }
};

export const CreateDms = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const requestSt1tus = useAppSelector((state) => dmsSelector.getRequestStatus(state)!);
    const privateKey = useAppSelector((state) => dmsSelector.getLastCreatedDMSPrivateKey(state)!);

    const { control, setValue, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
        defaultValues: {
            dmsDefinition: {
                name: "",
                deploymentMode: "cloud"
            },
            enrollProtocol: {
                protocol: "EST",
                estAuthMode: "BOOTSTRAP_MTLS",
                overrideEnrollment: false,
                enrollmentCA: undefined,
                validationCA: undefined
            },
            enrollDeviceRegistration: {
                icon: {
                    bg: "#25eee2",
                    fg: "#333333",
                    icon: { icon: CG.CgSmartphoneChip, name: "CgSmartphoneChip" }
                },
                tags: ["iot"]
            },
            reEnroll: {
                allowedRenewalDelta: "100d",
                allowExpired: false
            },
            caDistribution: {
                includeDownstream: true,
                managedCAs: [],
                staticCAs: []
            },
            iotIntegrations: {
                enableShadow: true,
                enableCADistributionSync: true,
                shadowType: "classic"
            }
        }
    });

    const onSubmit = handleSubmit(data => {
        const run = async () => {
            console.log(data);
            const actionPayload = {
                name: data.dmsDefinition.name,
                cloud_dms: data.dmsDefinition.deploymentMode === "cloud",
                aws: {
                    shadow_type: data.iotIntegrations.shadowType === "classic" ? "CLASSIC" : "NAMED"
                },
                identity_profile: {
                    general_setting: {
                        enrollment_mode: data.enrollProtocol.protocol
                    },
                    enrollment_settings: {
                        authentication_mode: data.enrollProtocol.estAuthMode,
                        allow_new_auto_enrollment: data.enrollProtocol.overrideEnrollment,
                        tags: data.enrollDeviceRegistration.tags,
                        icon: data.enrollDeviceRegistration.icon.icon.name,
                        color: `${data.enrollDeviceRegistration.icon.bg}-${data.enrollDeviceRegistration.icon.fg}`,
                        authorized_ca: data.enrollProtocol.enrollmentCA?.name,
                        bootstrap_cas: [
                            data.enrollProtocol.validationCA?.name
                        ]
                    },
                    reenrollment_settings: {
                        allow_expired_renewal: data.reEnroll.allowExpired,
                        preventive_renewal_interval: data.reEnroll.allowedRenewalDelta
                    },
                    ca_distribution_settings: {
                        include_lamassu_downstream_ca: data.caDistribution.includeDownstream,
                        managed_cas: data.caDistribution.managedCAs.map(ca => ca.name),
                        static_cas:
                            data.caDistribution.staticCAs.map(ca => {
                                return {
                                    id: ca.name,
                                    certificate: ca.certificate
                                };
                            })
                    },
                    aws_iotcore_publish: data.iotIntegrations.enableCADistributionSync
                }
            };
            console.log(actionPayload);
            await dmsApicalls.createDMS(actionPayload);
            await dmsApicalls.updateDMS({ ...actionPayload, status: "APPROVED" });
            navigate("/dms");
        };
        run();
    });

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ width: "100%", paddingY: "20px" }}>
                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <SubsectionTitle>Device Manufacturing Definition</SubsectionTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextField label="DMS Name" control={control} name="dmsDefinition.name" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormSelect control={control} name="dmsDefinition.deploymentMode" label="Deployment Mode">
                            <MenuItem value={"cloud"}>Hosted by Lamassu</MenuItem>
                            <MenuItem disabled value={"onpremise"}>On Premise</MenuItem>
                        </FormSelect>
                    </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <Divider />
                </Grid>

                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <SubsectionTitle>Enrollment Device Registration</SubsectionTitle>
                    </Grid>
                    <Grid item xs="auto">
                        <FormIconInput control={control} name="enrollDeviceRegistration.icon" label="Icon" />
                    </Grid>
                    <Grid item xs>
                        <FormMultiTextInput control={control} name="enrollDeviceRegistration.tags" label="Tags" multiple freeSolo options={[]} disabled />
                        {/* <MultiTextInput label="Tags" multiple freeSolo options={[]} disabl /> */}
                    </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <Divider />
                </Grid>

                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <SubsectionTitle>Enrollment Settings</SubsectionTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <FormSelect control={control} name="enrollProtocol.protocol" label="Protocol">
                            <MenuItem value={"EST"}>Enrollment Over Secure Transport</MenuItem>
                        </FormSelect>
                    </Grid>
                    <Grid item xs={12}>
                        <FormSelect control={control} name="enrollProtocol.estAuthMode" label="Authentication Mode">
                            <MenuItem value={"BOOTSTRAP_MTLS"}>Mutual TLS</MenuItem>
                            <MenuItem disabled value={"JWT"}>JWT</MenuItem>
                        </FormSelect>
                    </Grid>
                    <Grid item xs={12}>
                        <CASelector onSelect={(elems) => {
                            if (!Array.isArray(elems)) {
                                setValue("enrollProtocol.enrollmentCA", elems);
                            }
                        }} multiple={false} label="Enrollment CA"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CASelector onSelect={(elems) => {
                            if (!Array.isArray(elems)) {
                                setValue("enrollProtocol.validationCA", elems);
                            }
                        }} multiple={false} label="Validation CA (Bootstrap CA)" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormSwitch control={control} name="enrollProtocol.overrideEnrollment" label="Allow Override Enrollment" />
                    </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <Divider />
                </Grid>

                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <SubsectionTitle>ReEnrollment Settings</SubsectionTitle>
                    </Grid>
                    <Grid item xs={12}>
                        <FormSwitch control={control} name="reEnroll.allowExpired" label="Allow Expired Renewal" />
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextField control={control} name="reEnroll.allowedRenewalDelta" label="Allowed Renewal Period" />
                    </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <Divider />
                </Grid>

                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <SubsectionTitle>CA Distribution</SubsectionTitle>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <CASelector />
                    </Grid> */}
                    <Grid item xs={12} container flexDirection={"column"}>
                        <FormSwitch control={control} name="caDistribution.includeDownstream" label="Include &apos;Downstream&apos; CA used by Lamassu" />
                    </Grid>
                    <Grid item xs={12} container>
                        <CASelector onSelect={(elems) => {
                            if (Array.isArray(elems)) {
                                setValue("caDistribution.managedCAs", elems);
                            }
                        }} multiple={true} label="Managed CAs" />
                    </Grid>
                    <Grid item xs={12} container flexDirection={"column"}>
                        <Grid item sx={{ marginBottom: "5px" }}>
                            <Label>Static CAs</Label>
                        </Grid>

                        <Grid item>
                            <StaticCertificateListInput />
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <Divider />
                </Grid>

                <Grid item container spacing={2}>
                    <Grid item xs={12}>
                        <SubsectionTitle>AWS IoT Settings</SubsectionTitle>
                    </Grid>

                    <Grid item xs={12} container flexDirection={"column"}>
                        <FormSwitch control={control} name="iotIntegrations.enableShadow" label="Enable Shadow Sync" />
                    </Grid>

                    <Grid item xs={12} container flexDirection={"column"}>
                        <FormSwitch control={control} name="iotIntegrations.enableCADistributionSync" label="Enable CA Distribution using retained message" />
                    </Grid>

                    <Grid item xs={12} container flexDirection={"column"}>
                        <FormSelect control={control} name="iotIntegrations.shadowType" label="AWS Shadow Type">
                            <MenuItem value={"classic"}>Classic Shadow</MenuItem>
                            <MenuItem value={"named"}>Named Shadow</MenuItem>
                        </FormSelect>
                    </Grid>
                </Grid>

                <Grid item sx={{ width: "100%" }}>
                    <Divider />
                </Grid>

                <Grid item container>
                    <Grid item>
                        <Button variant="contained" type="submit">Create DMS</Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};
