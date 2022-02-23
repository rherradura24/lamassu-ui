import { Grid, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";


export const LamassuTable = ({ columnConf = [], data = [], style = {} }) => {
    const theme = useTheme()
    return (
        <>
            <Grid container spacing={1}>
            {
                <Grid item columns={columnConf.reduce((prev, item)=>prev + item.size, 0)} container alignItems="center" style={{padding: "0 10px 0 10px"}}> 
                    {
                        columnConf.map(item=>(
                            <Grid item xs={item.size} container justifyContent="center" style={{marginBottom: 15}}>
                                <Typography style={{color: theme.palette.text.secondary, fontWeight: "400", fontSize: 12, textAlign: "center"}}>{item.title}</Typography>
                            </Grid>
                        ))
                    }
                </Grid>
            }
            {
                data.map(dataItem=>(
                    <Grid item columns={columnConf.reduce((prev, item)=>prev + item.size, 0)} container style={{borderRadius: 10, border: `1.5px solid ${theme.palette.divider}`, padding: 10, marginBottom: 10}} alignItems="center"> 
                        {
                            columnConf.map(item=>(
                                <Grid item xs={item.size} container justifyContent={item.align}>
                                    {dataItem[item.key]}
                                </Grid>
                            ))
                        }
                    </Grid>
                ))
            }
            </Grid>
        </>
    );
};
