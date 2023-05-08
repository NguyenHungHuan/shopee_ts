import { product } from './products.type'

export interface purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: purchaseStatus
  user: string
  product: product
  createdAt: string
  updatedAt: string
}

export type purchaseStatus = -1 | 1 | 2 | 3 | 4 | 5
export type purchaseStatusList = 0 | purchaseStatus
