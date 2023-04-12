import axios from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '~/constants/HttpStatusCode'
import path from '~/constants/path'
import { authResponse } from '~/types/auth.type'
import { getAccessTokenToLS } from '~/utils/auth'
import { clearAccessTokenToLS, setAccessTokenToLS } from '~/utils/auth'

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
    const { config } = response
    if (config.url === path.login || path.register) {
      const accessToken = (response.data as authResponse).data.access_token
      setAccessTokenToLS(accessToken)
    }
    if (config.url === path.logout) {
      return clearAccessTokenToLS()
    }
    return response.data
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
