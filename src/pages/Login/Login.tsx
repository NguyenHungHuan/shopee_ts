import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '~/components/Input'
import { LoginFormData, loginSchema } from '~/utils/rulesForm'
import { yupResolver } from '@hookform/resolvers/yup'

const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema)
  })

  const onSubmit = handleSubmit((data: LoginFormData) => {
    console.log(data)
    reset()
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
              <button type='submit' className='w-full mt-3 bg-orange/80 hover:bg-orange text-[#fff] py-2 px-4'>
                LOG IN
              </button>
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
