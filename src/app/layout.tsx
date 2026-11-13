import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Syne } from "next/font/google";
import "./globals.css";
import { ArchiveProvider } from "@/components/context/ArchiveProvider";
import { Navigation } from "@/components/layout/Navigation";
import { ArchiveIndex } from "@/components/layout/ArchiveIndex";
import { Footer } from "@/components/layout/Footer";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { ProjectStoryModal } from "@/components/ui/ProjectStoryModal";
import { CustomCursor } from "@/components/ui/CustomCursor";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Yash Srivastava — Developer / Creator / Thinker",
  description:
    "Personal creative portfolio of Yash Srivastava. Developer exploring AI, open source, and the space between code and creativity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <ArchiveProvider>
          <a
            href="#main-content"
            className="visually-hidden fixed top-4 left-4 z-50 border border-ink bg-paper px-4 py-2 font-mono text-xs tracking-[0.12em] text-ink uppercase"
          >
            Skip to content
          </a>
          <CustomCursor />
          <Navigation />
          <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
          <ArchiveIndex />
          <CommandPalette />
          <ProjectStoryModal />
        </ArchiveProvider>
      </body>
    </html>
  );
}
