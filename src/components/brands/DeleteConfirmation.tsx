import { DeleteDialogProps } from '@/types/pagesTypes'
import { Dialog } from 'primereact/dialog'
import React, { FC } from 'react'
import { SyncLoader } from 'react-spinners'

const DeleteConfirmation: FC<DeleteDialogProps> = ({ visible, setVisible, handleDelete, loading }) => {
  return (
    <div>
      <Dialog
        draggable={false}
        header='Delete Confirmations'
        visible={visible}
        className='lg:w-[400px] w-[95%]'
        onHide={() => setVisible(false)}>
        <p className='m-0'>Do you want to delete this brand?</p>
        <div className='flex justify-end pt-5 items-center gap-3'>
          <button
            className='w-[100px] text-sm flex justify-center items-center h-8 rounded-[4px] text-white font-semibold bg-green-500 cursor-pointer'
            onClick={() => setVisible(false)}>
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className='w-[100px] text-sm flex justify-center items-center h-8 rounded-[4px] text-white font-semibold bg-red-500 cursor-pointer'>
            {loading ? <SyncLoader color='#ffffff' size={8} /> : 'Delete'}
          </button>
        </div>
      </Dialog>
    </div>
  )
}

export default DeleteConfirmation
