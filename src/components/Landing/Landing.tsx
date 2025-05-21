import { Box, Button, Paper } from "@mui/material";
import React from "react";
import lamassuBackground from "assets/lamassu/lamassu-background.png";
import titleImg from "assets/lamassu/title.png";
import { useAuth } from "auths/AuthProvider";

export const Landing = React.memo(() => {
    const auth = useAuth();

    const handleClick = () => {
        auth.signinRedirect();
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "100%",
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundImage: `url("${lamassuBackground}")`
            }}
        >
            <Box
                sx={{
                    marginBottom: "5%",
                    display: "flex",
                    justifyContent: "center"
                }
                }>
                <img src={titleImg} style={{ margin: "0px auto" }} />
            </Box>
            <Box display="flex" justifyContent="center">
                <Box component={Paper} sx={{ padding: "20px 30px 20px 30px", maxWidth: "500px" }} >
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Button fullWidth variant="contained" onClick={handleClick}>
                            Authenticate
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
});

Landing.displayName = "Landing";
