import { product } from './products.type'

export interface purchase {
  _id: string
  buy_count: number
  price: number
  price_before_discount: number
  status: purchasesStatus
  user: string
  product: product
  createdAt: string
  updatedAt: string
}

export interface ExtendedPurchase extends purchase {
  disabled: boolean
  checked: boolean
}

export type purchasesStatus = -1 | 1 | 2 | 3 | 4 | 5
export type purchasesStatusList = 0 | purchasesStatus
