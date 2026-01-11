import {ThemeRegistry} from "@/app/theme/ThemeRegistry";
import {Header} from "@/entities/header/ui/Header";
import {Footer} from "@/entities/footer/ui/footer";
import {ModalWrapper} from "@/shared/ui/modal/ModalWrapper";

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
      {children}
      <ModalWrapper/>
      <Footer/>
    </ThemeRegistry>
    </body>
    </html>
  );
}
