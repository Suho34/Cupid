import type { Metadata } from "next";
import { Outfit, Calistoga } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

const calistoga = Calistoga({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Cupid - AI Date Planner",
  description: "Stop arguing. Start dating. Let AI plan your perfect date.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${calistoga.variable} antialiased font-sans cupid-gradient min-h-screen text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
