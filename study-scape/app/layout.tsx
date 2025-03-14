import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "StudyScape",
  description: "Empower University of Washington students to make informed decisions about where to study based on their preferences and needs",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className="h-screen overflow-hidden">
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-10 h-16 bg-indigo-500 text-slate-200 z-50 shadow-xl">
            {/* Logo */}
            <div className="text-lg font-bold text-purple hover:text-indigo-600 duration-300">
              <Link href="/">StudyScape</Link>
            </div>
            {/* Navigation Links */}
            <div className="flex gap-3">
              <Link href="/" className="bg-slate-200 text-indigo-800 px-4 py-1 rounded-full font-medium shadow-sm hover:text-purple-500 hover:bg-indigo-200 duration-500">
                Home
              </Link>
              <Link href="/About" className="bg-slate-200 text-indigo-800 px-4 py-1 rounded-full font-medium shadow-sm hover:text-purple-500 hover:bg-indigo-200 duration-500">
                About
              </Link>
              <Link href="/Bookmarks" className="bg-slate-200 text-indigo-800 px-4 py-1 rounded-full font-medium shadow-sm hover:text-purple-500 hover:bg-indigo-200 duration-500">
                Bookmarks
              </Link>
              <Link href="/Profile" className="bg-slate-200 text-indigo-800 px-4 py-1 rounded-full font-medium shadow-sm hover:text-purple-500 hover:bg-indigo-200 duration-500">
                Profile
              </Link>
            </div>
          </nav>
        <main className="absolute top-16 left-0 w-full bottom-0 overflow-y-auto no-scrollbar">{children} </main>
      </body>
    </html>
  );
}