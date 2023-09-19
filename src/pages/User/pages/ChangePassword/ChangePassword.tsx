import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import userApi from '~/apis/userApi'
import Input from '~/components/Input'
import useScrollTop from '~/hooks/useScrollTop'
import { errorResponse } from '~/types/utils.type'
import { UserSchema, userSchema } from '~/utils/rulesForm'
import { isAxiosErrorUnprocessableEntity } from '~/utils/utils'

type FormData = Pick<UserSchema, 'password' | 'confirm_password' | 'new_password'>
const passwordSchema = userSchema.pick(['password', 'confirm_password', 'new_password'])

export default function ChangePassword() {
  useScrollTop()
  const {
    register,
    setError,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      new_password: '',
      confirm_password: ''
    },
    resolver: yupResolver(passwordSchema)
  })

  const updatePasswordMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updatePasswordMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message, {
        autoClose: 2000,
        position: 'top-center',
        hideProgressBar: true
      })
      reset()
    } catch (error) {
      if (isAxiosErrorUnprocessableEntity<errorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData] as string,
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <>
      <Helmet>
        <title>Change Password | Shopee Clone</title>
        <meta name='description' content='Page change password Shopee Clone' />
      </Helmet>
      <div className='rounded-sm bg-white px-4 py-[18px] shadow sm:px-[30px]'>
        <div className='border-b border-b-gray-200 pb-[18px]'>
          <h1 className='text-lg font-medium'>Change Password</h1>
          <div className='text-sm'>
            For your account&apos;s security, do not share your password with anyone else
          </div>
        </div>
        <form onSubmit={onSubmit} className='flex pt-[30px] text-sm' noValidate>
          <div className='w-full flex-1 pr-0 sm:pr-[50px]'>
            <div className='flex flex-col gap-5 pb-[15px] sm:flex-row'>
              <label htmlFor='password' className='mt-2 min-w-[25%] text-gray-400 sm:text-right'>
                Current Password
              </label>
              <Input
                register={register}
                errorMessage={errors.password?.message}
                type='password'
                classNameInput='w-full sm:w-[360px] border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
                id='password'
                name='password'
                placeholder='Input your current password to verify'
              />
            </div>
            <div className='flex flex-col gap-5 pb-[15px] sm:flex-row'>
              <label htmlFor='new_password' className='mt-2 min-w-[25%] text-gray-400 sm:text-right'>
                New Password
              </label>
              <Input
                register={register}
                errorMessage={errors.new_password?.message}
                type='password'
                classNameInput='w-full sm:w-[360px] border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
                id='new_password'
                name='new_password'
                placeholder='Input your new password'
              />
            </div>
            <div className='flex flex-col gap-5 pb-[15px] sm:flex-row'>
              <label htmlFor='confirm_password' className='mt-2 min-w-[25%] text-gray-400 sm:text-right'>
                Confirm Password
              </label>
              <Input
                register={register}
                errorMessage={errors.confirm_password?.message}
                type='password'
                classNameInput='w-full sm:w-[360px] border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
                id='confirm_password'
                name='confirm_password'
                placeholder='Confirm your new password'
              />
            </div>
            <div className='flex items-center gap-5 pb-16'>
              <div className='hidden min-w-[25%] sm:block'></div>
              <button
                type='submit'
                className='w-full rounded-sm bg-orange px-5 py-[10px] text-white sm:w-auto'
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}
