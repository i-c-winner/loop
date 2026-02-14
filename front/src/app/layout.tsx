import { ThemeRegistry } from "@/app/theme/ThemeRegistry";
import { MyContextProvider } from "@/shared/lib/context/app-context";
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

