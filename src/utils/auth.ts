export const setAccessTokenToLS = (accessToken: string) => localStorage.setItem('access_token', accessToken)

export const getAccessTokenToLS = () => localStorage.getItem('access_token') || ''

export const clearAccessTokenToLS = () => localStorage.removeItem('access_token')
