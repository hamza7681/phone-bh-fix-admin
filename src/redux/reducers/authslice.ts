import { UserData } from '@/interfaces/RouteInterfaces'
import { AuthState } from '@/types/reduxTypes'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  user: null,
} as AuthState

interface LoginPayload {
  token: String
  user: UserData
}

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState
    },
    login: (state, action: PayloadAction<LoginPayload>): AuthState => {
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      }
    },
  },
})

export const { login, logout } = AuthSlice.actions
export default AuthSlice.reducer
