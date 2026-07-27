import "./globals.css";
import { QueryProvider } from "src/components/providers/query-provider";
import { ThemeProvider } from "src/components/providers/theme-provider";
import { ToastProvider } from "src/components/providers/toast-provider";
import { SocketProvider } from "src/components/providers/socket-provider";
import { ApiProvider } from "src/components/providers/api-provider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { AuthPromptProvider } from "src/features/auth/hooks/use-auth-prompt";
import { AppShell } from "../src/components/layout/app-shell";
import type { Metadata } from "next";
import { englishFont, arabicFont } from "./fonts";
export const metadata: Metadata = {
  metadataBase: new URL("https://pineup.app"), // if real-domain
  title: {
    default: "PineUp",
    template: "%s • PineUp",
  },
  description:
    "Connect with people, share your moments, discover inspiring communities, and grow together on PineUp — the modern social networking platform.",
  applicationName: "PineUp",
  keywords: [
    "PineUp",
    "Social Network",
    "Social Media",
    "Community",
    "Networking",
    "Posts",
    "Friends",
    "Share",
    "Connect",
  ],
  authors: [
    {
      name: "CHEF-BELLY",
    },
  ],
  creator: "CHEF-BELLY",
  publisher: "CHEF-BELLY",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pineup.app", // if real-domain
    siteName: "PineUp",
    title: "PineUp",
    description:
      "Connect. Share. Grow. A modern social networking platform built for meaningful connections.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PineUp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PineUp",
    description: "Connect. Share. Grow. A modern social networking platform.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${englishFont.variable} ${arabicFont.variable}`}>
        <AppRouterCacheProvider>
          <QueryProvider>
            <ThemeProvider>
              <ToastProvider />
              <SocketProvider>
                <ApiProvider>
                  <AuthPromptProvider>
                    <AppShell>{children}</AppShell>
                  </AuthPromptProvider>
                </ApiProvider>
              </SocketProvider>
            </ThemeProvider>
          </QueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
