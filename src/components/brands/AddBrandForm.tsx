import React, { ChangeEvent, useState } from 'react'
import FormInput from '../shared/FormInput'
import Image from 'next/image'

const AddBrandForm = () => {
  const [brandName, setBrandName] = useState('')
  const [file, setFile] = useState<Blob | string>()
  const [imageUrl, setImageUrl] = useState('')

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      setFile(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImageUrl(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='w-full p-4 border-[1px] mt-4 border-gray-200 shadow-lg rounded-[4px]'>
      <form className='flex flex-col gap-3'>
        <FormInput
          label='Brand Name'
          referenceId='brandName'
          type='text'
          placeholder='Enter brand name'
          value={brandName}
          handleChange={(e) => setBrandName(e.target.value)}
        />
        <div className='flex flex-col gap-1 w-full'>
          <label htmlFor='BrandImage' className='text-[#F0841E] text-sm font-semibold'>
            Brand Image
          </label>
          <input
            className='w-full py-2 px-3 text-gray-500 focus:outline-none border-gray-200 border-[1px] rounded-[4px]'
            type='file'
            onChange={handleImage}
            id='BrandImage'
          />
          {file && (
            <div className='w-fit p-1 border-[1px] border-gray-200 rounded-[4px]'>
              <Image src={imageUrl} alt='brand_image' width={200} height={200} />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='text-white font-semibold flex justify-center items-center w-[120px] bg-[#F0841E] text-sm py-2 rounded-[4px]'>
          Add Brand
        </button>
      </form>
    </div>
  )
}

export default AddBrandForm
