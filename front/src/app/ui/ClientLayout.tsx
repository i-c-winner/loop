"use client";

import Box from "@mui/material/Box";
import { Header } from "@/entities/header/ui/Header";
import { DialogWrapper } from "@/shared/ui/dialog/DialogWrapper";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box width="100%" minHeight="100vh">
      <Header />
      <DialogWrapper />
      {children}
    </Box>
  );
}

