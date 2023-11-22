'use client'

import React, { FC, MouseEvent, useState } from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import SideBarContent from './SideBarContent'

const Navbar: FC = () => {
  const [collapsed, setCollapsed] = useState(true)
  const [collapsed1, setCollapsed1] = useState(false)

  const toggleBar = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setCollapsed1(true)
  }

  return (
    <div className='flex w-full'>
      <div
        className={`${
          collapsed1 ? 'w-[300px] lg:w-[20%]' : 'w-0'
        } z-10 bg-gray-700 block lg:hidden border-r-[1px] h-screen fixed top-0 lg:sticky lg:top-0 border-r-gray-200 transition-all duration-200`}>
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute bg-orange-400 cursor-pointer ${
            collapsed ? '-right-3' : '-right-4'
          } top-20 hidden lg:flex justify-center items-center p-1 rounded-full`}>
          {collapsed ? <BsChevronLeft className='text-white' /> : <BsChevronRight className='text-white' />}
        </div>
        <SideBarContent setCollapsed1={setCollapsed1} collapsed1={collapsed1} collapsed={collapsed} />
      </div>
      <div
        className={`${
          collapsed ? 'w-[300px] lg:w-[20%]' : 'w-0'
        } z-10 bg-gray-700 hidden lg:flex border-r-[1px] h-screen fixed top-0 lg:sticky lg:top-0 border-r-gray-200 transition-all duration-200`}>
        <div
          onClick={() => setCollapsed(!collapsed)}
          className={`absolute bg-orange-400 cursor-pointer ${
            collapsed ? '-right-3' : '-right-4'
          } top-20 hidden lg:flex justify-center items-center p-1 rounded-full`}>
          {collapsed ? <BsChevronLeft className='text-white' /> : <BsChevronRight className='text-white' />}
        </div>
        <SideBarContent setCollapsed1={setCollapsed1} collapsed1={collapsed1} collapsed={collapsed} />
      </div>
      <div className={`${collapsed ? 'w-full lg:w-[80%]' : 'w-full'} transition-all duration-200`}>
        <div className='h-16 shadow-lg flex justify-between items-center px-4 sticky top-0 bg-white'>
          <p className='text-gray-700 font-bold text-[20px]'>Dashboard</p>
          <FaBars onClick={toggleBar} className='lg:hidden block text-gray-700' size={22} />
        </div>
        {/* main  */}
        <div className='flex flex-col lg:p-6 p-4'>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>{' '}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>{' '}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>{' '}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>{' '}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>{' '}
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Navbar
