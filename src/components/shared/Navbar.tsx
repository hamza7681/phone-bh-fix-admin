'use client'

import React, { FC, MouseEvent, ReactNode, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FaBars, FaRegUser } from 'react-icons/fa'
import SideBarContent from './SideBarContent'
import { useDispatch, useSelector } from 'react-redux'
import { MdLogout } from 'react-icons/md'
import { logout } from '@/redux/reducers/authslice'
import { deleteCookie } from 'cookies-next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import AppBarContent from './AppBarContent'

const ImageNoSSR = dynamic(() => import('@/components/shared/ImageRender'), { ssr: false })

const Navbar = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [collapsed1, setCollapsed1] = useState(false)
  const { user } = useSelector((s: any) => s.auth)
  const [profileDrop, setProfileDrop] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(logout())
    deleteCookie('token')
    router.replace('/')
  }

  const toggleBar = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCollapsed1(true)
  }

  return (
    <div className='flex w-full'>
      {/* mobile screen  */}
      <div
        className={`${
          collapsed1 ? 'w-[300px] lg:w-[15%]' : 'w-0'
        } z-10 bg-gray-700 block lg:hidden border-r-[1px] h-screen fixed overflow-auto top-0 lg:sticky lg:top-0 border-r-gray-200 transition-all duration-200`}>
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute bg-orange-400 cursor-pointer ${
            collapsed ? '-right-3' : '-right-4'
          } top-20 hidden lg:flex justify-center items-center p-1 rounded-full`}>
          {collapsed ? <BsChevronLeft className='text-white' /> : <BsChevronRight className='text-white' />}
        </div>
        <SideBarContent setCollapsed1={setCollapsed1} collapsed1={collapsed1} collapsed={collapsed} />
      </div>
      {/* pc screen  */}
      <div
        className={`${
          collapsed ? 'w-[300px] lg:w-[15%]' : 'w-0'
        } z-10 bg-gray-700 hidden lg:flex border-r-[1px] h-screen sticky overflow-auto top-0 lg:top-0 border-r-gray-200 transition-all duration-200`}>
        <SideBarContent setCollapsed1={setCollapsed1} collapsed1={collapsed1} collapsed={collapsed} />
      </div>
      <div className={`${collapsed ? 'w-full lg:w-[85%]' : 'w-full'} transition-all duration-200`}>
        <div className='h-16 shadow-lg flex justify-between items-center px-4 sticky top-0 bg-white'>
          <div className='flex justify-start items-center gap-3'>
            <FaBars onClick={toggleBar} className='lg:hidden block text-gray-700' size={22} />
            <BsChevronRight
              onClick={() => setCollapsed(!collapsed)}
              className={`lg:block hidden text-gray-700 ${
                collapsed ? 'rotate-[180deg]' : 'rotate[0]'
              } transition-all duration-200 cursor-pointer`}
              size={22}
            />
            <p className='text-gray-700 font-bold text-[20px]'>
              <AppBarContent />
            </p>
          </div>
          <div
            className='relative h-12 w-12 rounded-full border-[1px] border-gray-200  cursor-pointer'
            onClick={() => setProfileDrop((prev) => !prev)}>
            <ImageNoSSR avatar={user?.avatar} />
            <div
              className={`${
                profileDrop ? 'h-[90px] border-[1px]' : 'h-0 border-0'
              } transition-all w-[200px] duration-200 absolute top-[50px] right-[20px]  bg-white border-gray-200 shadow-md overflow-hidden flex flex-col`}>
              <p className='text-gray-400 text-sm px-4 py-3 hover:bg-gray-200  transition-all duration-200 flex justify-start items-center gap-2'>
                <FaRegUser size={20} /> Profile
              </p>
              <p
                className='text-gray-400 text-sm px-4 py-3 hover:bg-gray-200  transition-all duration-200 flex justify-start items-center gap-2'
                onClick={handleLogout}>
                <MdLogout size={20} /> Logout
              </p>
            </div>
          </div>
        </div>
        {/* main  */}
        <div className='flex flex-col lg:p-6 p-4'>{children}</div>
      </div>
    </div>
  )
}

export default Navbar
