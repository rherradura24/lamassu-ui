import { Divider, Grid, IconButton, InputBase, Paper, Tab, Tabs, Button, Typography, Popper, Fade } from "@mui/material"
import { Box, useTheme } from "@mui/system"
import { CertificateCard } from "components/CertificateCard"
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect, useState } from "react";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DeleteIcon from '@mui/icons-material/Delete';
import { AMAZON_AWS, MICROSOFT_AZURE, GOOGLE_CLOUD, DISCONNECTED, CONFIGURED } from "./constans";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { materialLight, materialOceanic } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import { LamassuMultiModal, ModalType } from "components/Modal";
import { LamassuTable } from "components/LamassuComponents/Table";
import { LamassuChip, LamassuStatusChip } from "components/LamassuComponents/Chip";

export default () => {
    const theme = useTheme()

    const cas  = [
        {
            id: 0,
            name: "Ikerlan CA",
            keySize: "RSA 4096",
            status: "Active",
            keyStrength: "High",
            expirationDate: "23 June 2022",
            certificate:{
                subject: {
                    country: "ES",
                    state: "Gipuzkoa",
                    locality: "Arrasate",
                    organization: "Ikerlan",
                    organizationUnit: "ZPD",
                    commonName: "zpd.ikerlan.es",
                },
                issuedDate: "28 Nov 2021",
                expirationDate: "23 June 2022",
                serialNumber: "2E:7E:41:27:0F:E0:D9:A8:E4:5E:68:DC:89:64:5F:A5:D0:FB:47:BF",
                issuanceValidity: "365 days"
            }
        },
        {
            id: 1,
            name: "Ikerlan CA Production",
            keySize: "ECC 256",
            status: "Active",
            keyStrength: "Medium",
            expirationDate: "4 Nov 2022",
            certificate:{
                subject: {
                    country: "ES",
                    state: "Gipuzkoa",
                    locality: "Arrasate",
                    organization: "Ikerlan",
                    organizationUnit: "ZPD",
                    commonName: "zpd.ikerlan.es",
                },
                issuedDate: "28 Nov 2021",
                expirationDate: "23 June 2022",
                serialNumber: "2E:7E:41:27:0F:E0:D9:A8:E4:5E:68:DC:89:64:5F:A5:D0:FB:47:BF",
                issuanceValidity: "100 days"
            }
        },
        {
            id: 2,
            name: "Test CA",
            keySize: "ECC 198",
            status: "Active",
            keyStrength: "Low",
            expirationDate: "4 Nov 2022",
            certificate:{
                subject: {
                    country: "ES",
                    state: "Gipuzkoa",
                    locality: "Arrasate",
                    organization: "Ikerlan",
                    organizationUnit: "ZPD",
                    commonName: "zpd.ikerlan.es",
                },
                issuedDate: "28 Nov 2021",
                expirationDate: "23 June 2022",
                serialNumber: "2E:7E:41:27:0F:E0:D9:A8:E4:5E:68:DC:89:64:5F:A5:D0:FB:47:BF",
                issuanceValidity: "100 days"
            }
        },
        {
            id: 3,
            name: "LKS Next CA",
            keySize: "RSA 4096",
            status: "Active",
            keyStrength: "High",
            expirationDate: "23 June 2022",
            certificate:{
                subject: {
                    country: "ES",
                    state: "Gipuzkoa",
                    locality: "Donostia",
                    organization: "LKS Next",
                    organizationUnit: "lks",
                    commonName: "lks-next.es",
                },
                issuedDate: "28 Nov 2021",
                expirationDate: "23 June 2022",
                serialNumber: "2E:7E:41:27:0F:E0:D9:A8:E4:5E:68:DC:89:64:5F:A5:D0:FB:47:BF",
                issuanceValidity: "365 days"
            }
        },
        {
            id: 4,
            name: "Ikerlan CA Test",
            keySize: "ECC 256",
            status: "Active",
            keyStrength: "Medium",
            expirationDate: "4 Nov 2022",
            certificate:{
                subject: {
                    country: "ES",
                    state: "Gipuzkoa",
                    locality: "Arrasate",
                    organization: "Ikerlan",
                    organizationUnit: "ZPD",
                    commonName: "zpd.ikerlan.es",
                },
                issuedDate: "28 Nov 2021",
                expirationDate: "23 June 2022",
                serialNumber: "2E:7E:41:27:0F:E0:D9:A8:E4:5E:68:DC:89:64:5F:A5:D0:FB:47:BF",
                issuanceValidity: "100 days"
            }
        },
        {
            id: 5,
            name: "Test CA",
            keySize: "ECC 198",
            status: "Active",
            keyStrength: "Low",
            expirationDate: "4 Nov 2022",
            certificate:{
                subject: {
                    country: "ES",
                    state: "Gipuzkoa",
                    locality: "Arrasate",
                    organization: "Ikerlan",
                    organizationUnit: "ZPD",
                    commonName: "zpd.ikerlan.es",
                },
                issuedDate: "28 Nov 2021",
                expirationDate: "23 June 2022",
                serialNumber: "2E:7E:41:27:0F:E0:D9:A8:E4:5E:68:DC:89:64:5F:A5:D0:FB:47:BF",
                issuanceValidity: "100 days"
            }
        }
    ]


    const certificateSubject = {
        country: "Country",
        state: "State / Province",
        locality: "Locality",
        organization: "Organization",
        organizationUnit: "Organization Unit",
        commonName: "Common Name",
    }
    
    const certificateProperties = {
        issuedDate: "Issued",
        expirationDate: "Expires",
        serialNumber: "Serial Number",
        issuanceValidity: "Issuance Validity"
    }

    const awsPolicy = {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": [
              "iot:Connect"
            ],
            "Resource": [
              "arn:aws:iot:eu-west-1:345876576284:client/${iot:Connection.Thing.ThingName}"
            ]
          },
          {
            "Effect": "Allow",
            "Action": [
              "iot:Publish",
              "iot:Receive"
            ],
            "Resource": [
              "arn:aws:iot:eu-west-1:345876576284:topic/${iot:Connection.Thing.ThingName}/*"
            ]
          },
          {
            "Effect": "Allow",
            "Action": [
              "iot:Subscribe"
            ],
            "Resource": [
              "arn:aws:iot:eu-west-1:345876576284:topicfilter/${iot:Connection.Thing.ThingName}/*"
            ]
          }
        ]
    }

    const cert = `-----BEGIN CERTIFICATE REQUEST-----
MIICzTCCAbUCAQAwgYcxCzAJBgNVBAYTAkdCMRYwFAYDVQQIEw1TdGFmZm9yZHNo
aXJlMRcwFQYDVQQHEw5TdG9rZSBvbiBUcmVudDEjMCEGA1UEChMaUmVkIEtlc3Ry
ZWwgQ29uc3VsdGluZyBMdGQxIjAgBgNVBAMTGXRlc3RjZXJ0LnJlZGtlc3RyZWwu
Y28udWswggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDWLeW88IeAIa3n
23R99i874fh0jetf+STsGPgkfGXGJ++tclKGk3MJE0ijD4PNaxGXUCNULgn2ROyy
bm5sTmGzpEOD+1AAAyV+pLQoFNkHEFuudGqVM6XkPWfqaM2vKvdzUbPPC0X/MfDF
GPxc8AY3TUM385c9c9/WOIF6NUcAvAFIQF0zG7evzJZBqDb4enUnatMSLHmxRWMi
1JeHtfLINXhNitHewEQWgIB3j1xmh7CPO5FeTb6HzQDxc+f7uMisY6s9J/Ph3GeO
CeIDooqU8jnfV5eGEzIMH5CFMZjajrNKF4DYK3YRyUI0K66+v0KILoUntEs++M20
LhOn+VE9AgMBAAGgADANBgkqhkiG9w0BAQUFAAOCAQEAUWE7oBX3SLjYNM53bsBO
lNGnsgAp1P1fiCPpEKaZGEOUJ2xOguIHSu1N1ZigKpWmiAAZxuoagW1R/ANM3jXp
vCLVBRv40AHCFsot9udrdCYjI43aDHAaYvLmT4/Pvpntcn0/7+g//elAHhr9UIoo
MZwwwo6yom67Jwfw/be/g7Mae7mPHZ2lsQTS02hEeqVynIRk2W9meQULrt+/atog
0mqJSBx0WswtHliTc+nXFpQrwFIEzVuPGCOVw7LmCfNmHNCkZVuRSJB/9MdLmrfw
chPI3NeTGSe+BZfsOtpt2/7j+bqeYKFu8B0stLoJBEnihxUoV18uZOmOeuVuX1N6
nA==
-----END CERTIFICATE REQUEST-----`


    const renderCloudProviderLogo = (cloudProvider) => {
        var image
        switch (cloudProvider) {
            case AMAZON_AWS:
                if (theme.palette.mode === "light") {
                    image =  <img src={process.env.PUBLIC_URL + "/assets/AWS.png"} height={25} />
                }else{
                    image =  <img src={process.env.PUBLIC_URL + "/assets/AWS_WHITE.png"} height={25} />
                }
                break;
            case GOOGLE_CLOUD:
                image =  <img src={process.env.PUBLIC_URL + "/assets/GCLOUD.png"} height={25} />
                break;
            case MICROSOFT_AZURE:
                image =  <img src={process.env.PUBLIC_URL + "/assets/AZURE.png"} height={25} />
                break;
        
            default:
                break;
        }
        return image;
    }

    const cloudProviderTableColumns = [
        {key: "settings", title: "", align: "start", size: 1},
        {key: "connectorId", title: "Connector ID", align: "center", size: 1},
        {key: "connectorStatus", title: "Status", align: "center", size: 2},
        {key: "connectorAlias", title: "Alias", align: "center", size: 2},
        {key: "connectorDeployed", title: "Installed", align: "center", size: 1},
        {key: "connectorAttached", title: "Attached", align: "center", size: 1},
        {key: "actions", title: "", align: "end", size: 1},
    ]

    const devicesTableColumns = [
        {key: "deviceId", title: "ID", align: "center", size: 1},
        {key: "deviceAlias", title: "Name", align: "center", size: 2},
        {key: "keyStrength", title: "Key Strength", align: "center", size: 1},
        {key: "certificateStatus", title: "Certificate Status", align: "center", size: 1},
        {key: "certificateExpiration", title: "Certificate Expiration", align: "center", size: 1},
        {key: "deviceRegistration", title: "Regisitered", align: "center", size: 1},
        {key: "deviceProvision", title: "Last Provisioned", align: "center", size: 1},
    ]

    const cloudProviders = [
        {
            connectorId: "3647562", 
            connectorStatus: DISCONNECTED,
            connectorAlias: {
                provider: AMAZON_AWS,
                alias: "Ikerlan AWS"
            },
            connectorDeployed: "25 June 2021",
            connectorAttached: "28 June 2021",
        },
        {
            connectorId: "7418343", 
            connectorStatus: CONFIGURED,
            connectorAlias: {
                provider: GOOGLE_CLOUD,
                alias: "LKS GCloud"
            },
            connectorDeployed: "4 Oct 2021",
            connectorAttached: "19 OCt 2021",
        },
        {
            connectorId: "1564241", 
            connectorStatus: DISCONNECTED,
            connectorAlias: {
                provider: MICROSOFT_AZURE,
                alias: "Ikerlan Azure"
            },
            connectorDeployed: "11 June 2021",
            connectorAttached: "30 June 2021",
        },
    ]

    const devicesData=[
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "High",
            certificateStatus: "Expired",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "High",
            certificateStatus: "Expired",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "Medium",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "Medium",
            certificateStatus: "Expired",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "Expired",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "Low",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "Low",
            certificateStatus: "Expired",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "74182041940",
            deviceAlias: "Raspberry Pi Node 1",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "5122087452",
            deviceAlias: "Raspberry Pi Node 2",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
        {
            deviceId: "2341787074",
            deviceAlias: "Raspberry Pi Node 3",
            keyStrength: "High",
            certificateStatus: "Active",
            certificateExpiration: "05/01/2022",
            deviceRegistration: "21/11/2021",
            deviceProvision: "22/11/2021",
        },
    ]

    const cloudProvidersRender = cloudProviders.map(cloudProviderItem => {
        return {
            settings: (
                <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                <IconButton>
                        <MoreHorizIcon />
                    </IconButton>
                </Box>
            ),
            connectorId: <Typography style={{fontWeight: "700", fontSize: 14, color: theme.palette.text.primary}}>#{cloudProviderItem.connectorId}</Typography>,
            connectorStatus: (
                cloudProviderItem.connectorStatus === CONFIGURED ? (
                    <LamassuStatusChip label="Configured" color="green"/>
                ) : (
                    <LamassuStatusChip label="Disconnected" color="red"/>
                )
            ),
            connectorAlias: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            {renderCloudProviderLogo(cloudProviderItem.connectorAlias.provider)}
                        </Grid>
                        <Grid item>
                            <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cloudProviderItem.connectorAlias.alias}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            ),
            connectorDeployed: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cloudProviderItem.connectorDeployed}</Typography>,
            connectorAttached: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{cloudProviderItem.connectorAttached}</Typography>,
            actions: (
                <Box>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                                <IconButton>
                                    <FormatAlignJustifyIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box component={Paper} elevation={0} style={{width: "fit-content", borderRadius: 8, background: theme.palette.background.lightContrast, width: 40, height: 40}}>
                                <IconButton>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            ),
        }
    })

    const keyStrengthToColor = (keyStrength) => {
        switch (keyStrength) {
            case "High":
                return "green"
            case "Medium":
                return "orange"
            case "Low":
                return "red"
            default:
                return ""
        }
    }

    const certStatusToColor = (certificateStatus) => {
        switch (certificateStatus) {
            case "Active":
                return "green"
            case "Expired":
                return "red"
            default:
                return ""
        }
    }

    const devicesRender = devicesData.map(dev => {
        return {
            deviceId: <Typography style={{fontWeight: "700", fontSize: 14, color: theme.palette.text.primary}}>#{dev.deviceId}</Typography>,
            deviceAlias: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{dev.deviceAlias}</Typography>,

            keyStrength: (
                <LamassuChip label={dev.keyStrength} color={keyStrengthToColor(dev.keyStrength)}/>
            ), 
            certificateStatus:(
                <LamassuChip label={dev.certificateStatus} color={certStatusToColor(dev.certificateStatus)}/>
            ), 
            certificateExpiration: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{dev.certificateExpiration}</Typography>,
            deviceRegistration: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{dev.deviceRegistration}</Typography>,
            deviceProvision: <Typography style={{fontWeight: "400", fontSize: 14, color: theme.palette.text.primary}}>{dev.deviceProvision}</Typography>,
        }
    })


    const [caList, setCaList] = useState(cas)
    const [filteredCaList, setFilteredCaList] = useState(cas)

    const [selectedCaItemId, setSelectedCaItemId] = useState()
    const [selectedCaItem, setSelectedCaItem] = useState()
    const [selectedTab, setSelectedTab] = useState(0)

    const [openSearchFilter, serOpenSearchFilter] = useState(false);
    const [anchorElSearchFilter, serAnchorElSearchFilter] = useState(null);

    const [isMoadlOpen, setIsMoadlOpen] = useState(false);
   
    const handleSearchFilterClick = (event) => {
        serAnchorElSearchFilter(event.currentTarget);
        serOpenSearchFilter((previousOpen) => !previousOpen);
    };

    const canBeOpen = openSearchFilter && Boolean(anchorElSearchFilter);
    const id = canBeOpen ? 'transition-popper' : undefined;  
    
    useEffect(()=>{
        setSelectedCaItem(caList.filter(caItem => caItem.id === selectedCaItemId)[0])
        setSelectedTab(0)
    }, [selectedCaItemId])

    const filterCAs = (partialCaName) => {
        const interlanlFilteredCaList = caList.filter(caItem => {
            const lowecaseCaName = caItem.name.toLocaleLowerCase()
            const lowercasePartialCaName = partialCaName.toLocaleLowerCase()
            return lowecaseCaName.includes(lowercasePartialCaName)
        })
        setFilteredCaList(interlanlFilteredCaList)
    }
    
    return(
        <Grid container style={{height: "100%"}}>
            <Grid item xs={5} xl={3} container direction="column" style={{background: theme.palette.background.lightContrast}}>
                <Box style={{display: "flex", flexDirection: "column", height: "100%"}}>
                    <Box container style={{padding: 20}}>
                        <Grid item xs={12} container alignItems="center" style={{background: theme.palette.background.darkContrast, borderRadius: 10, padding: 5}}>
                            <Grid item xs={10} style={{paddingLeft: 10}}>
                                <InputBase 
                                    fullWidth
                                    onChange={(ev)=>filterCAs(ev.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2} container justifyContent="flex-end">
                                <Box component={Paper} elevation={1} style={{width: "fit-content", borderRadius: 8}}>
                                    <IconButton onClick={handleSearchFilterClick}>
                                        <FilterListIcon />
                                    </IconButton>
                                </Box>
                                <Popper id={id} open={openSearchFilter} anchorEl={anchorElSearchFilter} transition>
                                    {({ TransitionProps }) => (
                                        <ClickAwayListener onClickAway={handleSearchFilterClick}>
                                            <Fade {...TransitionProps} timeout={350}>
                                                <Box component={Paper} elevation={2} style={{borderRadius: 10, padding: 20}}>
                                                    The content of the Popper.
                                                </Box>
                                            </Fade>
                                        </ClickAwayListener>
                                    )}
                                </Popper>

                            </Grid>
                        </Grid>

                        <Grid item xs={12} style={{padding: 10}}>
                            <Typography style={{fontWeight: 500, fontSize: 12, color: theme.palette.text.primaryLight}}>{caList.length} RESULTS</Typography>
                        </Grid>
                    </Box>
                    <Box style={{padding: 20, overflowY: "auto", height: 300, flexGrow: 1}}>
                            {
                                filteredCaList.map(caItem=>(
                                    <Box style={{marginBottom: 20}} key={caList.id}>
                                        <CertificateCard onClick={()=>{setSelectedCaItemId(caItem.id)}} name={caItem.name} keySize={caItem.keySize} keyStrength={caItem.keyStrength} status={caItem.status} expirationDate={caItem.expirationDate} selected={caItem.id === selectedCaItemId}/>
                                    </Box>
                                ))
                            }
                    
                    </Box>
                    <Grid container spacing={1} style={{padding: 20, width: "auto"}}>
                        <Grid item xs={8}>
                            <Button variant="contained" fullWidth onClick={()=>{setIsMoadlOpen(true)}}>Create CA</Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button variant="contained" fullWidth>Import CA</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={7} xl={9} style={{height: "100%"}}>
                {
                    selectedCaItem && (
                        <Box style={{display: "flex", flexDirection: "column", height: "100%"}}>
                            <Box style={{padding: "40px 40px 0 40px"}}>
                                <Grid item container spacing={2} justifyContent="flex-start">
                                    <Grid item xs={9}>
                                        <Box style={{display: "flex", alignItems: "center"}}>
                                            <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 26, lineHeight: "24px"}}>{selectedCaItem.name}</Typography>
                                            {
                                                selectedCaItem.keyStrength === "High" && (
                                                <Box style={{background: theme.palette.success.light, borderRadius: 20, marginLeft: 10, paddingLeft: 10, paddingRight: 10, width: "fit-content"}}>
                                                    <Typography style={{color: theme.palette.success.main , fontWeight: "600"}}>{selectedCaItem.keyStrength}</Typography>
                                                </Box>
                                                )
                                            }
                                            {
                                                selectedCaItem.keyStrength === "Medium" && (
                                                <Box style={{background: theme.palette.warning.light, borderRadius: 20, marginLeft: 10, paddingLeft: 10, paddingRight: 10, width: "fit-content"}}>
                                                    <Typography style={{color: theme.palette.warning.main, fontWeight: "600"}}>{selectedCaItem.keyStrength}</Typography>
                                                </Box>
                                                )
                                            }
                                            {
                                                selectedCaItem.keyStrength === "Low" && (
                                                <Box style={{background: theme.palette.error.light, borderRadius: 20, marginLeft: 10, paddingLeft: 10, paddingRight: 10, width: "fit-content"}}>
                                                    <Typography style={{color: theme.palette.error.main, fontWeight: "600"}}>{selectedCaItem.keyStrength}</Typography>
                                                </Box>
                                                )
                                            }
                                            <Box style={{background: theme.palette.background.lightContrast, borderRadius: 20, marginLeft: 5,  paddingLeft: 10, paddingRight: 10, width: "fit-content"}}>
                                                <Typography style={{color: theme.palette.text.primary, fontWeight: "500"}}>{selectedCaItem.status}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={3} container justifyContent="flex-end">
                                        <Grid item>
                                            <IconButton style={{background: theme.palette.error.light}}>
                                                <DeleteIcon style={{color: theme.palette.error.main}}/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item container spacing={2} justifyContent="flex-start" style={{marginTop: 0}}>
                                    <Grid item style={{paddingTop: 0}}>
                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13}}>#{selectedCaItem.keySize}</Typography>
                                    </Grid>
                                    <Grid item style={{paddingTop: 0}}>
                                        <Box style={{display: "flex", alignItems: "center"}}>
                                            <AccessTimeIcon style={{color: theme.palette.text.secondary, fontSize: 15,marginRight: 5}}/>
                                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 13}}>{`Expiration date: ${selectedCaItem.expirationDate}`}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Box style={{marginTop: 15, position: "relative", left: "-15px"}}>
                                    <Tabs value={selectedTab} onChange={(ev, newValue)=>setSelectedTab(newValue)}>
                                        <Tab label="Overview" />
                                        <Tab label="Issued Certificates" />
                                        <Tab label="Cloud Providers" />
                                    </Tabs>
                                </Box>
                            </Box>
                            <Divider></Divider>
                            <Box style={{padding: 40, flexGrow: 1, height: 500, overflowY: "auto"}}>
                                <Grid container>
                                    {
                                        selectedTab === 0 && (
                                            <Grid item container>
                                                <Grid item container>
                                                    <Grid item xs={6} container>
                                                        <Grid item xs={12} style={{marginBottom: 10}}>
                                                            <Typography variant="button" style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 17}}>Subject</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} container spacing={1}>
                                                            {
                                                                Object.keys(certificateSubject).map(key=>(
                                                                    <Grid item xs={12} container>
                                                                        <Grid item xs={6}>
                                                                            <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 13}}>{certificateSubject[key]}</Typography>
                                                                        </Grid>
                                                                        <Grid item xs={6}>
                                                                            <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13}}>{selectedCaItem.certificate.subject[key]}</Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                ))
                                                            }
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={6} container style={{height: "fit-content"}}>
                                                        <Grid item xs={12} style={{marginBottom: 10}}>
                                                            <Typography variant="button" style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 17}}>Properties</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} container>
                                                        {
                                                            Object.keys(certificateProperties).map(key=>(
                                                                <Grid item xs={12} container style={{heigh: 25, marginBottom: 8}}>
                                                                    <Grid item xs={6}>
                                                                        <Typography style={{color: theme.palette.text.primary, fontWeight: "500", fontSize: 13}}>{certificateProperties[key]}</Typography>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <Typography style={{color: theme.palette.text.secondary, fontWeight: "500", fontSize: 13, wordBreak: "break-word"}}>{selectedCaItem.certificate[key]}</Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            ))
                                                        }
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={6} style={{marginTop: 20}}>
                                                    <SyntaxHighlighter language="json" style={materialLight} customStyle={{fontSize: 10, padding:20, borderRadius: 10, width: "fit-content"}} wrapLines={true} lineProps={{style:{color: theme.palette.text.primaryLight}}}>
                                                        {cert}
                                                    </SyntaxHighlighter>
                                                </Grid>
                                            </Grid>
                                        )
                                    }
                                    {
                                        selectedTab === 1 && (
                                            <LamassuTable columnConf={cloudProviderTableColumns} data={cloudProvidersRender}/>
                                        )
                                    }
                                    {
                                        selectedTab === 2 && (
                                            <LamassuTable columnConf={devicesTableColumns} data={devicesRender} />
                                            /* <>
                                                <Box style={{borderRadius: 10, background: "#263238", padding: 10}}>
                                                    <SyntaxHighlighter language="json" style={materialOceanic} customStyle={{fontSize: 11}}>
                                                        {JSON.stringify(awsPolicy, null, 4)}
                                                    </SyntaxHighlighter>
                                                </Box>

                                            </> */
                                        )
                                    }
                                </Grid>
                            </Box>

                        </Box>
                    )
                }
            </Grid>
            <LamassuMultiModal 
                type={ModalType.CA_CREATION}
                open={isMoadlOpen}
                handleClose={()=>{setIsMoadlOpen(false)}} 
                handleSubmit={(ev)=>{setIsMoadlOpen(false)}} 
            />
        </Grid>
    )
}