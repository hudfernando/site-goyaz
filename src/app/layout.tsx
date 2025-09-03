import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Goyaz Service",
  description: "Distribuidora de medicamentos e produtos hospitalares.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={cn(
          "font-lato antialiased mx-auto p-8 max-w-5xl rounded-lg shadow-md mt-12 mb-8",
          lato.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}