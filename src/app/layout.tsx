import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const customFont = localFont({
  src: "./fonts/Regular.woff2",
  variable: "--font-custom",
  display: "swap",
});

const secondaryFont = localFont({
  src: "./fonts/Secondary.woff2",
  variable: "--font-secondary",
  display: "swap",
});

const lightFont = localFont({
  src: "./fonts/Light.woff2",
  variable: "--font-light",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NavSwap",
  description: "The Operating System for Battery Swapping",
  icons: {
    icon: [
      { url: "/black_logo.png", media: "(prefers-color-scheme: light)" },
      { url: "/white_logo.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import StairsPreloader from "@/components/preloader/stairs-preloader";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased ${customFont.variable} ${secondaryFont.variable} ${lightFont.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <StairsPreloader />
          <Toaster position="bottom-right" theme="dark" />
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="6bc7a0c9-6ab9-43bc-bc40-41f533897bdc"
        />
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
          {children}
          <VisualEditsMessenger />
        </ThemeProvider>
      </body>
    </html>
  );
}
