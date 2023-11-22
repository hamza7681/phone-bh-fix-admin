import { Document } from 'mongoose'

export interface UserDocument extends Document {
  email: String
  name: String
  password: String
  role: String
  avatar: String
  currentAddress: String
  permanentAddress: String
  phone: String
  city: String
  country: String
  zipCode: Number
}
