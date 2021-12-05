import { TableContainer, Table as MUITable, TableHead, TableRow, TableBody, TableCell, Paper }from "@mui/material";
import { styled } from "@mui/system";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: "#F8FAFE",
    },
    // hide last border
    'tr': {
        border: "1px solid #ddd",
        borderRadius: 8,
        margin: 10
    },
}));

const Table = ({ columnConf = [], data = [], elevation = 0, style = {} }) => {
    return (
        <TableContainer component={Paper} elevation={elevation} style={style}>
            <MUITable elevation={0}>
                <TableHead>
                    <TableRow>
                        {columnConf.map((column, idx) => (
                            <TableCell
                                key={"headcell" + idx}
                                align={column.align}
                                style={{ width: column.size ? column.size : "auto" }}
                            >
                                {column.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((rowObj, idx) => (
                        <StyledTableRow key={"row" + idx}>
                            {columnConf.map((column, idx) => (
                                <TableCell
                                    style={column.key == "historical" ? { padding: 0 } : {}}
                                    key={"bodycell" + idx}
                                    align={column.align}
                                    onClick={(event) => {
                                        column.action && column.action(rowObj);
                                    }}
                                >
                                    {rowObj[column.key]}
                                </TableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </MUITable>
        </TableContainer>
    );
};

export {Table}