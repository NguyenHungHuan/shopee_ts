import path from '~/constants/path'
import { authResponse } from '~/types/auth.type'
import { LoginFormData } from '~/utils/rulesForm'
import axiosClients from './axiosClients'

const AuthApi = {
  login(data: LoginFormData) {
    const url = path.login
    return axiosClients.post<authResponse>(url, data)
  },
  register(data: LoginFormData) {
    const url = path.register
    return axiosClients.post<authResponse>(url, data)
  },
  logout() {
    const url = path.logout
    return axiosClients.post(url)
  }
}

export default AuthApi
