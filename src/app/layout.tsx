import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutiAssist AI — Intelligent Autism Support Platform",
  description:
    "AI-powered adaptive autism support platform for communication assistance, emotion recognition, personalized learning, and parent guidance.",
  keywords: [
    "autism",
    "ASD",
    "speech therapy",
    "AAC",
    "communication",
    "emotion detection",
    "special needs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable}`} style={{ fontFamily: "var(--font-nunito), var(--font-family)" }}>
        {children}
      </body>
    </html>
  );
}
