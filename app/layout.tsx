import "./globals.css";

import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { SocketProvider } from "@/components/providers/socket-provider";
import { ApiProvider } from "./components/providers/api-provider";
import { AppRouterCacheProvider }
from "@mui/material-nextjs/v16-appRouter";
export const metadata = {
  title: "PineUp",
  desciption: "",
  icons: {
    icon: "/app/assets/favicon.png"
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <QueryProvider>
            <ThemeProvider>
              <ToastProvider />
                <SocketProvider>
                  <ApiProvider>
                    {children}
                  </ApiProvider>
                </SocketProvider>
            </ThemeProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}