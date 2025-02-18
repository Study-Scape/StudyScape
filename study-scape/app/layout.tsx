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
    <html lang="en">
      <body>
      <nav className="w-full flex justify-between items-center px-6 border-b border-b-foreground/10 h-16 bg-black text-white">
            {/* Logo */}
            <div className="text-lg font-bold text-purple">
              <Link href="/">StudyScape</Link>
            </div>
            {/* Navigation Links */}
            <div className="flex gap-10">
              <Link href="/" className="hover:text-purple-500">
                Home
              </Link>
              <Link href="/About" className="hover:text-purple-500">
                About
              </Link>
              <Link href="/Bookmarks" className="hover:text-purple-500">
                Bookmarks
              </Link>
              <Link href="/Profile" className="hover:text-purple-500">
                Profile
              </Link>
            </div>

          </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
