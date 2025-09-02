"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboard && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isDashboard && <Footer />}
    </div>
  );
}
