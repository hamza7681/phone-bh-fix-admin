'use client'

import GlobalLoader from '@/components/shared/GlobalLoader'
import Navbar from '@/components/shared/Navbar'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const CategoryAdd: FC = () => {
  const { token } = useSelector((s: any) => s.auth)
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      router.push('/')
    } else {
      setLoading(false)
    }
  }, [])

  return <>{loading ? <GlobalLoader /> : <Navbar />}</>
}

export default CategoryAdd
