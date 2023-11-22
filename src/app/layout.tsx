'use client'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import ReduxProvider from '@/redux/Provider'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import { hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const check = hasCookie('token')
  const router = useRouter()

  useEffect(() => {
    if (check) {
      router.replace('/dashboard')
    } else {
      router.replace('/')
    }
  }, [])

  return (
    <html lang='en'>
      <head>
        <title>Admin Panel - Phone BH Fix</title>
      </head>
      <body className={inter.className}>
        <ToastContainer />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
