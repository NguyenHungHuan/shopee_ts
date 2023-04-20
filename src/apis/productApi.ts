import path from '~/constants/path'
import axiosClients from './axiosClients'
import { successResponse } from '~/types/utils.type'
import { product, productList, productListConfig } from '~/types/products.type'

const url = path.products
const productsApi = {
  getProducts(params: productListConfig) {
    return axiosClients.get<successResponse<productList>>(url, { params })
  },
  getProductDetail(id: string) {
    return axiosClients.get<successResponse<product>>(`${url}/${id}`)
  },
  getCategories() {
    const url = path.categories
    return axiosClients.get<successResponse<product['category'][]>>(url)
  }
}

export default productsApi
