import { Link } from 'react-router-dom'
import path from '~/constants/path'
import Popover from '../Popover'
import { useMutation, useQueryClient } from 'react-query'
import AuthApi from '~/apis/authApi'
import { useContext } from 'react'
import { AppContext } from '../../Contexts/app.context'
import { toast } from 'react-toastify'
import { purchasesStatus } from '~/constants/purchase'
import { getAvatarUrl } from '~/utils/utils'
import { useTranslation } from 'react-i18next'
import { locales } from '~/i18n/i18n'
import i18next from 'i18next'

export default function NavHeader() {
  const { t } = useTranslation('header')
  const currentLang = locales[i18next.language as keyof typeof locales]
  const queryClient = useQueryClient()
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchaseList', { status: purchasesStatus.inCart }] })
    },
    onError: (error) => {
      toast.error(error as string)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleLanguage = (lang: 'vi' | 'en') => {
    // eslint-disable-next-line import/no-named-as-default-member
    i18next.changeLanguage(lang)
  }

  return (
    <div className='flex h-[2.125rem] items-center bg-orange'>
      <nav className='container w-full'>
        <ul className='flex items-center justify-end gap-4 text-[13px] text-white'>
          <Popover
            renderPopover={
              <div className='flex min-w-[200px] flex-col rounded-sm border border-t-0 bg-white text-left text-base text-black shadow-sm'>
                <button
                  onClick={() => handleLanguage('en')}
                  className='py-2 pl-4 pr-8 text-left hover:bg-slate-100 hover:text-orange'
                >
                  {t('english')}
                </button>
                <button
                  onClick={() => handleLanguage('vi')}
                  className='py-2 pl-4 pr-8 text-left hover:bg-slate-100 hover:text-orange'
                >
                  {t('vietnamese')}
                </button>
              </div>
            }
            as={'li'}
            className='flex items-center gap-1 py-4 hover:cursor-pointer hover:text-white/80'
          >
            <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              <path
                d='M1.33398 8H14.6673'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span>{currentLang}</span>
            <svg viewBox='0 0 12 12' fill='none' width={12} height={12} color='currentColor'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
                fill='currentColor'
              />
            </svg>
          </Popover>
          {!isAuthenticated && (
            <li className='flex items-center'>
              <Link
                title={t('sign up')}
                className=' border-r border-r-white/50 px-2 hover:opacity-80'
                to={path.register}
              >
                {t('sign up')}
              </Link>
              <Link title={t('sign in')} className=' px-2 hover:opacity-80' to={path.login}>
                {t('sign in')}
              </Link>
            </li>
          )}
          {isAuthenticated && (
            <Popover
              as={'li'}
              className='flex cursor-pointer items-center gap-1 py-4 hover:text-white/80'
              renderPopover={
                <div className='flex min-w-[150px] flex-col rounded-sm border border-t-0 bg-white text-left text-base text-black shadow-sm'>
                  <Link
                    title={t('my profile')}
                    to={path.profile}
                    className='py-2 pl-4 pr-8 hover:bg-slate-100 hover:text-cyan-400'
                  >
                    {t('my profile')}
                  </Link>
                  <Link
                    title={t('my cart')}
                    to={path.cart}
                    className='py-2 pl-4 pr-8 hover:bg-slate-100 hover:text-cyan-400'
                  >
                    {t('my cart')}
                  </Link>
                  <button
                    title={t('logout')}
                    onClick={handleLogout}
                    className='py-2 pl-4 pr-8 text-left hover:bg-slate-100 hover:text-cyan-400'
                  >
                    {t('logout')}
                  </button>
                </div>
              }
            >
              <img
                className='h-[20px] w-[20px] rounded-full object-cover'
                src={getAvatarUrl(profile?.avatar as string)}
                alt='avatar'
              />
              <span>{profile?.email}</span>
            </Popover>
          )}
        </ul>
      </nav>
    </div>
  )
}
