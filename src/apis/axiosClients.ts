import axios from 'axios'
import { toast } from 'react-toastify'
import HttpStatusCode from '~/constants/HttpStatusCode'

const axiosClients = axios.create({
  baseURL: 'https://api-ecom.duthanhduoc.com/',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

axiosClients.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosClients.interceptors.response.use(
  function (response) {
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
