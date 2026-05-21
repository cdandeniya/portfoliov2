import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '700', '900'],
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  )
}
