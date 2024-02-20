'use client'

import GlobalLoader from '@/components/shared/GlobalLoader'
import BreadCrumbs from "@/components/shared/BreadCrumbs";
import Navbar from '@/components/shared/Navbar'
import { useRouter } from 'next/navigation'
import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddUserForm from "@/components/users/AddUserForm";

const UserAdd: FC = () => {
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

  return <>{loading ? (
    <GlobalLoader />
  ) : (
    <Navbar>
      <div className="flex flex-col">
        <BreadCrumbs
          parent="Users"
          child="Add Users"
          path="/users/user-add"
        />
        <h1 className="text-[#6453F7] text-[22px] font-semibold">
          Add User
        </h1>
        <AddUserForm/>
      </div>
    </Navbar>
  )}</>
}

export default UserAdd
