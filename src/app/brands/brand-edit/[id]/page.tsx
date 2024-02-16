'use client'

import AddBrandForm from '@/components/brands/AddBrandForm'
import EditBrandForm from '@/components/brands/EditBrandForm'
import BreadCrumbs from '@/components/shared/BreadCrumbs'
import GlobalLoader from '@/components/shared/GlobalLoader'
import Navbar from '@/components/shared/Navbar'
import { useParams, useRouter } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const BrandEdit: FC = () => {
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

  return (
    <>
      {loading ? (
        <GlobalLoader />
      ) : (
        <Navbar>
          <div className='flex flex-col'>
            <BreadCrumbs parent='Brands' child='Edit Brand' path='/brands/brand-list' />
            <h1 className='text-[#F0841E] text-[22px] font-semibold'>Edit Brand</h1>
            <EditBrandForm />
          </div>
        </Navbar>
      )}
    </>
  )
}

export default BrandEdit
