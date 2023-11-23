import { authenticate } from '@/database/config'
import { RouteResponse } from '@/interfaces/RouteInterfaces'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { convertUserData } from '@/libs/dataConversion'

type NewResponse = NextResponse<RouteResponse>
const SECRET = process.env.JWT_SECRET

interface Shipping {
  currentAddress: String
  permanentAddress: String
  phone: String
  city: String
  country: String
  zipCode: String
}

export const POST = async (req: NextRequest): Promise<NewResponse | undefined> => {
  try {
    await authenticate()
    const token = req.headers.get('authorization')
    let userId: string | null = null
    if (token) {
      const { currentAddress, permanentAddress, phone, city, country, zipCode } = (await req.json()) as Shipping
      jwt.verify(token, SECRET as string, (err, user) => {
        if (err) {
          return NextResponse.json({ msg: 'Invalid Token', status: StatusCodes.UNAUTHORIZED })
        }
        if (user) {
          userId = user as string
        }
      })
      if (userId) {
        const res = await User.findByIdAndUpdate(
          userId,
          { currentAddress, permanentAddress, phone, city, country, zipCode },
          { new: true }
        )
        return NextResponse.json({
          msg: 'Shipping information updated successfully',
          status: StatusCodes.OK,
          user: convertUserData(res),
        })
      }
    } else {
      return NextResponse.json({ msg: 'Unauthorized', status: StatusCodes.UNAUTHORIZED })
    }
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
