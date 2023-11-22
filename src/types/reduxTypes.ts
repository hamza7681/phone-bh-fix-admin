import { UserData } from '@/interfaces/RouteInterfaces'

export type AuthState = {
  token: String | null
  user: UserData | null
}
