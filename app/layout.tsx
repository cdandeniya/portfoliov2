import type { Metadata } from 'next'
import { Syne, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Chanul Dandeniya',
  description: 'Backend software engineer. Builder. Stony Brook CS \'27.',
  openGraph: {
    title: 'Chanul Dandeniya',
    description: 'Backend engineer building distributed systems. Stony Brook CS & Applied Math, Class of 2027.',
    url: 'https://cdandeniya.vercel.app',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  )
}
