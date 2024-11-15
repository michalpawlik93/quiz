import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Quiz App",
  description: "Quiz app with next js",
};
//Link gives prefetching , its better than useRouter
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="bg-blue-600 text-white py-4 px-8 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              <Link href="/">Home</Link>
            </h1>
            <ul className="flex space-x-4">
              <li>
                <Link href="/quizzes" className="hover:text-blue-300">
                  Quizzes
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="p-8">{children}</main>
        <ToastContainer position="top-right" />
      </body>
    </html>
  );
}
