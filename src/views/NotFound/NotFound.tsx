import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: 4
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="h1" fontWeight="bold" color="error" sx={{ mt: 2 }}>
                    404
                </Typography>
                <Typography variant="h4" color="textPrimary" sx={{ mt: 2 }}>
                    Page not found
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph sx={{ mt: 2 }}>
                    The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/")}
                    sx={{ mt: 3 }}
                >
                    Go to Home
                </Button>
            </Container>
        </Box>
    );
};

export default NotFound;
