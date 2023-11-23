import { authenticate } from '@/database/config'
import { RouteResponse } from '@/interfaces/RouteInterfaces'
import { NextRequest, NextResponse } from 'next/server'
import Brand from '@/models/brandModel'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'

type NewResponse = NextResponse<RouteResponse>
const SECRET = process.env.JWT_SECRET

interface Brand {
  brandName: String
  brandImage: String
}

export const POST = async (req: NextRequest): Promise<NewResponse | undefined> => {
  try {
    await authenticate()
    const token = req.headers.get('authorization')
    let userId: string | null = null
    if (token) {
      const { brandName, brandImage } = (await req.json()) as Brand
      jwt.verify(token, SECRET as string, (err, user) => {
        if (err) {
          return NextResponse.json({ msg: 'Invalid Token', status: StatusCodes.UNAUTHORIZED })
        }
        if (user) {
          userId = user as string
        }
      })
      if (userId) {
        const newBrand = new Brand({ brandName, brandImage })
        await newBrand.save()
        return NextResponse.json({
          msg: 'Brand added successfully',
          status: StatusCodes.OK,
        })
      }
    } else {
      return NextResponse.json({ msg: 'Unauthorized', status: StatusCodes.UNAUTHORIZED })
    }
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
