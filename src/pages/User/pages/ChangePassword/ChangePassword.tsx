import React from 'react'

export default function ChangePassword() {
  return (
    <div className='px-[30px] py-[18px] bg-white shadow rounded-sm'>
      <div className='pb-[18px] border-b border-b-gray-200'>
        <h1 className='text-lg font-medium'>Change Password</h1>
        <div className='text-sm'>
          For your account&apos;s security, do not share your password with anyone else
        </div>
      </div>
      <form className='pt-[30px] flex text-sm'>
        <div className='flex-1 pr-[50px]'>
          <div className='flex items-center gap-5 pb-[15px]'>
            <label htmlFor='password' className='text-right min-w-[25%] text-gray-400'>
              Current Password
            </label>
            <input
              type='text'
              className='outline-none p-[9px] border border-gray-200 focus:border-gray-400 shadow-inner w-[360px]'
              id='password'
            />
          </div>
          <div className='flex items-center gap-5 pb-[15px]'>
            <label htmlFor='newPassword' className='text-right min-w-[25%] text-gray-400'>
              New Password
            </label>
            <input
              type='text'
              className='outline-none p-[9px] border border-gray-200 focus:border-gray-400 shadow-inner w-[360px]'
              id='newPassword'
            />
          </div>
          <div className='flex items-center gap-5 pb-[15px]'>
            <label htmlFor='confirmPassword' className='text-right min-w-[25%] text-gray-400'>
              Confirm Password
            </label>
            <input
              type='text'
              className='outline-none p-[9px] border border-gray-200 focus:border-gray-400 shadow-inner w-[360px]'
              id='confirmPassword'
            />
          </div>
          <div className='flex items-center gap-5 pb-16'>
            <div className='min-w-[25%]'></div>
            <button type='submit' className='bg-orange rounded-sm text-white py-[10px] px-5'>
              Confirm
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
