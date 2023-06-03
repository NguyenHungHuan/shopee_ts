import { yupResolver } from '@hookform/resolvers/yup'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useForm, Controller, FormProvider } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import userApi from '~/apis/userApi'
import Button from '~/components/Button'
import Input from '~/components/Input'
import InputNumber from '~/components/InputNumber'
import { UserSchema, userSchema } from '~/utils/rulesForm'
import DateSelect from '../../Components/DateSelect'
import { setProfileToLS } from '~/utils/auth'
import { AppContext } from '~/Contexts/app.context'
import { toast } from 'react-toastify'
import { getAvatarUrl, isAxiosErrorUnprocessableEntity } from '~/utils/utils'
import { errorResponse } from '~/types/utils.type'
import config from '~/constants/config'
import InputFile from '~/components/InputFile'
import useScrollTop from '~/hooks/useScrollTop'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
type FormDataError = Omit<FormData, 'date_of_birth'> & {
  date_of_birth?: string
}
const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])

export default function Profile() {
  useScrollTop()
  const [fileImg, setFileImg] = useState<File>()
  const { setProfile } = useContext(AppContext)
  const methods = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      date_of_birth: new Date(1990, 0, 1),
      avatar: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const updateAvatarProfileMutation = useMutation({
    mutationFn: userApi.updateAvatarProfile
  })

  const previewAvatar = useMemo(() => {
    return fileImg ? URL.createObjectURL(fileImg) : ''
  }, [fileImg])

  useEffect(() => {
    if (profile) {
      methods.setValue('name', profile.name || profile.email)
      methods.setValue('phone', profile.phone)
      methods.setValue('address', profile.address)
      methods.setValue(
        'date_of_birth',
        profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990, 0, 1)
      )
    }
  }, [profile, methods])

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      let avatarName = profile?.avatar
      if (fileImg) {
        const form = new FormData()
        form.append('image', fileImg)
        const uploadRes = await updateAvatarProfileMutation.mutateAsync(form)
        avatarName = uploadRes.data.data
        methods.setValue('avatar', avatarName)
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message, {
        autoClose: 2000,
        hideProgressBar: true,
        position: 'top-center'
      })
    } catch (error) {
      if (isAxiosErrorUnprocessableEntity<errorResponse<FormDataError>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            methods.setError(key as keyof FormDataError, {
              message: formError[key as keyof FormDataError],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  const handleChangeInputFile = (file: File) => {
    setFileImg(file)
  }

  return (
    <div className='rounded-sm bg-white px-[30px] py-[18px] shadow'>
      <div className='border-b border-b-gray-200 pb-[18px]'>
        <h1 className='text-lg font-medium'>My Profile</h1>
        <div className='text-sm'>Manage and protect your account</div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className='flex pt-[30px] text-sm' noValidate>
          <div className='flex-1 pr-[50px]'>
            <div className='flex items-center gap-5 pb-[40px]'>
              <span className='min-w-[20%] text-right text-gray-400'>Email</span>
              <span>{profile?.email}</span>
            </div>
            <div className='flex gap-5 pb-[20px]'>
              <label htmlFor='name' className='mt-2 min-w-[20%] text-right text-gray-400'>
                Name
              </label>
              <Input
                id='name'
                classNameError='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'
                className='flex-1'
                classNameInput='w-full flex-1 border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
                name='name'
                register={methods.register}
                errorMessage={methods.formState.errors.name?.message}
              />
            </div>
            <div className='flex gap-5 pb-[20px]'>
              <label htmlFor='phone' className='mt-2 min-w-[20%] text-right text-gray-400'>
                Phone Number
              </label>
              <Controller
                name='phone'
                control={methods.control}
                render={({ field }) => (
                  <InputNumber
                    id='phone'
                    classNameError='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'
                    className='flex-1'
                    classNameInput='w-full flex-1 border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
                    errorMessage={methods.formState.errors.phone?.message}
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div className='flex gap-5 pb-[20px]'>
              <label htmlFor='address' className='mt-2 min-w-[20%] text-right text-gray-400'>
                Address
              </label>
              <Input
                id='address'
                classNameError='text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1'
                className='flex-1'
                classNameInput='w-full flex-1 border border-gray-200 p-[9px] shadow-inner outline-none focus:border-gray-400'
                name='address'
                register={methods.register}
                errorMessage={methods.formState.errors.address?.message}
              />
            </div>
            <Controller
              name='date_of_birth'
              control={methods.control}
              render={({ field }) => (
                <DateSelect
                  errorMessage={methods.formState.errors.date_of_birth?.message}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            <div className='flex items-center gap-5 pb-[30px]'>
              <div className='min-w-[20%]'></div>
              <Button
                type='submit'
                className='rounded-sm bg-orange px-5 py-[10px] text-white hover:opacity-90'
              >
                Save
              </Button>
            </div>
          </div>
          <div className='flex h-fit w-[280px] justify-center border-l border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <img
                className='my-5 h-[100px] w-[100px] rounded-full object-cover'
                src={previewAvatar || getAvatarUrl(profile?.avatar as string)}
                alt='avatar'
              />
              <InputFile onChange={handleChangeInputFile} />
              <div className='mt-3 text-gray-400'>
                <div>File size: maximum 1 MB</div>
                <div>File extension: .JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
