import { authenticate } from '@/database/config'
import { RouteResponse } from '@/interfaces/RouteInterfaces'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/userModel'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { EmailSender } from '@/libs/EmailSender'

type NewResponse = NextResponse<RouteResponse>
const SECRET = process.env.JWT_SECRET

interface Email {
  email: String
}

export const POST = async (req: NextRequest): Promise<NewResponse | undefined> => {
  try {
    await authenticate()
    const { email } = (await req.json()) as Email
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
      return NextResponse.json({ msg: 'No user found against this email', status: StatusCodes.BAD_REQUEST })
    } else {
      const token = jwt.sign(findUser.id, SECRET as string)
      const url = `http://localhost:3000/auth/change-password/${token}`
      await EmailSender(
        findUser.email as string,
        'Forgot Password',
        'Forgot Password',
        'Click here to reset your password',
        'Reset',
        url
      )
      return NextResponse.json({ msg: 'Email sent successfully', status: StatusCodes.OK })
    }
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
