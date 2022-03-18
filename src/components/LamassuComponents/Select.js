import React from "react"
import { InputBase, Typography, Box, MenuItem, FormControl, InputLabel } from "@mui/material"
import Select from "@mui/material/Select"

export const LamassuSelect = ({ label = "", children = {} }) => {
  return (
        <Box>
            <Typography sx={{
              marginLeft: 1,
              fontWeight: 500,
              color: "#333",
              fontSize: 13
            }}>
                {label}
            </Typography>
            <Select
                input={<InputBase sx={{
                  borderRadius: 1,
                  border: "1px solid #EAEAEB",
                  backgroundColor: "#F1F3F4",
                  fontSize: 14,
                  padding: "5px 12px",
                  width: "100%"
                }}/>}
            >
                {children}
            </Select>
        </Box>
  )
}
