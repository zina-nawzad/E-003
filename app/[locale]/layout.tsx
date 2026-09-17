import type { Metadata } from "next";
import { Aref_Ruqaa } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const arefRuqaa = Aref_Ruqaa({
  variable: "--font-aref-ruqaa",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Wedding-Invitation",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html
      lang="ku"
      suppressHydrationWarning
      suppressContentEditableWarning
      className={`${arefRuqaa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-aref-ruqaa">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
