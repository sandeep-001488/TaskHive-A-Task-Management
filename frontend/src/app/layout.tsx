import "./globals.css";
import TodoNavbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Task Reminder",
  description: "A Todo web",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen">
        <TodoNavbar />
        <main className="flex-grow">
          {children}
          <Toaster />
        </main>
        <Footer />
      </body>
    </html>
  );
}
