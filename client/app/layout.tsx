import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codex - Innovative Software Solutions",
  description:
    "Professional software development services including mobile apps, web apps, graphic design, and digital marketing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Client wrapper هنا */}
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
