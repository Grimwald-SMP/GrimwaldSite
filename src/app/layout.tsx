import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";
import FABSpeedDial from "@/app/ui/FABSpeedDial";
import EmbersBackground from "@/app/ui/EmbersBackground";
import {BackgroundProvider} from "@/app/lib/backgroundContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Grimwald SMP",
    description: "The official website of the Grimwald SMP",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        >
        <EmbersBackground/>
        <BackgroundProvider>
            <Navbar/>
            {children}
            <FABSpeedDial/>
        </BackgroundProvider>
        <Footer/>
        </body>
        </html>
    );
}
