export const orderConstant = {
  desc: 'desc',
  asc: 'asc'
} as const

export const sortBy = {
  createdAt: 'createdAt',
  view: 'view',
  sold: 'sold',
  price: 'price'
} as const

export const queryParamsDefault = {
  page: '1',
  limit: '10',
  sort_by: 'view',
  order: 'asc'
}
