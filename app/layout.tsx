import type { Metadata } from "next";
import { Roboto, Roboto_Mono, Lobster } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono-var",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const lobster = Lobster({
  variable: "--font-lobster",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "WEATHER.EXE — The Officially Unreliable Forecast",
  description:
    "Pick a U.S. place or ZIP code and get real conditions and an hourly forecast for a different nearby location.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${robotoMono.variable} ${lobster.variable} h-full antialiased`}
    >
      <body className="min-h-full font-roboto">{children}</body>
    </html>
  );
}