import Image from 'next/image'
import React, { FC } from 'react'

const ImageRender: FC<{ avatar: string }> = ({ avatar }) => {
  return (
    <div>
      <Image src={avatar} alt='dp' width={48} height={48} />
    </div>
  )
}

export default ImageRender
