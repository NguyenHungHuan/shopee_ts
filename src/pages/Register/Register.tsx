import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <div className='bg-orange'>
      <div className='min-w-[1200px] w-[1200px] mx-auto px-20'>
        <div className='grid grid-cols-5 py-[80px]'>
          <div className='col-start-4 col-span-2'>
            <form className='w-[400px] min-h-[462px] p-[30px] bg-[#fff] shadow-lg rounded' noValidate>
              <div className='text-[20px]'>Register</div>
              <div className='mt-8'>
                <input
                  type='text'
                  placeholder='Phone number / Username / Email'
                  className='w-full outline-none border px-4 py-2 border-[#00000024] rounded-sm'
                  name='email'
                />
                <div className='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  placeholder='Password'
                  className='w-full outline-none border px-4 py-2 border-[#00000024] rounded-sm'
                  name='password'
                />
                <div className='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'></div>
              </div>
              <div className='mt-3'>
                <input
                  type='password'
                  placeholder='Confirm your password'
                  className='w-full outline-none border px-4 py-2 border-[#00000024] rounded-sm'
                  name='confirm_password'
                />
                <div className='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'></div>
              </div>
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
                <Link className='text-orange text-sm' to='/'>
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
