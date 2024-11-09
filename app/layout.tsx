import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { geistMono, geistSans, spaceGrotesk } from "@/app/fonts";
import Header from "@/components/header/Header";
import LeftSidebar from "@/components/sidebars/LeftSidebar";
import RightSidebar from "@/components/sidebars/RightSidebar";
import { Toaster } from "@/components/ui";

export const metadata: Metadata = {
  title: "Ask Ham Flow",
  description: "Where amateur radio operators (also known as radio amateurs or hams) share their knowledge.",
  icons: {
    icon: "/assets/images/favicon.svg"
  },
  creator: "PY1II, Douglas",
  publisher: "@bahiensed"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <Header />

        <div className="flex flex-row w-full">
          <nav aria-label="Primary Navigation" className="w-1/6">
            <LeftSidebar />
          </nav>

          <main className="w-2/3" role="main">
            {children}
            <Toaster />
          </main>

          <aside aria-labelledby="right-sidebar-title" className="w-1/6">
            <h2 id="right-sidebar-title" className="sr-only">Related Information</h2>
            <RightSidebar />
          </aside>
        </div>

        <footer role="contentinfo">
          {/* Você pode adicionar links de navegação do rodapé aqui, como contato, termos, etc. */}
        </footer>
      </body>
    </html>
  );
}
