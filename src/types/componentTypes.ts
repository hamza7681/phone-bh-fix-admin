import { Types } from 'mongoose'
import { Url } from 'next/dist/shared/lib/router/router'

export type Routes = {
  name: String
  path: Url
}

export type Brand = {
  _id: Types.ObjectId
  brandName: string
  brandImage: string
}
