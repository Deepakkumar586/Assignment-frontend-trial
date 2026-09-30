import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cardamom House — Slow brunch in Lisbon",
  description: "The all-day brunch menu for Cardamom House, Lisbon."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
