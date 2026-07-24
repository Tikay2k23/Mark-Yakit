import type { Metadata } from "next";
import type { ReactNode } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import "lenis/dist/lenis.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mark Yakit | CRM, Automation & Full-Stack Development",
  description:
    "Portfolio of Mark Yakit, a GoHighLevel systems builder, CRM automation specialist, API integrator, and full-stack web developer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
