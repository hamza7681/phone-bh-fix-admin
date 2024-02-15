import React, { ElementType, FC, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import logo from '../../../public/assets/logo.webp'
import { SidebarData } from '../../libs/SidebarData'
import { BsChevronDown } from 'react-icons/bs'
import { SideBarProps } from '@/types/pagesTypes'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'

const SideBarContent: FC<SideBarProps> = ({ setCollapsed1, collapsed1, collapsed }) => {
  const [sidebarContent, setSidebarContent] = useState(SidebarData)
  const router = useRouter()
  const pathname = usePathname()

  const handleParentItem = (val: any) => {
    if (val.path) {
      router.push(val.path)
    }

    if (val.isChildOpen && val.name !== 'Dashboard') {
      setSidebarContent((prev) => {
        const updatedIndex = prev.findIndex((x) => x.name === val.name)
        if (updatedIndex !== -1) {
          prev[updatedIndex].isChildOpen = false
        }
        return [...prev]
      })
    } else if (!val.isChildOpen && val.name !== 'Dashboard') {
      setSidebarContent((prev) => {
        const updatedIndex = prev.findIndex((x) => x.name === val.name)
        if (updatedIndex !== -1) {
          prev[updatedIndex].isChildOpen = true
        }
        return [...prev]
      })
    }
  }

  const Icon: FC<{ name: ElementType }> = ({ name }) => {
    const IconComponent = name
    return <IconComponent />
  }

  return (
    <>
      {/* mobile screen start */}
      <div className={`${collapsed1 ? 'flex opacity-[1]' : 'hidden opacity-0'} p-3 w-full flex-col`}>
        <div className='relative flex items-center'>
          <Image src={logo} alt='logo' className='w-[150px] lg:w-[200px]' loading='eager' />
          <div className='flex justify-end lg:hidden p-5 absolute right-0 ' onClick={() => setCollapsed1(false)}>
            <FaTimes className='text-white' />
          </div>
        </div>
        <div className='border-b-[1px] border-b-white my-2'></div>
        <div className='flex flex-col gap-2'>
          {sidebarContent.map((val, i) => {
            return (
              <div onClick={() => handleParentItem(val)} key={i} className=' flex flex-col'>
                <div
                  className={`flex items-center justify-between  py-2 px-3  cursor-pointer hover:bg-[#F0841E] transition-all duration-200 rounded-[4px] ${
                    pathname === val.path ? 'bg-[#F0841E]' : ''
                  } `}>
                  <div className='flex items-center gap-2 justify-start'>
                    <span className='text-[#ffffff]'>
                      <Icon name={val.icon} />
                    </span>
                    <p className='text-sm text-[#ffffff] font-semibold'>{val.name}</p>
                  </div>
                  {val.children.length > 0 && (
                    <BsChevronDown
                      color='white'
                      className={`${val.isChildOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-200 `}
                    />
                  )}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className={`${val.isChildOpen ? 'h-[90px]' : 'h-0'} overflow-hidden transition-all duration-200`}>
                  {val.children.length > 0 && (
                    <div className='flex flex-col gap-2 px-5'>
                      {val.children.map((child: any, index: number) => {
                        return (
                          <div
                            key={index}
                            onClick={() => router.push(child.path)}
                            className={`flex items-center justify-between  py-2 px-3  cursor-pointer hover:bg-[#F0841E] transition-all duration-200 rounded-[4px] ${
                              pathname === child.path ? 'bg-[#F0841E]' : ''
                            } `}>
                            <div className='flex items-center gap-2 justify-start'>
                              <span className='text-[#ffffff]'>
                                <Icon name={val.icon} />
                              </span>
                              <p className='text-sm text-[#ffffff]'>{child.name}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* mobile screen end  */}

      {/* pc screen start  */}
      <div className={`${collapsed ? 'lg:flex opacity-[1]' : 'lg:hidden opacity-0'} p-1 w-full flex-col hidden`}>
        <div className='relative flex justify-center items-center'>
          <Image src={logo} alt='logo' className='w-[150px] lg:w-[170px]' loading='eager' />
          <div className='flex justify-end lg:hidden p-5 absolute right-0 ' onClick={() => setCollapsed1(false)}>
            <FaTimes className='text-white' />
          </div>
        </div>
        <div className='border-b-[1px] border-b-white my-2'></div>
        <div className='flex flex-col gap-2'>
          {sidebarContent.map((val, i) => {
            return (
              <div onClick={() => handleParentItem(val)} key={i} className='flex flex-col'>
                <div
                  className={`flex items-center justify-between  py-2 px-3  cursor-pointer hover:bg-[#F0841E] transition-all duration-200 rounded-[4px] ${
                    pathname === val.path ? 'bg-[#F0841E]' : ''
                  } `}>
                  <div className='flex items-center gap-2 justify-start'>
                    <span className='text-[#ffffff]'>
                      <Icon name={val.icon} />
                    </span>
                    <p className='text-sm text-[#ffffff] font-semibold'>{val.name}</p>
                  </div>
                  {val.children.length > 0 && (
                    <BsChevronDown
                      color='white'
                      className={`${val.isChildOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-200 `}
                    />
                  )}
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className={`${val.isChildOpen ? 'h-[90px]' : 'h-0'} overflow-hidden transition-all duration-200`}>
                  {val.children.length > 0 && (
                    <div className='flex flex-col gap-2 px-5'>
                      {val.children.map((child: any, index: number) => {
                        return (
                          <div
                            key={index}
                            onClick={() => router.push(child.path)}
                            className={`flex items-center justify-between  py-2 px-3  cursor-pointer hover:bg-[#F0841E] transition-all duration-200 rounded-[4px] ${
                              pathname === child.path ? 'bg-[#F0841E]' : ''
                            } `}>
                            <div className='flex items-center gap-2 justify-start'>
                              <span className='text-[#ffffff]'>
                                <Icon name={val.icon} />
                              </span>
                              <p className='text-sm text-[#ffffff]'>{child.name}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      {/* pc screen end  */}
    </>
  )
}

export default SideBarContent
