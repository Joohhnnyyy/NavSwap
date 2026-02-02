"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/sections/header";

export default function GlobalHeader() {
  const pathname = usePathname();

  // Hide header on admin pages, admin registration, and station registration
  // startsWith("/admin") covers both /admin (dashboard) and /admin-registration
  const isHidden = pathname.startsWith("/admin") || pathname.startsWith("/station-registration");

  if (isHidden) {
    return null;
  }

  return <Header />;
}
