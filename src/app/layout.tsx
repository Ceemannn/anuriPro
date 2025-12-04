import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import WineBubbles from '@/components/WineBubbles'
import ScrollWineGlass from '@/components/ScrollWineGlass'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Añuri | Where Art Meets Flavor in Every Pour',
  description: 'Añuri is a creative wine mixing company specializing in custom mocktails and cocktails for corporate and social events. Experience health-conscious enjoyment with expertly crafted wine blends.',
  keywords: 'wine mixing, mocktails, cocktails, events, catering, wine blending, Anuri',
  openGraph: {
    title: 'Añuri | Where Art Meets Flavor in Every Pour',
    description: 'Creative wine mixing for your special events',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <LoadingScreen />
        <CustomCursor />
        <WineBubbles />
        <ScrollWineGlass />
        <Header />
        <main className="relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
