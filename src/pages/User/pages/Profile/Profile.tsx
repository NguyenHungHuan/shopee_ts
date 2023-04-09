export default function Profile() {
  return (
    <div className='px-[30px] py-[18px] bg-white shadow rounded-sm'>
      <div className='pb-[18px] border-b border-b-gray-200'>
        <h1 className='text-lg font-medium'>My Profile</h1>
        <div className='text-sm'>Manage and protect your account</div>
      </div>
      <form className='pt-[30px] flex text-sm'>
        <div className='flex-1 pr-[50px]'>
          <div className='flex items-center gap-5 pb-[30px]'>
            <span className='text-right min-w-[20%] text-gray-400'>Email</span>
            <span>nhhuaan@gmail.com</span>
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <label htmlFor='Name' className='text-right min-w-[20%] text-gray-400'>
              Name
            </label>
            <input
              type='text'
              className='outline-none p-[9px] border border-gray-200 focus:border-gray-400 shadow-inner flex-1'
              id='Name'
            />
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <label htmlFor='Phone' className='text-right min-w-[20%] text-gray-400'>
              Phone Number
            </label>
            <input
              type='text'
              className='outline-none p-[9px] border border-gray-200 focus:border-gray-400 shadow-inner flex-1'
              id='Phone'
            />
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <label htmlFor='Address' className='text-right min-w-[20%] text-gray-400'>
              Address
            </label>
            <input
              type='text'
              className='outline-none p-[9px] border border-gray-200 focus:border-gray-400 shadow-inner flex-1'
              id='Address'
            />
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <span className='text-right min-w-[20%] text-gray-400'>Date of birth</span>
            <div className='flex-1 flex items-center justify-between gap-2'>
              <select className='px-[15px] py-[10px] outline-none border rounded-sm w-full cursor-pointer hover:border-orange'>
                <option value='' disabled>
                  Day
                </option>
              </select>
              <select className='px-[15px] py-[10px] outline-none border rounded-sm w-full cursor-pointer hover:border-orange'>
                <option value='' disabled>
                  Month
                </option>
              </select>
              <select className='px-[15px] py-[10px] outline-none border rounded-sm w-full cursor-pointer hover:border-orange'>
                <option value='' disabled>
                  Year
                </option>
              </select>
            </div>
          </div>
          <div className='flex items-center gap-5 pb-[30px]'>
            <div className='min-w-[20%]'></div>
            <button type='submit' className='bg-orange rounded-sm text-white py-[10px] px-5'>
              Save
            </button>
          </div>
        </div>
        <div className='w-[280px] h-fit flex justify-center border-l border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <img
              className='w-[100px] h-[100px] object-cover rounded-full my-5'
              src='https://images.unsplash.com/photo-1680728841730-481c20899554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
              alt='avatar'
            />
            <input type='file' accept='.jpg,.jpeg,.png' hidden></input>
            <button type='button' className='border shadow-sm rounded-sm px-5 py-[10px] hover:bg-[#00000005]'>
              Select Image
            </button>
            <div className='text-gray-400 mt-3'>
              <div>File size: maximum 1 MB</div>
              <div>File extension: .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
