import './globals.css';
import { ReactNode } from 'react';
import Script from 'next/script';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bimm Market - Top Up Robux & Gamepass',
  description: 'BIMM Market - Top Up Robux & Gamepass Roblox TERMURAH! Proses 5-30 menit, Pembayaran QRIS, Dana, Transfer Bank. 1000+ transaksi sukses. Terpercaya & Aman 100%. Melayani Indonesia & Internasional.',
  keywords: 'bimm market, top up robux, top up roblox, beli robux, robux murah, robux qris, top up robux indonesia, gamepass roblox, robux dana, robux gopay, top up roblox termurah',
  authors: [{ name: 'Bimm Market' }],
  robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
  verification: {
    google: '-TQiultcDrQYvRTpYvlxVXIHXd4Eeq6GWQjIsj7Ddz0',
  },
  openGraph: {
    siteName: 'BIMM Market',
    title: 'BIMM Market - Top Up Robux & Gamepass Roblox TERMURAH',
    description: 'Top Up Robux & Gamepass Roblox TERMURAH! Proses 5-30 menit, QRIS, Dana, Transfer Bank. 1000+ transaksi sukses. Terpercaya & Aman 100%',
    url: 'https://bimm-market.vercel.app',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIMM Market - Top Up Robux & Gamepass Roblox TERMURAH',
    description: 'Top Up Robux & Gamepass Roblox TERMURAH! Proses 5-30 menit, QRIS, Dana, Transfer Bank. 1000+ transaksi sukses. Terpercaya & Aman 100%',
    images: ['https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg'],
  },
  icons: {
    icon: 'https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg',
    apple: 'https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg',
  },
  other: {
    'theme-color': '#050816',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "BIMM Market",
      "url": "https://bimm-market.vercel.app",
      "logo": "https://res.cloudinary.com/dovx3ruli/image/upload/v1766445494/saabh3emgk1nfdlfqjom.jpg",
      "description": "BIMM Market adalah website top up Robux dan Gamepass Roblox terpercaya untuk Indonesia dan internasional.",
      "sameAs": ["https://www.instagram.com/bimmmarket", "https://www.tiktok.com/@bimmmarket"],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+62-895-4022-89397",
        "contactType": "Customer Service",
        "availableLanguage": ["Indonesian", "English"]
      }
    },
    {
      "@type": "WebSite",
      "name": "BIMM Market",
      "url": "https://bimm-market.vercel.app"
    },
    {
      "@type": "Store",
      "name": "BIMM Market",
      "url": "https://bimm-market.vercel.app",
      "description": "Top up Robux dan Gamepass Roblox TERMURAH dengan pembayaran QRIS, Dana, Transfer Bank.",
      "paymentAccepted": "QRIS, Dana, GoPay, Transfer Bank",
      "priceRange": "Rp 5.000 - Rp 5.000.000",
      "openingHours": "Mo-Fr 08:00-22:00, Sa-Su 09:00-21:00"
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Apakah BIMM Market aman dan terpercaya?",
          "acceptedAnswer": { "@type": "Answer", "text": "Ya, BIMM Market adalah platform top up Robux terpercaya dengan 1000+ transaksi sukses." }
        },
        {
          "@type": "Question",
          "name": "Berapa lama proses top up Robux di BIMM Market?",
          "acceptedAnswer": { "@type": "Answer", "text": "Proses top up Robux biasanya 5-30 menit setelah pembayaran dikonfirmasi." }
        },
        {
          "@type": "Question",
          "name": "Metode pembayaran apa saja yang diterima?",
          "acceptedAnswer": { "@type": "Answer", "text": "QRIS, Dana, GoPay, Transfer Bank (BCA, Mandiri, BRI, BNI), dan E-Wallet lainnya." }
        }
      ]
    },
    {
      "@type": "Product",
      "name": "Top Up Robux Roblox",
      "brand": { "@type": "Brand", "name": "BIMM Market" },
      "offers": { "@type": "AggregateOffer", "priceCurrency": "IDR", "lowPrice": "5000", "highPrice": "5000000", "availability": "https://schema.org/InStock" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1000" }
    }
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://img1.pixhost.to" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Script
          id="orchids-browser-logs"
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts/orchids-browser-logs.js"
          strategy="afterInteractive"
          data-orchids-project-id="c0996a7f-cdd5-4822-93f3-8111f826785c"
        />
        {children}
      </body>
    </html>
  );
}
