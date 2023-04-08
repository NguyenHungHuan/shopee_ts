import { Link } from 'react-router-dom'

export default function FilterPanel() {
  return (
    <div>
      <Link to='/' className='flex items-center gap-2 py-4 font-bold border-b border-b-gray-200'>
        <svg viewBox='0 0 12 10' className='fill-black w-[12px] h-[16px]'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span>All Categories</span>
      </Link>
      <Link to='/' className='flex items-center gap-2 py-2 pl-3 pr-[10px] text-[14px] font-bold text-orange'>
        <svg viewBox='0 0 4 7' className='fill-orange w-[4px] h-[7px]'>
          <polygon points='4 3.5 0 0 0 7' />
        </svg>
        Mobile
      </Link>
      <Link to='/' className='flex items-center gap-2 py-2 pl-3 pr-[10px] text-[14px] text-black'>
        Mobile
      </Link>
      <Link to='/' className='flex items-center gap-2 py-2 pl-3 pr-[10px] text-[14px] text-black'>
        Mobile
      </Link>
      <div className='mt-[30px] pb-[20px] border-b border-b-gray-300/60'>
        <div className='flex items-center gap-2 pb-[20px] font-bold'>
          <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className='stroke-black w-3 h-3'>
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          <span>SEARCH FILTER</span>
        </div>
        <div className='text-[14px] mb-2'>By category</div>
        <div className='py-2'>
          <input type='checkbox' className='cursor-pointer' id='iphone' />
          <label htmlFor='iphone' className='pl-2 cursor-pointer'>
            Iphone
          </label>
        </div>
        <div className='py-2'>
          <input type='checkbox' className='cursor-pointer' id='iphone' />
          <label htmlFor='iphone' className='pl-2 cursor-pointer'>
            Iphone
          </label>
        </div>
        <div className='py-2'>
          <input type='checkbox' className='cursor-pointer' id='iphone' />
          <label htmlFor='iphone' className='pl-2 cursor-pointer'>
            Iphone
          </label>
        </div>
      </div>
      <div className='py-[20px] border-b border-b-gray-300/60'>
        <div className='text-[14px] mb-4'>Price Range</div>
        <form noValidate>
          <div className='flex items-center justify-between'>
            <input
              type='text'
              placeholder='₫ MIN'
              className='w-[5rem] outline-none border border-gray-400 shadow-inner pl-[5px] py-1 text-[14px]'
            />
            <div className='flex-1 h-[1px] bg-[#bdbdbd] mx-2'></div>
            <input
              type='text'
              placeholder='₫ MAX'
              className='w-[5rem] outline-none border border-gray-400 shadow-inner pl-[5px] py-1 text-[14px]'
            />
          </div>
          <button
            type='submit'
            className='bg-orange text-sm w-full mt-5 py-1.5 px-8 text-white rounded-sm shadow-sm uppercase'
          >
            Apply
          </button>
        </form>
      </div>
      <div className='py-[20px] border-b border-b-gray-300/80'>
        <div className='text-[14px] mb-2'>Rating</div>
        {Array(5)
          .fill(0)
          .map((rating, index) => (
            <Link key={index} to='/' className='flex items-center gap-2 pt-2 pl-3.5 pr-[10px] text-[14px] text-black'>
              {Array(5)
                .fill(0)
                .map((star, index) => (
                  <svg key={index} viewBox='0 0 9.5 8' className='w-[14px] h-[14px]'>
                    <defs>
                      <linearGradient id='ratingStarGradient' x1='50%' x2='50%' y1='0%' y2='100%'>
                        <stop offset={0} stopColor='#ffca11' />
                        <stop offset={1} stopColor='#ffad27' />
                      </linearGradient>
                      <polygon
                        id='ratingStar'
                        points='14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903'
                      />
                    </defs>
                    <g fill='url(#ratingStarGradient)' fillRule='evenodd' stroke='none' strokeWidth={1}>
                      <g transform='translate(-876 -1270)'>
                        <g transform='translate(155 992)'>
                          <g transform='translate(600 29)'>
                            <g transform='translate(10 239)'>
                              <g transform='translate(101 10)'>
                                <use stroke='#ffa727' strokeWidth='.5' xlinkHref='#ratingStar' />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
              & Up
            </Link>
          ))}
      </div>
      <button
        type='submit'
        className='bg-orange w-full mt-4 py-1.5 px-8 text-white rounded-sm shadow-sm uppercase text-sm'
      >
        Clear all
      </button>
    </div>
  )
}
