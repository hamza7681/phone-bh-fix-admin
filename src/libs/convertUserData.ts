import { UserData } from '@/interfaces/RouteInterfaces'
import { Types } from 'mongoose'

export const convertUserData = (user: any): UserData => {
  return {
    _id: user._id as Types.ObjectId,
    email: user.email as string,
    name: user.name as string,
    role: user.role as string,
    avatar: user.avatar as string,
    currentAddress: user.currentAddress as string,
    permanentAddress: user.permanentAddress as string,
    phone: user.phone as string,
    city: user.city as string,
    country: user.country as string,
    zipCode: user.zipCode as number,
  }
}
