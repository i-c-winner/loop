"use client";

import { Card, Stack, Typography } from "@mui/material";
import { EmbeddedSuperset } from "@/widgets/superset/ui/EmbeddedSuperset";
import { useContext } from "react";
import { MyContext } from "@/shared/lib/context/app-context";

function Page() {
  const contentHeight = "calc(100dvh - 180px)";
  const { currentRole } = useContext(MyContext);
  const dashboardId = process.env.NEXT_PUBLIC_SUPERSET_DASHBOARD_ID;
  const supersetDomain =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_SUPERSET_URL_PROD
      : process.env.NEXT_PUBLIC_SUPERSET_URL_DEV;
  const canUseSuperset = currentRole === "admin" || currentRole === "chief" || currentRole === "pm";

  if (!canUseSuperset) {
    return (
      <Stack sx={{ p: 3 }}>
        <Typography color="error">Доступ к Superset разрешен только для ролей admin, chief и pm.</Typography>
      </Stack>
    );
  }

  if (!dashboardId || !supersetDomain) {
    return (
      <Stack sx={{ p: 3 }}>
        <Typography>
          Set NEXT_PUBLIC_SUPERSET_DASHBOARD_ID and NEXT_PUBLIC_SUPERSET_URL_DEV/NEXT_PUBLIC_SUPERSET_URL_PROD
          to render embedded dashboard.
        </Typography>
      </Stack>
    );
  }

  return (
    <Stack sx={{ width: "100%", height: contentHeight, minHeight: contentHeight }}>
      <Card sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", p: 2.5 }}>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          Superset Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Интерактивная BI-панель с данными по текущему проекту.
        </Typography>
        <Stack sx={{ flex: 1, minHeight: 0, height: "100%", borderRadius: 2, overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
          <EmbeddedSuperset dashboardId={dashboardId} supersetDomain={supersetDomain} />
        </Stack>
      </Card>
    </Stack>
  );
}

export default Page;
