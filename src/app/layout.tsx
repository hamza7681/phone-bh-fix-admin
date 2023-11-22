import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard - Phone BH Fix',
  description:
    'Phone BH Fix is your one-stop shop for the best mobile accessories. We have a wide selection of cases, chargers, cables, and more to choose from, all at competitive prices. Our products are backed by a satisfaction guarantee, so you can shop with confidence',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
