import React from 'react'
import { HashLoader } from 'react-spinners'

const GlobalLoader = () => {
  return (
    <div className='h-screen flex justify-center items-center w-full'>
      <HashLoader color='#F0841E' />
    </div>
  )
}

export default GlobalLoader
