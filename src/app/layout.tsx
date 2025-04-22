import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ReactQueryProvider from "@/utils/Providers";
import Helper from "@/components/layouts/Helper";
import { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Druggedfoxd",
    description: "Organized Melee lessons",
};

export const viewport: Viewport = {
    width: "device-width",
    height: "device-height",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                suppressHydrationWarning={true}
                className={`${inter.className} flex h-screen flex-col overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-slate-900 dark:text-zinc-100`}
            >
                <ReactQueryProvider>
                    <ThemeProvider
                        attribute='class'
                        defaultTheme='system'
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header />
                        {children}
                        <Footer />
                        <Helper />
                        <Toaster />
                        <Analytics />
                        <SpeedInsights />
                    </ThemeProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
