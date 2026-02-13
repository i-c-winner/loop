import { ThemeRegistry } from "@/app/theme/ThemeRegistry";
import { MyContextProvider } from "@/app/providers/MyContext";
import { ClientLayout } from "@/app/ui/ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <MyContextProvider>
            <ClientLayout>{children}</ClientLayout>
          </MyContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

