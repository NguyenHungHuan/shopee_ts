import path from '~/constants/path'
import axiosClients from './axiosClients'
import { successResponse } from '~/types/utils.type'
import { purchase, purchaseStatus } from '~/types/purchase.type'

const URL = path.purchases
const purchaseApi = {
  getPurchases(params: { status: purchaseStatus }) {
    return axiosClients.get<successResponse<purchase[]>>(URL, { params })
  },
  addToCart(body: { product_id: string; buy_count: number }) {
    return axiosClients.post<successResponse<purchase>>(`${URL}/add-to-cart`, body)
  },
  // updatePurchase(body: { product_id: string; buy_count: number }) {
  //   return axiosClients.post(`${URL}/update-purchase`, body)
  // },
  // buyPurchase(body: [{ product_id: string; buy_count: number }]) {
  //   return axiosClients.post(`${URL}/buy-products`, body)
  // },
  // deletePurchase(body: [product_id: string]) {
  //   return axiosClients.delete(URL, body)
  // }
}

export default purchaseApi
