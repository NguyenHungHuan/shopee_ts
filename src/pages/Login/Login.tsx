import { yupResolver } from '@hookform/resolvers/yup'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import AuthApi from '~/apis/authApi'
import Button from '~/components/Button'
import { AppContext } from '~/components/Contexts/app.context'
import Input from '~/components/Input'
import path from '~/constants/path'
import { errorResponse } from '~/types/utils.type'
import { LoginFormData, loginSchema } from '~/utils/rulesForm'
import { isAxiosErrorUnprocessableEntity } from '~/utils/utils'

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  })
  const navigate = useNavigate()
  const { setIsAuthenticated, setProfile } = useContext(AppContext)

  const loginAccountMutation = useMutation({
    mutationFn: (data: LoginFormData) => AuthApi.login(data)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate(path.home)
      },
      onError: (error) => {
        if (isAxiosErrorUnprocessableEntity<errorResponse<LoginFormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof LoginFormData, {
                message: formError[key as keyof LoginFormData],
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
          <div className='col-start-4 col-span-2'>
            <form
              onSubmit={onSubmit}
              className='w-[400px] min-h-[430px] p-[30px] bg-[#fff] shadow-lg rounded'
              noValidate
            >
              <div className='text-[20px]'>Log In</div>
              <Input
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                type='email'
                name='email'
                register={register}
              />
              <Input
                className='mt-3'
                classNameInput='w-full outline-none border px-4 py-2 border-[#00000024] rounded-sm'
                classNameError='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'
                errorMessage={errors.password?.message}
                placeholder='Password'
                type='password'
                name='password'
                register={register}
              />
              <Button
                disabled={loginAccountMutation.isLoading}
                isLoading={loginAccountMutation.isLoading}
                type='submit'
                className='w-full mt-3 bg-orange/90 hover:bg-orange text-[#fff] py-2 px-4 flex items-center justify-center'
              >
                LOG IN
              </Button>
              <div className='flex items-center mt-8'>
                <div className='flex-1 w-full h-[1px] bg-[#ccc]'></div>
                <div className='text-xs text-[#ccc] px-4'>OR</div>
                <div className='flex-1 w-full h-[1px] bg-[#ccc]'></div>
              </div>
              <div className='flex items-center justify-center gap-2 mt-6'>
                <div className='text-[#ccc] text-sm'>New to Shopee? </div>
                <Link className='text-orange text-sm' to='/register'>
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
