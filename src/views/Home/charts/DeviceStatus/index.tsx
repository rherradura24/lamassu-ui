import { Doughnut } from "components/Charts/Doughnut";
import { useAppSelector } from "ducks/hooks";
import { useEffect } from "react";
import * as devicesAction from "ducks/features/devices/actions";
import * as devicesSelector from "ducks/features/devices/reducer";
import { useDispatch } from "react-redux";
import { useTheme } from "@mui/material";

export const DeviceStatusChart = ({ ...props }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const devicesStats = useAppSelector((state) => devicesSelector.getDevicesStats(state));
    const refreshAction = () => {
        dispatch(devicesAction.getStatsAction.request({ force: false }));
    };

    useEffect(() => {
        refreshAction();
    }, []);

    const totalDevices = devicesStats.stats !== undefined ? devicesStats.stats.pending_enrollment! + devicesStats.stats.expired! + devicesStats.stats.provisioned! + devicesStats.stats.revoked! + devicesStats.stats.decommissioned! : 0;
    const primaryStat = devicesStats.stats !== undefined ? Math.floor(devicesStats.stats.provisioned! * 100 / totalDevices) : "-";

    const dataset = [
        {
            label: "Pending enrollment",
            value: devicesStats.stats ? devicesStats.stats.pending_enrollment : 0,
            color: theme.palette.chartsColors.blue
        },
        {
            label: "Provisioned",
            value: devicesStats.stats ? devicesStats.stats.provisioned : 0,
            color: theme.palette.chartsColors.green
        },
        {
            label: "About to expire",
            value: devicesStats.stats ? devicesStats.stats.expired : 0,
            color: theme.palette.chartsColors.yellow
        },
        {
            label: "About to expire",
            value: devicesStats.stats ? devicesStats.stats.expired : 0,
            color: theme.palette.chartsColors.yellow
        },
        {
            label: "Revoked",
            value: devicesStats.stats ? devicesStats.stats.revoked : 0,
            color: theme.palette.chartsColors.red
        },
        {
            label: "Decommissioned",
            value: devicesStats.stats ? devicesStats.stats.decommissioned : 0,
            color: theme.palette.chartsColors.purple
        }];

    return (

        <Doughnut
            small={false}
            dataset={dataset}
            title="Device Provisioning Status"
            primaryStat={primaryStat}
            statLabel={"Provisioned Devices"}
            percentage={true}
            cardColor={theme.palette.homeCharts.deviceStatusCard.primary}
            primaryTextColor={theme.palette.homeCharts.deviceStatusCard.text}
            secondaryTextColor={theme.palette.homeCharts.deviceStatusCard.textSecondary}
            {...props}
        />
    );
};
