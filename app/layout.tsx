import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axiant Consulting",
  description:
    "Managed IT, cybersecurity, cloud, and business technology consulting for growing businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
