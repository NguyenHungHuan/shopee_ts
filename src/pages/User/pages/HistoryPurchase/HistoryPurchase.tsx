import classNames from 'classnames'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import purchaseApi from '~/apis/purchaseApi'
import path from '~/constants/path'
import { purchasesStatus } from '~/constants/purchase'
import useQueryParams from '~/hooks/useQueryParams'
import useScrollTop from '~/hooks/useScrollTop'
import { purchasesStatusList } from '~/types/purchase.type'
import { formatPriceNumber, generateNameId } from '~/utils/utils'

export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || purchasesStatus.allProduct
  useScrollTop([status])

  const { data: purchaseData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as purchasesStatusList })
  })
  const purchase = purchaseData?.data.data

  return (
    <>
      <div className='sticky top-0 flex rounded-sm shadow-sm'>
        <Link
          to={{
            pathname: path.historyPurchase,
            search: createSearchParams({
              status: purchasesStatus.allProduct.toString()
            }).toString()
          }}
          className={classNames(
            'flex flex-1 items-center justify-center border-b-2  bg-white py-3 text-center hover:text-orange',
            {
              'border-b-orange text-orange': purchasesStatus.allProduct === status,
              'border-b-black/10 text-black': purchasesStatus.allProduct !== status
            }
          )}
        >
          All
        </Link>
        <Link
          to={{
            pathname: path.historyPurchase,
            search: createSearchParams({
              status: purchasesStatus.waitForConfirmation.toString()
            }).toString()
          }}
          className={classNames(
            'flex flex-1 items-center justify-center border-b-2  bg-white py-3 text-center hover:text-orange',
            {
              'border-b-orange text-orange': purchasesStatus.waitForConfirmation === status,
              'border-b-black/10 text-black': purchasesStatus.waitForConfirmation !== status
            }
          )}
        >
          To Pay
        </Link>
        <Link
          to={{
            pathname: path.historyPurchase,
            search: createSearchParams({
              status: purchasesStatus.waitForGetting.toString()
            }).toString()
          }}
          className={classNames(
            'flex flex-1 items-center justify-center border-b-2  bg-white py-3 text-center hover:text-orange',
            {
              'border-b-orange text-orange': purchasesStatus.waitForGetting === status,
              'border-b-black/10 text-black': purchasesStatus.waitForGetting !== status
            }
          )}
        >
          To Ship
        </Link>
        <Link
          to={{
            pathname: path.historyPurchase,
            search: createSearchParams({
              status: purchasesStatus.inProgress.toString()
            }).toString()
          }}
          className={classNames(
            'flex flex-1 items-center justify-center border-b-2  bg-white py-3 text-center hover:text-orange',
            {
              'border-b-orange text-orange': purchasesStatus.inProgress === status,
              'border-b-black/10 text-black': purchasesStatus.inProgress !== status
            }
          )}
        >
          To Receive
        </Link>
        <Link
          to={{
            pathname: path.historyPurchase,
            search: createSearchParams({
              status: purchasesStatus.delivered.toString()
            }).toString()
          }}
          className={classNames(
            'flex flex-1 items-center justify-center border-b-2  bg-white py-3 text-center hover:text-orange',
            {
              'border-b-orange text-orange': purchasesStatus.delivered === status,
              'border-b-black/10 text-black': purchasesStatus.delivered !== status
            }
          )}
        >
          Completed
        </Link>
        <Link
          to={{
            pathname: path.historyPurchase,
            search: createSearchParams({
              status: purchasesStatus.canceled.toString()
            }).toString()
          }}
          className={classNames(
            'flex flex-1 items-center justify-center border-b-2  bg-white py-3 text-center hover:text-orange',
            {
              'border-b-orange text-orange': purchasesStatus.canceled === status,
              'border-b-black/10 text-black': purchasesStatus.canceled !== status
            }
          )}
        >
          Cancelled
        </Link>
      </div>
      {purchase &&
        purchase.map((purchase) => (
          <div
            key={purchase._id}
            className='mt-4 rounded-sm border-black/10 bg-white p-4 text-gray-800 shadow-sm'
          >
            <Link
              to={`${path.home}${generateNameId(purchase.product.name, purchase.product._id)}`}
              className='flex'
            >
              <div className='flex-shrink-0'>
                <img
                  className='h-20 w-20 object-cover'
                  src={purchase.product.image}
                  alt={purchase.product.name}
                />
              </div>
              <div className='ml-3 flex-grow overflow-hidden'>
                <div className='truncate'>{purchase.product.name}</div>
                <div className='mt-3'>x{purchase.buy_count}</div>
              </div>
              <div className='ml-3 flex-shrink-0'>
                <span className='truncate text-gray-500 line-through'>
                  ₫{formatPriceNumber(purchase.product.price_before_discount)}
                </span>
                <span className='ml-2 truncate text-orange'>
                  ₫{formatPriceNumber(purchase.product.price)}
                </span>
              </div>
            </Link>
            <div className='flex justify-end'>
              <div className='text-sm'>
                <span>Order Total:</span>
                <span className='ml-3 text-xl text-orange'>
                  ₫{formatPriceNumber(purchase.buy_count * purchase.product.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      {purchase && purchase.length <= 0 && (
        <div className='mt-4 flex h-[600px] flex-1 flex-col items-center justify-center bg-white text-lg text-[#0000008a] shadow'>
          <img
            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/5fafbb923393b712b96488590b8f781f.png'
            className='h-[100px] w-[100px]'
            alt='No orders yet'
          />
          <span className='mt-4'>No orders yet</span>
        </div>
      )}
    </>
  )
}
