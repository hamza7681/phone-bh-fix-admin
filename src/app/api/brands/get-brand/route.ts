import { authenticate } from '@/database/config'
import { RouteResponse } from '@/interfaces/RouteInterfaces'
import { NextRequest, NextResponse } from 'next/server'
import Brand from '@/models/brandModel'
import { StatusCodes } from 'http-status-codes'
import { convertSingleBrandData } from '@/libs/dataConversion'

type NewResponse = NextResponse<RouteResponse>

interface Brand {
  brandName: String
  brandImage: String
}

export const GET = async (req: NextRequest): Promise<NewResponse | undefined> => {
  try {
    await authenticate()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    const brand = await Brand.findById(id)
    if (brand) {
      return NextResponse.json({
        status: StatusCodes.OK,
        brand: convertSingleBrandData(brand),
      })
    } else {
      return NextResponse.json({
        msg: 'No brand found!',
        status: StatusCodes.NOT_FOUND,
      })
    }
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
