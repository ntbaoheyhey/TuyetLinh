import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Economics Blind Box Gift Website",
  description: "Balanced mode interactive gift flow with mini economics games",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
