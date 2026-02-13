"use client";

import { Card, Stack, Typography } from "@mui/material";
import { EmbeddedSuperset } from "@/widgets/superset/ui/EmbeddedSuperset";
import { useContext } from "react";
import { MyContext } from "@/app/providers/MyContext";

function Page() {
  const contentHeight = "calc(100dvh - 120px)";
  const { currentRole } = useContext(MyContext);
  const dashboardId = process.env.NEXT_PUBLIC_SUPERSET_DASHBOARD_ID;
  const supersetDomain =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SUPERSET_URL_PROD
      : process.env.NEXT_PUBLIC_SUPERSET_URL_DEV;
  const canUseSuperset = currentRole === "admin" || currentRole === "chief";

  if (!canUseSuperset) {
    return (
      <Stack sx={{ padding: "32px" }}>
        <Typography color="error">Доступ к Superset разрешен только для ролей admin и chief.</Typography>
      </Stack>
    );
  }

  if (!dashboardId || !supersetDomain) {
    return (
      <Stack sx={{ padding: "32px" }}>
        <Typography>
          Set NEXT_PUBLIC_SUPERSET_DASHBOARD_ID and NEXT_PUBLIC_SUPERSET_URL_DEV/NEXT_PUBLIC_SUPERSET_URL_PROD
          to render embedded dashboard.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack sx={{ width: "100%", height: contentHeight, minHeight: contentHeight, padding: "16px" }}>
      <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", padding: "16px" }}>
        <Typography variant="h5" sx={{ marginBottom: "12px" }}>
          Superset Dashboard
        </Typography>
        <Stack sx={{ flex: 1, minHeight: 0, height: "100%" }}>
          <EmbeddedSuperset dashboardId={dashboardId} supersetDomain={supersetDomain} />
        </Stack>
      </Card>
    </Stack>
  );
}

export default Page;
