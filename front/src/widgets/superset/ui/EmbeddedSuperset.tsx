"use client";

import { Box, Typography } from "@mui/material";

type EmbeddedSupersetProps = {
  dashboardId: string;
  supersetDomain: string;
};

export function EmbeddedSuperset({ dashboardId, supersetDomain }: EmbeddedSupersetProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "calc(100dvh - 200px)",
        border: "1px dashed",
        borderColor: "divider",
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: 720 }}>
        <Typography variant="h6" gutterBottom>
          Superset отключен (статический режим)
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Параметры: dashboardId={dashboardId}, domain={supersetDomain}.
        </Typography>
      </Box>
    </Box>
  );
}
