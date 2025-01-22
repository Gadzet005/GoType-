import { Box, Typography } from "@mui/material";
import React from "react";

interface StatRowProps {
  label: string;
  value: string;
}

export const StatRow: React.FC<StatRowProps> = ({ label, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography sx={{ width: "100%" }} variant="h5">
        {label}
      </Typography>
      <Typography sx={{ textAlign: "center", width: "100%" }} variant="h6">
        {value}
      </Typography>
    </Box>
  );
};
