import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from '~/components/Input'
import { FormData, schema } from '~/utils/rulesForm'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import AuthApi from '~/apis/authApi'
import omit from 'lodash/omit'
import { isAxiosErrorUnprocessableEntity } from '~/utils/utils'
import { errorResponse } from '~/types/utils.type'
import { useContext } from 'react'
import { AppContext } from '~/Contexts/app.context'
import path from '~/constants/path'
import Button from '~/components/Button'
import useScrollTop from '~/hooks/useScrollTop'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

const Register = () => {
  const { t } = useTranslation('login')
  useScrollTop()
  const {
    register,
    reset,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const registerAccountMutation = useMutation({
    mutationFn: (data: Omit<FormData, 'confirm_password'>) => AuthApi.register(data)
  })

  const onSubmit = handleSubmit((data: FormData) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        reset()
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<errorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <>
      <Helmet>
        <title>{`${t('sign up')} | Shopee Clone`}</title>
        <meta name='description' content='Page register Shopee Clone' />
      </Helmet>
      <div className='bg-orange'>
        <div className='container py-[80px]'>
          <div className='flex items-center justify-center lg:justify-end'>
            <form
              onSubmit={onSubmit}
              className='min-h-[462px] w-[400px] rounded bg-[#fff] p-[30px] shadow-lg'
              noValidate
            >
              <div className='text-[20px]'>{t('sign up')}</div>
              <Input
                className='mt-8'
                name='email'
                register={register}
                type='email'
                placeholder='Email'
                errorMessage={errors.email?.message}
              />
              <Input
                className='mt-3'
                name='password'
                register={register}
                type='password'
                placeholder={t('password')}
                errorMessage={errors.password?.message}
              />
              <Input
                className='mt-3'
                name='confirm_password'
                register={register}
                type='password'
                placeholder={t('confirm_password')}
                errorMessage={errors.confirm_password?.message}
              />
              <Button
                disabled={registerAccountMutation.isLoading}
                isLoading={registerAccountMutation.isLoading}
                type='submit'
                className='mt-3 w-full bg-orange/90 px-4 py-2 text-[#fff] hover:bg-orange'
              >
                {t('sign up')}
              </Button>
              <div className='mt-8 flex items-center'>
                <div className='h-[1px] w-full flex-1 bg-[#ccc]'></div>
                <div className='px-4 text-xs text-[#ccc]'>{t('or')}</div>
                <div className='h-[1px] w-full flex-1 bg-[#ccc]'></div>
              </div>
              <div className='mt-6 flex items-center justify-center gap-2'>
                <div className='text-sm text-[#ccc]'>{t('register_desc')} </div>
                <Link title={t('sign in')} className='text-sm text-orange' to='/login'>
                  {t('sign in')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register
