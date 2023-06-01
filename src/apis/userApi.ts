import path from '~/constants/path'
import axiosClients from './axiosClients'
import { successResponse } from '~/types/utils.type'
import { User } from '~/types/user.type'

interface bodyUpdateProfile extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
  password?: string | unknown
  new_password?: string | unknown
}

const userApi = {
  getProfile() {
    const url = path.me
    return axiosClients.get<successResponse<User>>(url)
  },
  updateProfile(body: bodyUpdateProfile) {
    const url = '/user'
    return axiosClients.put<successResponse<User>>(url, body)
  },
  updateAvatarProfile(body: FormData) {
    const url = '/user/upload-avatar'
    return axiosClients.post<successResponse<string>>(url, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

export default userApi
