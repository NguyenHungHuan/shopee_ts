import { User } from '~/types/user.type'

export const setAccessTokenToLS = (access_token: string) => localStorage.setItem('access_token', access_token)

export const getAccessTokenToLS = () => localStorage.getItem('access_token') || ''

export const clearLS = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('profile')
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfileToLS = () => {
  const result = localStorage.getItem('profile')
  return result ? JSON.parse(result) : null
}
