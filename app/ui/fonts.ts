import { Geist, Geist_Mono, Sigmar, Lilita_One } from "next/font/google";

export const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const sigmarFont = Sigmar({
    weight: ["400"],
    subsets: ["latin"],
});

export const lilita = Lilita_One({
    weight: ["400"],
    subsets: ["latin"],
})
