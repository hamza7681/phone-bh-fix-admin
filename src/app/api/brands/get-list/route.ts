import { authenticate } from '@/database/config'
import { RouteResponse } from '@/interfaces/RouteInterfaces'
import { NextRequest, NextResponse } from 'next/server'
import Brand from '@/models/brandModel'
import { StatusCodes } from 'http-status-codes'
import { convertBrandData } from '@/libs/dataConversion'

type NewResponse = NextResponse<RouteResponse>

interface Brand {
  brandName: String
  brandImage: String
}

export const GET = async (req: NextRequest): Promise<NewResponse | undefined> => {
  try {
    await authenticate()
    const brands = await Brand.find()
    return NextResponse.json({
      msg: 'Brand added successfully',
      status: StatusCodes.OK,
      brands: convertBrandData(brands),
    })
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
