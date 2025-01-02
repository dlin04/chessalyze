import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Session } from "next-auth";
import { Navbar } from "@/components/Navbar";
import { Provider } from "@/components/Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

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
  session,
}: Readonly<{
  children: React.ReactNode;
  session: Session | null;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider session={session}>
          <Navbar />
          {children}
        </Provider>
      </body>
    </html>
  );
}
