import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
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
    <div className='rounded-sm bg-white px-[30px] py-[18px] shadow'>
      <div className='border-b border-b-gray-200 pb-[18px]'>
        <h1 className='text-lg font-medium'>Change Password</h1>
        <div className='text-sm'>
          For your account&apos;s security, do not share your password with anyone else
        </div>
      </div>
      <form onSubmit={onSubmit} className='flex pt-[30px] text-sm' noValidate>
        <div className='flex-1 pr-[50px]'>
          <div className='flex gap-5 pb-[15px]'>
            <label htmlFor='password' className='mt-2 min-w-[25%] text-right text-gray-400'>
              Current Password
            </label>
            <Input
              register={register}
              errorMessage={errors.password?.message}
              type='password'
              classNameInput='w-[360px] border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
              id='password'
              name='password'
              placeholder='Input your current password to verify'
            />
          </div>
          <div className='flex gap-5 pb-[15px]'>
            <label htmlFor='new_password' className='mt-2 min-w-[25%] text-right text-gray-400'>
              New Password
            </label>
            <Input
              register={register}
              errorMessage={errors.new_password?.message}
              type='password'
              classNameInput='w-[360px] border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
              id='new_password'
              name='new_password'
              placeholder='Input your new password'
            />
          </div>
          <div className='flex gap-5 pb-[15px]'>
            <label htmlFor='confirm_password' className='mt-2 min-w-[25%] text-right text-gray-400'>
              Confirm Password
            </label>
            <Input
              register={register}
              errorMessage={errors.confirm_password?.message}
              type='password'
              classNameInput='w-[360px] border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
              id='confirm_password'
              name='confirm_password'
              placeholder='Confirm your new password'
            />
          </div>
          <div className='flex items-center gap-5 pb-16'>
            <div className='min-w-[25%]'></div>
            <button type='submit' className='rounded-sm bg-orange px-5 py-[10px] text-white'>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
