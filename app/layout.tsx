import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer"; // Import Footer
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
    <html lang="en" className="h-full bg-stone-300">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="h-full flex flex-col"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <Provider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Analytics />
        </Provider>
      </body>
    </html>
  );
}
