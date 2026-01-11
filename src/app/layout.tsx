import {ThemeRegistry} from "@/app/theme/ThemeRegistry";
import {Header} from "@/entities/header/ui/Header";
import {Footer} from "@/entities/footer/ui/footer";

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
      <Footer/>
    </ThemeRegistry>
    </body>
    </html>
  );
}
