import { usePathname } from 'next/navigation'
import React, { FC } from 'react'

const AppBarContent: FC = () => {
  const pathname = usePathname()
  if (pathname.includes('brands')) {
    return 'Brands'
  } else if (pathname.includes('categories')) {
    return 'Categories'
  } else if (pathname.includes('dashboard')) {
    return 'Dashboard'
  } else if (pathname.includes('contact-support')) {
    return 'Contact Support'
  } else if(pathname.includes('products')){
    return "Products"
  } else if(pathname.includes('users')){
    return "User Management"
  }
}

export default AppBarContent
