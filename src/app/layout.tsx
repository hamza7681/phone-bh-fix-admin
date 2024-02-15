import { Inter } from 'next/font/google'
import './globals.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/themes/lara-light-blue/theme.css'
import ReduxProvider from '@/redux/Provider'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
