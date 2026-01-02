import {MyThemeProvider} from "@/app/providers/MyThemeProvider";

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body >
    <MyThemeProvider>
      {children}
    </MyThemeProvider>
    </body>
    </html>
  );
}
