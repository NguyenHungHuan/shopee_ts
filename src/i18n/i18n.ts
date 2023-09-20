import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HEADER_EN from '../locales/en/header.json'
import HEADER_VI from '../locales/vi/header.json'
import HOME_EN from '../locales/en/home.json'
import HOME_VI from '../locales/vi/home.json'
import PRODUCT_EN from '../locales/en/product.json'
import PRODUCT_VI from '../locales/vi/product.json'
import LOGIN_VI from '../locales/vi/login.json'
import LOGIN_EN from '../locales/en/login.json'
import CART_VI from '../locales/vi/cart.json'
import CART_EN from '../locales/en/cart.json'
import PROFILE_VI from '../locales/vi/profile.json'
import PROFILE_EN from '../locales/en/profile.json'
import ERROR_VI from '../locales/vi/error.json'
import ERROR_EN from '../locales/en/error.json'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  vi: {
    header: HEADER_VI,
    home: HOME_VI,
    product: PRODUCT_VI,
    login: LOGIN_VI,
    cart: CART_VI,
    profile: PROFILE_VI,
    error: ERROR_VI
  },
  en: {
    header: HEADER_EN,
    home: HOME_EN,
    product: PRODUCT_EN,
    login: LOGIN_EN,
    cart: CART_EN,
    profile: PROFILE_EN,
    error: ERROR_EN
  }
} as const

export const defaultNS = 'home'

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['header', 'home', 'product', 'login', 'cart', 'profile', 'error'],
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})
