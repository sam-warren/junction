// src/components/layout/Layout.tsx
import { type ReactNode } from "react";
import { Toaster } from "sonner";
import Header from "./Header";
import Footer from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="pt-16 lg:pt-20">{children}</main>
      <Footer />
      <Toaster position="bottom-right" richColors={false} theme="dark" />
    </>
  );
}
