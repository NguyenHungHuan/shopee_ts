import { Link } from 'react-router-dom'

export default function HistoryPurchase() {
  return (
    <>
      <div className='sticky top-0 flex rounded-sm shadow-sm'>
        <Link
          to='/'
          className='flex flex-1 items-center justify-center border-b-2 border-b-orange bg-white py-3 text-center text-orange hover:text-orange'
        >
          All
        </Link>
        <Link
          to='/'
          className='flex flex-1 items-center justify-center border-b-2 border-b-black/10 bg-white py-3 text-center text-gray-900 hover:text-orange'
        >
          To Pay
        </Link>
        <Link
          to='/'
          className='flex flex-1 items-center justify-center border-b-2 border-b-black/10 bg-white py-3 text-center text-gray-900 hover:text-orange'
        >
          To Ship
        </Link>
        <Link
          to='/'
          className='flex flex-1 items-center justify-center border-b-2 border-b-black/10 bg-white py-3 text-center text-gray-900 hover:text-orange'
        >
          To Receive
        </Link>
        <Link
          to='/'
          className='flex flex-1 items-center justify-center border-b-2 border-b-black/10 bg-white py-3 text-center text-gray-900 hover:text-orange'
        >
          Completed
        </Link>
        <Link
          to='/'
          className='flex flex-1 items-center justify-center border-b-2 border-b-black/10 bg-white py-2 text-center text-gray-900 hover:text-orange'
        >
          Cancelled
        </Link>
      </div>
      {Array(5)
        .fill(0)
        .map((purchase, index) => (
          <div key={index} className='mt-4 rounded-sm border-black/10 bg-white p-4 text-gray-800 shadow-sm'>
            <Link to='/' className='flex'>
              <div className='flex-shrink-0'>
                <img
                  className='h-20 w-20 object-cover'
                  src='https://images.unsplash.com/photo-1511556820780-d912e42b4980?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                  alt=''
                />
              </div>
              <div className='ml-3 flex-grow overflow-hidden'>
                <div className='truncate'>
                  Áo thun Polo nam cổ bẻ BASIC vải cá sấu Cotton xuất xịn, chuẩn đẹp, màu HỒNG
                </div>
                <div className='mt-3'>x3</div>
              </div>
              <div className='ml-3 flex-shrink-0'>
                <span className='truncate text-gray-500 line-through'>₫150.000</span>
                <span className='ml-2 truncate text-orange'>₫75.000</span>
              </div>
            </Link>
            <div className='flex justify-end'>
              <div className='text-sm'>
                <span>Order Total:</span>
                <span className='ml-3 text-xl text-orange'>₫225.000</span>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
