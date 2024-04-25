"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/lib/redux/rootReducer";
import { Web3Modal } from "@/lib/context/web3Modal";

const inter = Inter({ subsets: ["latin"] });

const store = configureStore({
  reducer: rootReducer,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          <Web3Modal>{children}</Web3Modal>
        </body>
      </html>
    </Provider>
  );
}
