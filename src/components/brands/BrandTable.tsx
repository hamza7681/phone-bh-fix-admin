import React, { ChangeEvent, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Image from 'next/image'
import { FaPen, FaPlus, FaTrash } from 'react-icons/fa'
import { SiMicrosoftexcel } from 'react-icons/si'
import { useRouter } from 'next/navigation'
import DeleteConfirmation from './DeleteConfirmation'

const BrandTable = () => {
  const [brands, setBrands] = useState([])
  const { token } = useSelector((s: any) => s.auth)
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBrands = async () => {
      try {
        const res = await axios.post('/api/brands/get-list', { temp: '' })
        if (res) {
          setBrands(res.data.brands)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (token) {
      getBrands()
    }
  }, [token])

  const imageColumn = (rowData: any) => {
    return (
      <div className='flex w-[60px] h-[60px] rounded-full justify-center items-center border-[1px] border-gray-200 overflow-hidden'>
        <Image
          src={rowData.brandImage}
          alt='brand_image'
          width={60}
          height={60}
          className='rounded-full w-[60px] h-[60px]'
        />
      </div>
    )
  }

  const brandName = (rowData: any) => {
    return <span>{rowData.brandName}</span>
  }

  const actions = (rowData: any) => {
    return (
      <div className='flex items-center gap-3'>
        <div
          onClick={() => router.push(`/brands/brand-edit/${rowData._id}`)}
          className='w-7 h-7 bg-blue-500 cursor-pointer justify-center items-center flex rounded-[4px] text-white'>
          <FaPen />
        </div>
        <div
          onClick={() => {
            setVisible(true)
            setId(rowData._id)
          }}
          className='w-7 h-7 bg-red-500 cursor-pointer justify-center items-center flex rounded-[4px] text-white'>
          <FaTrash />
        </div>
      </div>
    )
  }

  const generateCSV = () => {
    const csvData = brands.map((brand: any) => {
      return {
        srNo: brand.srNo,
        brandImage: brand.brandImage,
        brandName: brand.brandName,
      }
    })

    const csvContent = csvData
      .map((row) => {
        return Object.values(row).join(',')
      })
      .join('\n')

    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=UTF-8' })
    const csvURL = URL.createObjectURL(csvBlob)

    const link = document.createElement('a')
    link.href = csvURL
    link.download = 'brands.csv'
    link.click()
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`/api/brands/delete`, { id: id }, { headers: { Authorization: token } })
      if (res) {
        const filterBrands = brands.filter((x: any) => x._id !== res.data.brand._id)
        setBrands(filterBrands)
        setLoading(false)
        setVisible(false)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div>
      <DeleteConfirmation visible={visible} setVisible={setVisible} handleDelete={handleDelete} loading={loading} />
      <div className='flex md:flex-row md:gap-0 gap-2 flex-col justify-between w-full my-3 border-[1px] border-gray-200 rounded-[4px] p-2'>
        <input
          type='text'
          className='focus:outline-none lg:w-[400px] w-full border-[1px] border-gray-200 rounded-[4px] px-3 py-2 '
          placeholder='Search by name'
        />
        <div className='flex items-center gap-3'>
          <button
            className='bg-red-500 text-white text-sm px-3 py-2 lg:px-3 lg:py-3 flex items-center justify-center gap-2 rounded-[4px]'
            onClick={() => router.push('/brands/brand-add')}>
            <FaPlus /> Add
          </button>
          <button
            className='bg-green-500 text-white text-sm px-3 py-2 lg:px-3 lg:py-3 flex items-center justify-center gap-2 rounded-[4px]'
            onClick={generateCSV}>
            <SiMicrosoftexcel /> Download CSV
          </button>
        </div>
      </div>
      <DataTable
        className='border-[1px] border-gray-200 rounded-[4px] overflow-hidden'
        value={brands}
        paginator
        rows={5}
        stripedRows
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '50rem' }}>
        <Column header='Brand Image' style={{ width: '33%' }} body={imageColumn}></Column>
        <Column header='Brand Name' style={{ width: '33%' }} body={brandName}></Column>
        <Column style={{ width: '34%' }} body={actions}></Column>
      </DataTable>
    </div>
  )
}

export default BrandTable
