import { Link } from 'react-router-dom'

export default function Cart() {
  return (
    <div className='pt-10 pb-[60px] bg-[#f5f5f5] border-b-4 border-b-orange'>
      <div className='container'>
        <div className='bg-white px-10 py-4 rounded-[3px] shadow-sm grid grid-cols-12'>
          <div className='col-span-6 flex items-center'>
            <div className='flex items-center'>
              <input id='CheckedAllProduct' type='checkbox' className='h-[18px] w-[18px] accent-orange' />
              <label htmlFor='CheckedAllProduct' className='text-sm px-[20px]'>
                Product
              </label>
            </div>
          </div>
          <div className='col-span-6 flex items-center'>
            <div className='grid grid-cols-6 flex-1 text-sm text-gray-500/90'>
              <div className='col-span-2 text-center'>Unit Price</div>
              <div className='col-span-2 text-center'>Quantity</div>
              <div className='col-span-1 text-center'>Total Price</div>
              <div className='col-span-1 text-center'>Actions</div>
            </div>
          </div>
        </div>
        {Array(5)
          .fill(0)
          .map((purchase, index) => (
            <div key={index} className='bg-white mt-[15px] px-5 py-4 rounded-[3px] shadow-sm'>
              <div className='grid grid-cols-12 py-[16px] px-5 border gap-4'>
                <div className='col-span-6 flex items-center'>
                  <div className='flex items-center gap-5'>
                    <input
                      id='CheckedAllProduct'
                      type='checkbox'
                      className='h-[18px] w-[18px] accent-orange flex-shrink-0'
                    />
                    <Link to='/' className='flex items-start gap-[10px]'>
                      <img
                        className='w-20 h-20 object-cover'
                        src='https://down-vn.img.susercontent.com/file/sg-11134201-7qvfx-lf51wtzwvt6e3d'
                        alt=''
                      />
                      <span className='text-sm text-black line-clamp-2 pt-[5px]'>
                        Ốp Điện Thoại Silicon Mềm Chống Sốc 3 Trong 1 Cho IPhone 14 13 12 11 Pro Max X XR 8 7 Plus
                      </span>
                    </Link>
                  </div>
                </div>
                <div className='col-span-6 flex items-center'>
                  <div className='grid grid-cols-6 flex-1 text-sm text-gray-500/90'>
                    <div className='col-span-2'>
                      <div className='flex items-center justify-center gap-[10px] text-sm'>
                        <span className='text-gray-400 line-through'>₫2.190.000</span>
                        <span className='text-black'>₫1.850.000</span>
                      </div>
                    </div>
                    <div className='col-span-2 flex justify-center'>
                      <div className='flex items-center shadow-sm rounded-sm overflow-hidden'>
                        <button className='p-[10px] border'>
                          <svg
                            enableBackground='new 0 0 10 10'
                            viewBox='0 0 10 10'
                            x={0}
                            y={0}
                            className='w-[10px] h-[10px] fill-gray-500'
                          >
                            <polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5' />
                          </svg>
                        </button>
                        <input
                          type='text'
                          defaultValue={1}
                          className='w-[50px] h-8 outline-none text-base border-y text-center'
                        />
                        <button className='p-[10px] border'>
                          <svg
                            enableBackground='new 0 0 10 10'
                            viewBox='0 0 10 10'
                            x={0}
                            y={0}
                            className='w-[10px] h-[10px] fill-gray-500'
                          >
                            <polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5' />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className='col-span-1 text-center text-sm text-orange'>₫1.850.000</div>
                    <div className='col-span-1 text-center'>
                      <button className='outline-none text-black hover:text-orange'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className='sticky bottom-0 bg-white mt-[15px] px-5 py-4 rounded-[3px] shadow-sm border'>
          <div className='flex items-center justify-between text-base'>
            <div className='flex items-center'>
              <input id='selectAllProduct' type='checkbox' className='h-[18px] w-[18px] accent-orange' />
              <label htmlFor='selectAllProduct' className='px-[20px] cursor-pointer'>
                Select All (2)
              </label>
              <button className='outline-none px-1'>Delete</button>
            </div>
            <div className='flex items-center gap-[15px]'>
              <div className=''>
                <div className='flex items-center gap-[5px]'>
                  <span>Total (1 item):</span>
                  <span className='text-orange text-2xl leading-4'>₫375.000</span>
                </div>
                <div className='flex items-center gap-[24px] text-sm justify-end'>
                  <span>Saved</span>
                  <span className='text-orange'>₫340k</span>
                </div>
              </div>
              <button className='bg-orange hover:bg-[#f05d40] py-[10px] px-[36px] mr-[2px] rounded-sm w-[210px] text-white text-sm capitalize'>
                check out
              </button>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between mt-9'>
          <div className='text-gray-500 uppercase text-base'>YOU MAY ALSO LIKE</div>
          <Link to='/' className='flex items-center gap-1 p-1 text-orange text-sm'>
            <span>See All</span>
            <svg
              enableBackground='new 0 0 11 11'
              viewBox='0 0 11 11'
              x={0}
              y={0}
              className='fill-orange w-[10px] h-[10px]'
            >
              <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
            </svg>
          </Link>
        </div>
        <div className='grid grid-cols-6 gap-3 mt-5'>
          {Array(12)
            .fill(0)
            .map((product, index) => (
              <Link
                key={index}
                to='/'
                className='transition col-span-1 h-full bg-white rounded-sm shadow hover:shadow-[0_0.0625rem_20px_0_rgba(0,0,0,.05)] hover:translate-y-[-.0625rem] overflow-hidden'
              >
                <div className='relative pt-[100%] w-full'>
                  <img
                    className='absolute top-0 left-0 w-full h-full object-cover'
                    src='https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                    alt=''
                  />
                </div>
                <div className='p-2'>
                  <div className='text-xs line-clamp-2'>
                    Ốp Điện Thoại Silicon Dày Chống Sốc 3 Trong 1 Cho iPhone 13 Pro Max 12 11 Pro Max X XS Max XR 6 6s 7
                    8 Plus SE2020
                  </div>
                  <div className='flex items-center gap-1 mt-2'>
                    <div className='flex items-end text-gray-400 line-through text-sm'>
                      <span>₫</span>
                      <span>54.000</span>
                    </div>
                    <div className='flex items-center text-orange'>
                      <span className='text-xs'>₫</span>
                      <span className='text-base'>27.000</span>
                    </div>
                  </div>
                  <div className='flex items-center mt-3 mb-1 gap-1'>
                    <div className='flex items-center gap-[1px]'>
                      {Array(5)
                        .fill(0)
                        .map((star, index) => (
                          <svg
                            key={index}
                            enableBackground='new 0 0 15 15'
                            viewBox='0 0 15 15'
                            x={0}
                            y={0}
                            className='w-[10px] h-[10px] fill-[#ffce3d]'
                          >
                            <polygon
                              points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeMiterlimit={10}
                            />
                          </svg>
                        ))}
                    </div>
                    <span className='text-xs uppercase'>11.4k sold</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
