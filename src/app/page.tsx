'use client'

import React, { FormEvent, useRef, useState } from 'react'
import logo from '../../public/assets/logo_black.webp'
import { Toast } from 'primereact/toast'
import { SyncLoader } from 'react-spinners'
import axios from 'axios'
import Image from 'next/image'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const toast = useRef<Toast | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log(email, password)
      const res = await axios.post('/api/auth/login', { email, password })
      if (res.data.status === 400) {
        toast.current?.show({ severity: 'error', summary: 'Error', detail: res.data.msg })
        setLoading(false)
      } else {
        toast.current?.show({ severity: 'success', summary: 'Login', detail: res.data.msg })
        setLoading(false)
      }
    } catch (error: any) {
      console.log(error)
      setLoading(false)
      toast.current?.show({ severity: 'error', summary: 'Error', detail: error.message })
    }
  }

  return (
    <>
      <Toast ref={toast} />
      <div className='flex justify-center items-center h-screen'>
        <div className='w-[95%] lg:w-[500px] border-[1px] border-gray-200 shadow-lg px-5 py-10 rounded-[4px]'>
          <div className='w-full h-[150px] overflow-hidden flex justify-center items-center'>
            <Image src={logo} alt='logo' className='w-[300px]' />
          </div>
          <h1 className='text-center text-[#F0841E] text-[32px] mb-10 font-semibold'>Admin Dashboard</h1>
          <form onSubmit={handleLogin} className='flex flex-col gap-3'>
            <input
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='px-3 py-2 border-[1px] border-gray-200 rounded-[3px] focus:outline-none'
            />
            <input
              type={show ? 'text' : 'password'}
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='px-3 py-2 border-[1px] border-gray-200 rounded-[3px] focus:outline-none'
            />
            <div className='flex items-center justify-start gap-2'>
              <input type='checkbox' checked={show} onChange={(e) => setShow(e.target.checked)} id='box' />
              <label className='text-sm text-gray-400' htmlFor='box'>
                Show Password
              </label>
            </div>
            <button
              type='submit'
              className='flex bg-[#F0841E] rounded-full h-10 justify-center items-center text-white font-semibold'>
              {loading ? <SyncLoader color='#ffffff' size={8} /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage
