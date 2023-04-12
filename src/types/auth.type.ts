import { User } from './user.type'
import { successResponse } from './utils.type'

export type authResponse = successResponse<{
  access_token: string
  expires: string
  user: User
}>
