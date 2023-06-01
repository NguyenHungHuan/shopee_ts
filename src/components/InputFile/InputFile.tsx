import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import config from '~/constants/config'

interface Props {
  onChange?: (file: File) => void
}

export default function InputFile({ onChange }: Props) {
  const {
    clearErrors,
    setError,
    formState: { errors }
  } = useFormContext()
  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleClickRef = () => {
    inputFileRef.current?.click()
  }

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileFormLocal = e.target.files?.[0]
    if (
      fileFormLocal &&
      (fileFormLocal.size >= config.maxSizeFileImgUploadAvatar || !fileFormLocal.type.includes('image'))
    ) {
      setError &&
        setError('root', {
          message: 'Please choose file maximum 1 MB and JPEG, .PNG',
          type: 'Server'
        })
    } else {
      clearErrors && clearErrors('root')
      onChange && onChange(fileFormLocal as File)
    }
  }
  return (
    <>
      <input
        onChange={handleChangeFile}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onClick={(e) => ((e.target as any).value = null)}
        ref={inputFileRef}
        type='file'
        accept='.jpg,.jpeg,.png'
        hidden
      ></input>
      <button
        onClick={handleClickRef}
        type='button'
        className='rounded-sm border px-5 py-[10px] shadow-sm hover:bg-[#00000005]'
      >
        Select Image
      </button>
      <div className='min-h-[1.5rem] pl-1 pt-1 text-center text-sm text-[#ff424f]'>
        {errors.root?.message}
      </div>
    </>
  )
}
