import { useContext } from 'react'
import { useQuery } from 'react-query'
import { Link, useMatch } from 'react-router-dom'
import purchaseApi from '~/apis/purchaseApi'
import path from '~/constants/path'
import { purchasesStatus } from '~/constants/purchase'
import { formatPriceNumber } from '~/utils/utils'
import noProduct from '../../assets/images/noProduct.png'
import { AppContext } from '../../Contexts/app.context'
import NavHeader from '../NavHeader'
import Popover from '../Popover'
import useSearchProducts from '~/hooks/useSearchProducts'

const MAX_PURCHASE = 5

export default function Header() {
  const isPurchaseRouteMatch = useMatch(path.user)
  const classNameHeader = isPurchaseRouteMatch ? '' : 'sticky inset-0 z-10'
  const { isAuthenticated } = useContext(AppContext)
  const { onSubmit, register } = useSearchProducts()

  const { data } = useQuery({
    queryKey: ['purchaseList', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated
  })

  const purchaseInCartData = data?.data.data

  return (
    <header className={classNameHeader}>
      <NavHeader />
      <div className='w-full bg-orange'>
        <div className='container flex h-[5.3125rem] items-center justify-between py-4'>
          <Link title='Home' to='/' className='flex items-end gap-2 pr-2 md:pr-10'>
            <svg viewBox='0 0 51 65' className='h-[50px] w-auto fill-white'>
              <g fillRule='evenodd'>
                <path d='M35.6717403 44.953764c-.3333497 2.7510509-2.0003116 4.9543414-4.5823845 6.0575984-1.4379707.6145919-3.36871.9463856-4.896954.8421628-2.3840266-.0911143-4.6237865-.6708937-6.6883352-1.7307424-.7375522-.3788551-1.8370513-1.1352759-2.6813095-1.8437757-.213839-.1790053-.239235-.2937577-.0977428-.4944671.0764015-.1151823.2172535-.3229831.5286218-.7791994.45158-.6616533.5079208-.7446018.5587128-.8221779.14448-.2217688.3792333-.2411091.6107855-.0588804.0243289.0189105.0243289.0189105.0426824.0333083.0379873.0294402.0379873.0294402.1276204.0990653.0907002.0706996.14448.1123887.166248.1287205 2.2265285 1.7438508 4.8196989 2.7495466 7.4376251 2.8501162 3.6423042-.0496401 6.2615109-1.6873341 6.7308041-4.2020035.5160305-2.7675977-1.6565047-5.1582742-5.9070334-6.4908212-1.329344-.4166762-4.6895175-1.7616869-5.3090528-2.1250697-2.9094471-1.7071043-4.2697358-3.9430584-4.0763845-6.7048539.296216-3.8283059 3.8501677-6.6835796 8.340785-6.702705 2.0082079-.004083 4.0121475.4132378 5.937338 1.2244562.6816382.2873109 1.8987274.9496089 2.3189359 1.2633517.2420093.1777159.2898136.384872.1510957.60836-.0774686.12958-.2055158.3350171-.4754821.7632974l-.0029878.0047276c-.3553311.5640922-.3664286.5817134-.447952.7136572-.140852.2144625-.3064598.2344475-.5604202.0732783-2.0600669-1.3839063-4.3437898-2.0801572-6.8554368-2.130442-3.126914.061889-5.4706057 1.9228561-5.6246892 4.4579402-.0409751 2.2896772 1.676352 3.9613243 5.3858811 5.2358503 7.529819 2.4196871 10.4113092 5.25648 9.869029 9.7292478M26.3725216 5.42669372c4.9022893 0 8.8982174 4.65220288 9.0851664 10.47578358H17.2875686c.186949-5.8235807 4.1828771-10.47578358 9.084953-10.47578358m25.370857 11.57065968c0-.6047069-.4870064-1.0948761-1.0875481-1.0948761h-11.77736c-.28896-7.68927544-5.7774923-13.82058185-12.5059489-13.82058185-6.7282432 0-12.2167755 6.13130641-12.5057355 13.82058185l-11.79421958.0002149c-.59136492.0107446-1.06748731.4968309-1.06748731 1.0946612 0 .0285807.00106706.0569465.00320118.0848825H.99995732l1.6812605 37.0613963c.00021341.1031483.00405483.2071562.01173767.3118087.00170729.0236381.003628.0470614.00554871.0704847l.00362801.0782207.00405483.004083c.25545428 2.5789222 2.12707837 4.6560709 4.67201764 4.7519129l.00576212.0055872h37.4122078c.0177132.0002149.0354264.0004298.0531396.0004298.0177132 0 .0354264-.0002149.0531396-.0004298h.0796027l.0017073-.0015043c2.589329-.0706995 4.6867431-2.1768587 4.9082648-4.787585l.0012805-.0012893.0017073-.0350275c.0021341-.0275062.0040548-.0547975.0057621-.0823037.0040548-.065757.0068292-.1312992.0078963-.1964115l1.8344904-37.207738h-.0012805c.001067-.0186956.0014939-.0376062.0014939-.0565167M176.465457 41.1518926c.720839-2.3512494 2.900423-3.9186779 5.443734-3.9186779' />
              </g>
            </svg>
            <h1 className='hidden text-4xl text-white md:inline-block'>Shopee</h1>
          </Link>
          <form
            className='flex w-full items-center justify-between rounded-sm bg-white p-[3px] shadow'
            noValidate
            onSubmit={onSubmit}
          >
            <input
              placeholder='Searching....'
              type='text'
              className='mr-2 w-full px-4 py-1 outline-none'
              {...register('name')}
            />
            <button
              type='submit'
              className='cursor-pointer rounded-sm bg-orange px-6 py-[10px] outline-none hover:bg-[#f05d40]'
            >
              <svg height={14} viewBox='0 0 19 19' width={14} className='fill-white'>
                <g fillRule='evenodd' stroke='none' strokeWidth={1}>
                  <g transform='translate(-1016 -32)'>
                    <g>
                      <g transform='translate(405 21)'>
                        <g transform='translate(611 11)'>
                          <path d='m8 16c4.418278 0 8-3.581722 8-8s-3.581722-8-8-8-8 3.581722-8 8 3.581722 8 8 8zm0-2c-3.3137085 0-6-2.6862915-6-6s2.6862915-6 6-6 6 2.6862915 6 6-2.6862915 6-6 6z' />
                          <path d='m12.2972351 13.7114222 4.9799555 4.919354c.3929077.3881263 1.0260608.3842503 1.4141871-.0086574.3881263-.3929076.3842503-1.0260607-.0086574-1.414187l-4.9799554-4.919354c-.3929077-.3881263-1.0260608-.3842503-1.4141871.0086573-.3881263.3929077-.3842503 1.0260608.0086573 1.4141871z' />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </button>
          </form>
          <div className='mx-0 flex items-center justify-center md:mx-10'>
            <Popover
              renderPopover={
                <div className='w-[25rem] rounded-sm border border-t-0 bg-white text-sm shadow-sm'>
                  {purchaseInCartData ? (
                    <div>
                      <span className='block p-[10px] capitalize text-gray-400'>recently added products</span>
                      {purchaseInCartData.slice(0, MAX_PURCHASE).map((purchase) => (
                        <div key={purchase._id} className='flex items-start gap-2 p-[10px] hover:bg-gray-100'>
                          <img
                            className='h-[42px] w-[42px] flex-shrink-0 object-cover'
                            src={purchase.product.image}
                            alt={purchase.product.name}
                          />
                          <div className='line-clamp-1 text-black'>{purchase.product.name}</div>
                          <div className='ml-8 text-orange'>₫{formatPriceNumber(purchase.product.price)}</div>
                        </div>
                      ))}
                      <div className='flex items-center justify-between p-[10px]'>
                        <div className='text-black'>
                          {purchaseInCartData.length > MAX_PURCHASE
                            ? purchaseInCartData.length - MAX_PURCHASE
                            : ''}{' '}
                          More Products In Cart
                        </div>
                        <Link
                          title='View My Shopping Cart'
                          className='bg-orange px-[15px] py-[7px] capitalize text-white'
                          to={path.cart}
                        >
                          View My Shopping Cart
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='w-[25rem]'>
                      <div className='flex flex-col items-center justify-center py-[3.75rem]'>
                        <img src={noProduct} alt='No Purchase' className='h-[100px] w-[100px] object-cover' />
                        <div className='mt-5 capitalize'>no products yet</div>
                      </div>
                    </div>
                  )}
                </div>
              }
            >
              <Link title='View My Shopping Cart' className='relative block px-2 py-4 md:px-6' to={path.cart}>
                <svg viewBox='0 0 26.6 25.6' className='h-[26px] w-auto fill-white stroke-white'>
                  <polyline
                    fill='none'
                    points='2 1.7 5.5 1.7 9.6 18.3 21.2 18.3 24.6 6.1 7 6.1'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                    strokeWidth='2.5'
                  />
                  <circle cx='10.7' cy={23} r='2.2' stroke='none' />
                  <circle cx='19.7' cy={23} r='2.2' stroke='none' />
                </svg>
                {Number(purchaseInCartData?.length) > 0 ? (
                  <span className='absolute right-2 top-2 rounded-full bg-white px-[6px] text-sm text-orange'>
                    {purchaseInCartData?.length}
                  </span>
                ) : null}
              </Link>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  )
}
