import { authenticate } from '@/database/config'
import { RouteResponse, UserRegisterRequest } from '@/interfaces/RouteInterfaces'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/models/userModel'
import { StatusCodes } from 'http-status-codes'

type NewResponse = NextResponse<RouteResponse>

export const POST = async (req: NextRequest): Promise<NewResponse | undefined> => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  try {
    await authenticate()
    const { name, email, password } = (await req.json()) as UserRegisterRequest
    if (!name || !email || !password) {
      return NextResponse.json({ msg: 'Missing Fields', status: StatusCodes.BAD_REQUEST })
    } else if (!emailRegex.test(email as string)) {
      return NextResponse.json({ msg: 'Invalid email', status: StatusCodes.BAD_REQUEST })
    } else if (!passRegex.test(password as string)) {
      return NextResponse.json({
        msg: 'Password must contain at least 1 uppercase, 1 lowercase and 1 special character',
        status: StatusCodes.BAD_REQUEST,
      })
    } else {
      const findUser = await User.findOne({ email: email })
      if (findUser) {
        return NextResponse.json({ msg: 'Email already exist!', status: StatusCodes.CONFLICT })
      } else {
        const hashPassword = await bcrypt.hash(password as string, 12)
        const newUser = new User({ name, email, password: hashPassword })
        await newUser.save()
        return NextResponse.json({
          msg: 'Registered successfully. You can login to your account now.',
          status: StatusCodes.OK,
        })
      }
    }
  } catch (error) {
    return NextResponse.json({ error: error, msg: 'INTERNAL_SERVER_ERROR', status: StatusCodes.INTERNAL_SERVER_ERROR })
  }
}
