import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProjectFlow - Project Management & Tracking",
  description:
    "A modern project management and tracking application for teams. Organize tasks, track progress, and collaborate effectively.",
};

export const viewport = {
  themeColor: "#1a1d27",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
