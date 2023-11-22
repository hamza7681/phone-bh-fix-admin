import { authenticate } from '@/database/config'
import { RouteResponse } from '@/interfaces/RouteInterfaces'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

type NewResponse = NextResponse<RouteResponse>
const SECRET = process.env.JWT_SECRET

interface Password {
  password: String
}

export const POST = async (req: NextRequest): Promise<NewResponse | undefined> => {
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  try {
    await authenticate()
    const token = req.headers.get('authorization')
    let userId: string | null = null
    if (token) {
      const { password } = (await req.json()) as Password
      jwt.verify(token, SECRET as string, (err, user) => {
        if (err) {
          return NextResponse.json({ msg: 'Invalid Token', status: StatusCodes.UNAUTHORIZED })
        }
        if (user) {
          userId = user as string
        }
      })
      if (userId) {
        if (!password) {
          return NextResponse.json({ msg: 'Missing Fields', status: StatusCodes.BAD_REQUEST })
        } else if (!passRegex.test(password as string)) {
          return NextResponse.json({
            msg: 'Password must contain at least 1 uppercase, 1 lowercase and 1 special character',
            status: StatusCodes.BAD_REQUEST,
          })
        } else {
          const hashPassword = await bcrypt.hash(password as string, 12)
          await User.findByIdAndUpdate(userId, { password: hashPassword })
          return NextResponse.json({ msg: 'Password reset successfully', status: StatusCodes.OK })
        }
      }
    } else {
      return NextResponse.json({ msg: 'Unauthorized', status: StatusCodes.UNAUTHORIZED })
    }
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
