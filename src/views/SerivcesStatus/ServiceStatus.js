import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@material-ui/core"

const ServicesStatus = ({services}) => {
    const theme = useTheme();

    const statusColor = (status) => {
        var color = "#A8AEB9"
        if (status == "passing") {
            color = "#2EB039"
        } else if (status == "warning") {
            color = "#FA8F37"
        } else if (status == "critical") {
            color = "#C73445"
        }
        return color
    }
    
    return (
        <Box style={{padding: 20}}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead style={{background: theme.palette.secondary.main}}>
                        <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell >Service URL</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {services.map((svc) => (
                        <TableRow key={svc.name}>
                            <TableCell component="th" scope="row">
                                {svc.name}
                            </TableCell>
                            <TableCell>
                                <Box style={{display: "flex"}}>
                                    {svc.status.map((status) => (
                                        <div style={{width: 15, height: 15, borderRadius: 10, margin:5, background: statusColor(status)}}/>
                                    ))}
                                </Box>
                            </TableCell>
                            <TableCell >
                                https://lamassu.zpd.ikerlan.es
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export {ServicesStatus}