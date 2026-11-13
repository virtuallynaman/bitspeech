import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "BitSpeech – Practice interviews with AI",
  description:
    "Talk to an AI interviewer, get feedback on every answer, and track your progress over time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${plusJakarta.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}