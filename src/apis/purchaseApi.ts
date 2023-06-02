import path from '~/constants/path'
import { purchase, purchasesStatusList } from '~/types/purchase.type'
import { successResponse } from '~/types/utils.type'
import axiosClients from './axiosClients'

export interface purchaseBody {
  product_id: string
  buy_count: number
}

const URL = path.purchases
const purchaseApi = {
  getPurchases(params: { status: purchasesStatusList }) {
    return axiosClients.get<successResponse<purchase[]>>(URL, { params })
  },
  addToCart(body: purchaseBody) {
    return axiosClients.post<successResponse<purchase>>(`${URL}/add-to-cart`, body)
  },
  updatePurchase(body: purchaseBody) {
    return axiosClients.put<successResponse<purchase>>(`${URL}/update-purchase`, body)
  },
  buyPurchase(body: purchaseBody[]) {
    return axiosClients.post<successResponse<purchase[]>>(`${URL}/buy-products`, body)
  },
  deletePurchase(id: string[]) {
    return axiosClients.delete<successResponse<{ deleted_count: number }>>(URL, {
      data: id
    })
  }
}

export default purchaseApi
