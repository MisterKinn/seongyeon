import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import SmoothScroll from "@/components/home/SmoothScrolling";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Kinn's Lounge",
    description: "A personal Web Page by Kinn",
    icons: {
        icon: "img/kinn.png",
    },
    other: {
        url: "img/black-banner.png",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SmoothScroll>
                    <main>{children}</main>
                </SmoothScroll>
                <Analytics />
            </body>
        </html>
    );
}
