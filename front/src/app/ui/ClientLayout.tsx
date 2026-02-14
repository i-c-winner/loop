"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Header } from "@/widgets/header/ui/Header";
import { DialogWrapper } from "@/shared/ui/dialog/DialogWrapper";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box width="100%" minHeight="100vh">
      <Header />
      <DialogWrapper />
      <Container
        maxWidth={false}
        sx={{
          width: "100%",
          maxWidth: "1440px",
          paddingTop: { xs: "96px", md: "112px" },
          paddingBottom: "40px",
        }}
      >
        {children}
      </Container>
    </Box>
  );
}
