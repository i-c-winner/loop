import {ThemeRegistry} from "@/app/theme/ThemeRegistry";
import {Header} from "@/entities/header/ui/Header";
import {ModalWrapper} from "@/shared/ui/modal/ModalWrapper";
import {MyContextProvider} from "@/app/providers/MyContext";
import Box from "@mui/material/Box";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body >
    <ThemeRegistry>
        <Header />
        <MyContextProvider>
          <Box width={'100%'} height={'100vh'}>
            <ModalWrapper />
            {children}
          </Box>
        </MyContextProvider>
    </ThemeRegistry>
    </body>
    </html>
  );
}
