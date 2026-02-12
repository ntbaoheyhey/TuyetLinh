import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Economics Blind Box Demo",
  description: "Khung sườn website blind box theo spec pink pastel + lily"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
