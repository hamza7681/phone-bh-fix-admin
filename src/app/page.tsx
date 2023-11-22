'use client'

import React, { FC, FormEvent, useEffect, useState } from 'react'
import logo from '../../public/assets/logo_black.webp'
import { SyncLoader } from 'react-spinners'
import axios from 'axios'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { setCookie } from 'cookies-next'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/redux/reducers/authslice'
import { useRouter } from 'next/navigation'
import GlobalLoader from '@/components/shared/GlobalLoader'

const LoginPage: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const { token } = useSelector((s: any) => s.auth)
  const [loading1, setLoading1] = useState(true)

  useEffect(() => {
    if (token) {
      router.push('/dashboard')
    } else {
      setLoading1(false)
    }
  }, [])

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log(email, password)
      const res = await axios.post('/api/auth/login', { email, password })
      if (res.data.status === 400) {
        toast.error(res.data.msg)
        setLoading(false)
      } else {
        setLoading(false)
        if (res.data.user.role !== 'admin') {
          toast.error('Only admin can login!')
        } else {
          toast.success(res.data.msg)
          setCookie('token', res.data.token)
          dispatch(login({ token: res.data.token, user: res.data.user }))
          router.replace('/dashboard')
        }
      }
    } catch (error: any) {
      console.log(error)
      setLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
      {loading1 ? (
        <GlobalLoader />
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <div className='w-[95%] lg:w-[500px] border-[1px] border-gray-200 shadow-lg px-5 py-10 rounded-[4px]'>
            <div className='w-full h-[150px] overflow-hidden flex justify-center items-center'>
              <Image src={logo} alt='logo' className='w-[300px]' loading='eager' />
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
      )}
    </>
  )
}

export default LoginPage
