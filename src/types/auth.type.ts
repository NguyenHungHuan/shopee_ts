import { successResponse } from './utils.type'

type Role = 'User' | 'Admin'
export type authResponse = successResponse<{
  access_token: string
  expires: string
  user: {
    _id: string
    roles: Role[]
    email: string
    name?: string
    date_of_birth?: null
    avatar?: string
    address?: string
    phone?: string
    createdAt: string
    updatedAt: string
  }
}>
