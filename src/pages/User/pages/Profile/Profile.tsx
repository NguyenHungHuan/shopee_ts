import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useQuery } from 'react-query'
import userApi from '~/apis/userApi'
import Button from '~/components/Button'
import Input from '~/components/Input'
import InputNumber from '~/components/InputNumber'
import { UserSchema, userSchema } from '~/utils/rulesForm'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data
  console.log(profile)

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name || profile.email)
      setValue('phone', profile.phone)
      setValue('address', profile.address)
      setValue(
        'date_of_birth',
        profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1)
      )
    }
  }, [profile, setValue])

  return (
    <div className='rounded-sm bg-white px-[30px] py-[18px] shadow'>
      <div className='border-b border-b-gray-200 pb-[18px]'>
        <h1 className='text-lg font-medium'>My Profile</h1>
        <div className='text-sm'>Manage and protect your account</div>
      </div>
      <form className='flex pt-[30px] text-sm' noValidate>
        <div className='flex-1 pr-[50px]'>
          <div className='flex items-center gap-5 pb-[30px]'>
            <span className='min-w-[20%] text-right text-gray-400'>Email</span>
            <span>{profile?.email}</span>
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <label htmlFor='name' className='min-w-[20%] text-right text-gray-400'>
              Name
            </label>
            <Input
              id='name'
              classNameError='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'
              className='flex flex-1'
              classNameInput='flex-1 border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
              name='name'
              register={register}
              errorMessage={errors.name?.message}
            />
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <label htmlFor='phone' className='min-w-[20%] text-right text-gray-400'>
              Phone Number
            </label>
            <Controller
              name='phone'
              control={control}
              render={({ field }) => (
                <InputNumber
                  id='phone'
                  classNameError='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'
                  className='flex flex-1'
                  classNameInput='flex-1 border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
                  errorMessage={errors.phone?.message}
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <label htmlFor='address' className='min-w-[20%] text-right text-gray-400'>
              Address
            </label>
            <Input
              id='address'
              classNameError='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'
              className='flex flex-1'
              classNameInput='flex-1 border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
              name='address'
              register={register}
              errorMessage={errors.address?.message}
            />
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <span className='min-w-[20%] text-right text-gray-400'>Date of birth</span>
            <div className='flex flex-1 items-center justify-between gap-2'>
              <select className='w-full cursor-pointer rounded-sm border px-[15px] py-[10px] outline-none hover:border-orange'>
                <option value='' disabled>
                  Day
                </option>
              </select>
              <select className='w-full cursor-pointer rounded-sm border px-[15px] py-[10px] outline-none hover:border-orange'>
                <option value='' disabled>
                  Month
                </option>
              </select>
              <select className='w-full cursor-pointer rounded-sm border px-[15px] py-[10px] outline-none hover:border-orange'>
                <option value='' disabled>
                  Year
                </option>
              </select>
            </div>
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <div className='min-w-[20%]'></div>
            <Button type='submit' className='rounded-sm bg-orange px-5 py-[10px] text-white hover:opacity-90'>
              Save
            </Button>
          </div>
        </div>
        <div className='flex h-fit w-[280px] justify-center border-l border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <img
              className='my-5 h-[100px] w-[100px] rounded-full object-cover'
              src='https://images.unsplash.com/photo-1680728841730-481c20899554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
              alt='avatar'
            />
            <input type='file' accept='.jpg,.jpeg,.png' hidden></input>
            <button type='button' className='rounded-sm border px-5 py-[10px] shadow-sm hover:bg-[#00000005]'>
              Select Image
            </button>
            <div className='mt-3 text-gray-400'>
              <div>File size: maximum 1 MB</div>
              <div>File extension: .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
