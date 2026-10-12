import type { Metadata } from "next";
import "./globals.css";
import "./mobile-nav.css";
import "./coaching-options.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://studywithmadison.com"),
  title: "Study With Madison | Personalized Nursing Tutoring",
  description: "Personalized online nursing tutoring for exam preparation, HESI/TEAS, and NCLEX strategy.",
  keywords: ["NCLEX tutoring", "nursing tutoring", "HESI prep", "TEAS prep", "online nursing tutor"],
  authors: [{ name: "Madison Vahle" }],
  creator: "Study With Madison",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Study With Madison | Personalized Nursing Tutoring",
    description: "Nursing tutoring that builds real confidence.",
    url: "https://studywithmadison.com/",
    siteName: "Study With Madison",
    type: "website",
    images: [{ url: "/og.png", width: 1800, height: 945, alt: "Nursing tutoring that builds real confidence" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Study With Madison",
    description: "Nursing tutoring that builds real confidence.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
