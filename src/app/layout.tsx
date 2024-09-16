"use client";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "@/lib/redux/rootReducer";
import "@rainbow-me/rainbowkit/styles.css";
import {Providers} from "./providers";
import {Toaster} from "sonner";

const inter = Inter({subsets: ["latin"]});

const store = configureStore({
    reducer: rootReducer,
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <Provider store={store}>
            <html lang="en">
            <body className={inter.className}>
            <Providers>{children}</Providers>
            </body>
            </html>
        </Provider>
    );
}