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
  page: 1,
  limit: 5,
  sort_by: 'createdAt',
  order: 'asc'
}
