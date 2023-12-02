import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import FormInput from '../shared/FormInput'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SyncLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import { useParams } from 'next/navigation'

const EditBrandForm: FC = () => {
  const [categoryName, setCategoryName] = useState('')
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((s: any) => s.auth)
  const { id } = useParams()

  useEffect(() => {
    const getSingleBrand = async () => {
      try {
        const res = await axios.post(`/api/brands/get-brand`, { id })
        if (res) {
          setCategoryName(res.data.brand.brandName)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getSingleBrand()
  }, [id])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (!brandName || brandName === '') {
        toast.error('Please enter brand name')
        setLoading(false)
      } else {
        if (file) {
          const formData = new FormData()
          formData.append('file', file as Blob)
          formData.append('upload_preset', 'phone_fix_brands_images')
          const res: any = await axios.post('https://api.cloudinary.com/v1_1/hamza7681/image/upload', formData)
          if (res) {
            const result = await axios.post(
              `/api/brands/edit?id=${id}`,
              {
                brandName: brandName,
                brandImage: res.data.secure_url,
              },
              { headers: { Authorization: token } }
            )
            if (result) {
              toast.success(result.data.msg)
              setLoading(false)
            }
          }
        } else {
          const result = await axios.post(
            `/api/brands/edit?id=${id}`,
            {
              brandName: brandName,
              brandImage: imageUrl,
            },
            { headers: { Authorization: token } }
          )
          if (result) {
            toast.success(result.data.msg)
            setLoading(false)
          }
        }
      }
    } catch (error: any) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='w-full p-4 border-[1px] mt-4 border-gray-200 shadow-lg rounded-[4px]'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
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
            {imageUrl && (
              <div className='w-fit p-1 border-[1px] border-gray-200 rounded-[4px]'>
                <Image src={imageUrl} alt='brand_image' width={200} height={200} />
              </div>
            )}
          </div>
          <button
            type='submit'
            className='text-white font-semibold flex justify-center items-center h-9 w-[120px] bg-[#F0841E] text-sm py-2 rounded-[4px]'>
            {loading ? <SyncLoader color='#ffffff' size={8} /> : 'Update Brand'}
          </button>
        </form>
      </div>
    </>
  )
}

export default EditBrandForm
