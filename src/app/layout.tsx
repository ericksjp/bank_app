import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

export const metadata: Metadata = {
  title: "It's All Good Man Bank",
  description:
    "It's All Good Man! We are here to offer you a modern and secure banking platform.",
  icons: { icon: "/icons/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>
        <div className="flez size-full flex-col">
          <div className="root-layout">
            <Image
              src="/icons/logo.svg"
              width={30}
              height={30}
              alt="menu icon"
            />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
