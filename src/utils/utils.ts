import axios, { AxiosError } from 'axios'
import HttpStatusCode from '~/constants/HttpStatusCode'
import config from '~/constants/config'
import noAvatar from '~/assets/images/noAvatar.png'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}

export function isAxiosErrorUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function formatPriceNumber(price: number) {
  return new Intl.NumberFormat('de-DE').format(price)
}

export function formatSocialNumber(number: number) {
  return new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  })
    .format(number)
    .replace('.', ',')
    .toLowerCase()
}

export const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export function generateNameId(name: string, id: string) {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export function getIdFormNameId(nameId: string) {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

export function getAvatarUrl(avatarName: string) {
  return avatarName ? `${config.baseUrl}images/${avatarName}` : noAvatar
}
