import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Provider } from "@/components/Provider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Chessalyze",
  description:
    "An application that allows users to analyze and store their Chess.com games for free!",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Titillium Web', sans-serif" }}>
        <Provider>
          <Navbar />
          {children}
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
