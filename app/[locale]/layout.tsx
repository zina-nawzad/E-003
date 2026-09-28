import type { Metadata } from "next";
import { Aref_Ruqaa } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import MusicPlayer from "@/components/MusicPlayer";

const arefRuqaa = Aref_Ruqaa({
  variable: "--font-aref-ruqaa",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Wedding Invitation",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();

  const isRTL = locale === "ar" || locale === "ku";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${arefRuqaa.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background font-aref-ruqaa">
        <NextIntlClientProvider messages={messages}>
          {children}
          <MusicPlayer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
