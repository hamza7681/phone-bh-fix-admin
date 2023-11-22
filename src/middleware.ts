import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // const cookies = req.cookies.get('token')
  // let value = null
  // if (cookies) {
  //   value = cookies.value
  // }
  // let url = req.url
  // if (value === null && (url.includes('/cart') || url.includes('/account'))) {
  //   return NextResponse.redirect('https://phone-bh-fix-dev.vercel.app/auth/login')
  //   // return NextResponse.redirect('http://localhost:3001/auth/login')
  // }
  // if (value && url.includes('/auth')) {
  //   return NextResponse.redirect('https://phone-bh-fix-dev.vercel.app/')
  //   // return NextResponse.redirect('http://localhost:3001/')
  // }
}
