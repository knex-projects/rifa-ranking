import type { Metadata } from "next";
import { Montserrat, Quantico } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// Quantico is not a variable font; the design only uses its Bold weight.
const quantico = Quantico({
  variable: "--font-quantico",
  subsets: ["latin"],
  weight: "700",
});

export const metadata: Metadata = {
  title: "Ranking da Rifa",
  description: "Ranking de vendas de bilhetes da rifa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${quantico.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
