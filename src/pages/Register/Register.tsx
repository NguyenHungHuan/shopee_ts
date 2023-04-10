import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '~/components/Input'
import { FormData, schema } from '~/utils/rulesForm'
import { yupResolver } from '@hookform/resolvers/yup'

const Register = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit((data: FormData) => {
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
              className='w-[400px] min-h-[462px] p-[30px] bg-[#fff] shadow-lg rounded'
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
              <button type='submit' className='w-full mt-3 bg-orange/80 hover:bg-orange text-[#fff] py-2 px-4'>
                SIGN UP
              </button>
              <div className='flex items-center mt-8'>
                <div className='flex-1 w-full h-[1px] bg-[#ccc]'></div>
                <div className='text-xs text-[#ccc] px-4'>OR</div>
                <div className='flex-1 w-full h-[1px] bg-[#ccc]'></div>
              </div>
              <div className='text-center mt-6 text-xs px-8'>
                <span className=''>By signing up, you agree to Shopee&apos;s </span>
                <Link className='text-orange' to='/'>
                  Terms of Service
                </Link>
                <span className='text-xs'> & </span>
                <Link className='text-orange' to='/'>
                  Private Policy
                </Link>
              </div>
              <div className='flex items-center justify-center gap-2 mt-6'>
                <div className='text-[#ccc] text-sm'>New to Shopee? </div>
                <Link className='text-orange text-sm' to='/login'>
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
