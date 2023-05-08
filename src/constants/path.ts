const path = {
  login: '/login',
  register: '/register',
  logout: '/logout',
  home: '/',
  products: '/products',
  categories: '/categories',
  productDetail: ':nameId',
  cart: '/cart',
  purchases: '/purchases',
  user: '/user/*',
  profile: '/user/profile',
  changePassword: '/user/password',
  historyPurchase: '/user/purchase',
  star: '*'
} as const

export default path
