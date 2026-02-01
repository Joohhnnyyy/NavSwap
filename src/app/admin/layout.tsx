"use client";

import { DashboardLayout } from "@/components/DashboardLayout";
import { ColorThemeProvider } from "@/components/color-theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ColorThemeProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </ColorThemeProvider>
  );
}
