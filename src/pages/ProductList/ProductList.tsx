import { Link } from 'react-router-dom'
import FilterPanel from '~/components/FilterPanel'
import SortBar from '~/components/SortBar'

export default function ProductList() {
  return (
    <div className='pt-10 pb-[60px] bg-[#f5f5f5] border-b-4 border-b-orange'>
      <div className='container'>
        <div className='flex gap-5'>
          <div className='w-[190px]'>
            <FilterPanel />
          </div>
          <div className='flex-1'>
            <SortBar />
            <div className='grid grid-cols-5 gap-[10px] mt-4 px-[5px]'>
              {Array(20)
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
                        Ốp Điện Thoại Silicon Dày Chống Sốc 3 Trong 1 Cho iPhone 13 Pro Max 12 11 Pro Max X XS
                        Max XR 6 6s 7 8 Plus SE2020
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
      </div>
    </div>
  )
}
