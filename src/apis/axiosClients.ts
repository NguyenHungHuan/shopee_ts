import axios from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '~/constants/HttpStatusCode'
import path from '~/constants/path'
import { authResponse } from '~/types/auth.type'
import { clearLS, getAccessTokenToLS, setAccessTokenToLS, setProfileToLS } from '~/utils/auth'

const axiosClients = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

axiosClients.interceptors.request.use(
  function (config) {
    const accessToken = getAccessTokenToLS()
    if (config.headers && accessToken) {
      config.headers.Authorization = accessToken
      return config
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClients.interceptors.response.use(
  function (response) {
    const { url } = response.config
    if (url === path.login || url === path.register) {
      const data = response.data as authResponse
      const accessToken = data.data.access_token
      setAccessTokenToLS(accessToken)
      setProfileToLS(data.data.user)
    }
    if (url === path.logout) {
      clearLS()
    }
    return response
  },
  function (error) {
    const { status, data } = error.response
    if (status !== HttpStatusCode.UnprocessableEntity) {
      const message = data.message || error.message
      toast.error(message, {
        autoClose: 3000
      })
    }
    return Promise.reject(error)
  }
)

export default axiosClients
