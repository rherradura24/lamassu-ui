import { Doughnut } from "components/Charts/Doughnut"
import { useTheme } from "@emotion/react"

export const DeviceStatusChart = ({ ...props }) => {
  const theme = useTheme()

  const dataset = [
    {
      label: "Pending enrollment",
      value: 10,
      color: theme.palette.chartsColors.blue
    },
    {
      label: "Provisioned",
      value: 30,
      color: theme.palette.chartsColors.green
    },
    {
      label: "About to expire",
      value: 5,
      color: theme.palette.chartsColors.yellow
    },
    {
      label: "Revoked",
      value: 25,
      color: theme.palette.chartsColors.red
    },
    {
      label: "Decomissioned",
      value: 2,
      color: theme.palette.chartsColors.purple
    }]

  return (
        <Doughnut
            small={false}
            dataset={dataset}
            title="Device Provisioning Status"
            primaryStat={26}
            statLabel={"Provisioned Devices"}
            percentage={true}
            cardColor={theme.palette.homeCharts.deviceStatusCard.primary}
            primaryTextColor={theme.palette.homeCharts.deviceStatusCard.text}
            secondaryTextColor={theme.palette.homeCharts.deviceStatusCard.textSecondary}
            {...props}
        />
  )
}
