import { Types } from 'mongoose'

export interface RouteResponse {
  msg?: String
  status: Number
  token?: String
  error?: any
  user?: UserData | null
  brands?: BrandData | null
  categories?: CategoryData | null
}

export interface UserRegisterRequest {
  email: String
  name: String
  password: String
}

export interface LoginUserRequest {
  email: String
  password: String
}

export type UserData = {
  name?: string
  email?: string
  role?: string
  _id?: Types.ObjectId
  id?: string
  avatar?: string
  currentAddress?: string
  permanentAddress?: string
  phone?: string
  city?: string
  country?: string
  zipCode?: number
}

export type ProfileRequest = {
  token: string
}

export type BrandData = {
  _id: Types.ObjectId
  brandName?: string
  brandImage?: string
}
export type CategoryData = {
  _id: Types.ObjectId
  categoryName?: string
}
