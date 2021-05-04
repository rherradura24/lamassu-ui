import { Box, Paper, Typography } from "@material-ui/core";

const Home = () =>{
    return (
        <Box style={{padding: 20}}>
            <Paper style={{padding: 20, width: 350, height:125, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Typography variant="h6" style={{textAlign: "center"}}>Device Manufacturing Systems requests</Typography>
                <Typography variant="h3" color="primary">32</Typography>
            </Paper>
        </Box>
    )
}

export default Home 