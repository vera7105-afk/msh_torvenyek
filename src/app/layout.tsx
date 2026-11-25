import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mássalhangzótörvények gyakorló — 5. osztály",
  description: "Interaktív, lépcsőzetesen felépített játékos gyakorlóalkalmazás 5. osztályos tanulóknak a magyar mássalhangzótörvények elsajátításához.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="antialiased min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
