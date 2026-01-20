import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compressnfly - Free Online File Compression Tool",
  description:
    "Compress documents, images, and archives online for free. Fast, secure, and privacy-safe file compression with multiple format support.",
  keywords:
    "file compression, image compression, PDF compression, online compression tool, free compression",
  authors: [{ name: "Compressnfly" }],
  openGraph: {
    title: "Compressnfly - Free Online File Compression Tool",
    description:
      "Compress documents, images, and archives online for free. Fast, secure, and privacy-safe file compression.",
    type: "website",
    url: "https://compressnfly.com/",
  },
  icons: {
    icon: "/my-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-G2T4NXSMHL"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G2T4NXSMHL');
            `,
          }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
