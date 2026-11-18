import type { Metadata } from "next";
import { Noto_Sans_Georgian, Noto_Serif_Georgian } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_Georgian({
  variable: "--font-sans",
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Noto_Serif_Georgian({
  variable: "--font-display",
  subsets: ["georgian", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VIBEART — Register and take a front-row seat",
  description:
    "Early access waitlist for VIBEART — a live platform built only for artists.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ka"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#0c0f0e] text-[#e8eee9]">{children}</body>
    </html>
  );
}
