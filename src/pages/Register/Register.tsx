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

const Register = () => {
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
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-5 py-[80px]'>
          <div className='col-span-2 col-start-4'>
            <form
              onSubmit={onSubmit}
              className='min-h-[462px] w-[400px] rounded bg-[#fff] p-[30px] shadow-lg'
              noValidate
            >
              <div className='text-[20px]'>Register</div>
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
                placeholder='Password'
                errorMessage={errors.password?.message}
              />
              <Input
                className='mt-3'
                name='confirm_password'
                register={register}
                type='password'
                placeholder='Confirm your password'
                errorMessage={errors.confirm_password?.message}
              />
              <Button
                disabled={registerAccountMutation.isLoading}
                isLoading={registerAccountMutation.isLoading}
                type='submit'
                className='mt-3 w-full bg-orange/90 px-4 py-2 text-[#fff] hover:bg-orange'
              >
                SIGN UP
              </Button>
              <div className='mt-8 flex items-center'>
                <div className='h-[1px] w-full flex-1 bg-[#ccc]'></div>
                <div className='px-4 text-xs text-[#ccc]'>OR</div>
                <div className='h-[1px] w-full flex-1 bg-[#ccc]'></div>
              </div>
              <div className='mt-6 px-8 text-center text-xs'>
                <span className=''>By signing up, you agree to Shopee&apos;s </span>
                <Link className='text-orange' to='/'>
                  Terms of Service
                </Link>
                <span className='text-xs'> & </span>
                <Link className='text-orange' to='/'>
                  Private Policy
                </Link>
              </div>
              <div className='mt-6 flex items-center justify-center gap-2'>
                <div className='text-sm text-[#ccc]'>New to Shopee? </div>
                <Link className='text-sm text-orange' to='/login'>
                  Log In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
