import path from '~/constants/path'
import axiosClients from './axiosClients'
import { authResponse } from '~/types/auth.type'
import { FormData, LoginFormData } from '~/utils/rulesForm'

const AuthApi = {
  login(data: LoginFormData) {
    const url = path.login
    axiosClients.post<authResponse>(url, data)
  },
  register(data: FormData) {
    const url = path.register
    axiosClients.post<authResponse>(url, data)
  }
}

export default AuthApi
