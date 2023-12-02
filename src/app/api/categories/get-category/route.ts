import { authenticate } from '@/database/config'
import { RouteResponse } from '@/interfaces/RouteInterfaces'
import { NextRequest, NextResponse } from 'next/server'
import Category from '@/models/categoryModel'
import { StatusCodes } from 'http-status-codes'
import { convertSingleBrandData } from '@/libs/dataConversion'

type NewResponse = NextResponse<RouteResponse>

interface Brand {
  brandName: String
  brandImage: String
}

export const POST = async (req: NextRequest): Promise<NewResponse | undefined> => {
  try {
    await authenticate()
    const { id } = (await req.json()) as { id: string }
    const category = await Category.findById(id)
    if (category) {
      return NextResponse.json({
        status: StatusCodes.OK,
        category: convertSingleBrandData(category),
      })
    } else {
      return NextResponse.json({
        msg: 'No category found!',
        status: StatusCodes.NOT_FOUND,
      })
    }
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
