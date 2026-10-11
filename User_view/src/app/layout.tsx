import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileNav } from "@/components/layout/MobileNav";
import { WhatsAppSpecialist } from "@/components/common/WhatsAppSpecialist";
import { AuthProvider } from "@/context/AuthContext";
import { CarProvider } from "@/context/CarContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  
  title: "CHAWDA CAR DECOR",
  description: "Find and buy genuine OEM and aftermarket car accessories and spare parts tailored to your specific vehicle model.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#07080B] text-white selection:bg-red-600 selection:text-white`}>
        <AuthProvider>
          <CarProvider>
            <WishlistProvider>
              <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileNav />
              <WhatsAppSpecialist />
            </CartProvider>
            </WishlistProvider>
          </CarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}