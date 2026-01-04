import "../../shared/styles/globals.css";
import Box from "@mui/material/Box";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box
      className="wrapper"
    >
        {children}
    </Box>
  );
}
