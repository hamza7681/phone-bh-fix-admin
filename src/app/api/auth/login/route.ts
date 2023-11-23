import { authenticate } from '@/database/config'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/models/userModel'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { convertUserData } from '@/libs/dataConversion'
import { LoginUserRequest, RouteResponse } from '@/interfaces/RouteInterfaces'

type NewResponse = NextResponse<RouteResponse>
const SECRET = process.env.JWT_SECRET

export const POST = async (req: NextRequest): Promise<NewResponse | undefined> => {
  try {
    await authenticate()
    const { email, password } = (await req.json()) as LoginUserRequest
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
      return NextResponse.json({ msg: 'Invalid Credentials', status: StatusCodes.BAD_REQUEST })
    } else {
      const isCheck = await bcrypt.compare(password as string, findUser.password as string)
      if (!isCheck) {
        return NextResponse.json({ msg: 'Invalid Credentials', status: StatusCodes.BAD_REQUEST })
      } else {
        const token = jwt.sign(findUser.id, SECRET as string)
        return NextResponse.json({
          msg: 'Login Successfully',
          status: StatusCodes.OK,
          token: token,
          user: convertUserData(findUser),
        })
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
