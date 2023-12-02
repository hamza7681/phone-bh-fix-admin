'use client'

import AddCategoryForm from '@/components/categories/AddCategoryForm'
import BreadCrumbs from '@/components/shared/BreadCrumbs'
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

  return (
    <>
      {loading ? (
        <GlobalLoader />
      ) : (
        <Navbar>
          <div className='flex flex-col'>
            <BreadCrumbs parent='categories' child='Edit Categories' path='/categories/category-list' />
            <h1 className='text-[#F0841E] text-[22px] font-semibold'>Edit Category</h1>
            <AddCategoryForm />
          </div>
        </Navbar>
      )}
    </>
  )
}

export default CategoryAdd
