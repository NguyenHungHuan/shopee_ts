import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import productsApi from '~/apis/productApi'
import purchaseApi from '~/apis/purchaseApi'
import QuantityController from '~/components/QuantityController'
import RatingStar from '~/components/RatingStar'
import path from '~/constants/path'
import { queryParamsDefault } from '~/constants/product'
import { purchasesStatus } from '~/constants/purchase'
import { formatPriceNumber, formatSocialNumber, generateNameId } from '~/utils/utils'

export default function Cart() {
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchase', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchaseInCart = purchaseInCartData?.data.data

  const categoryId = purchaseInCart && purchaseInCart[0].product.category._id
  const queryConfig = {
    page: queryParamsDefault.page,
    limit: queryParamsDefault.limit,
    category: categoryId || ''
  }
  const { data: productCategoryData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productsApi.getProducts(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(purchaseInCart)
  })
  const productCategory = productCategoryData?.data.data.products

  return (
    <div className='border-b-4 border-b-orange bg-[#f5f5f5] pb-[60px] pt-10'>
      <div className='container'>
        <div className='grid grid-cols-12 rounded-[3px] bg-white px-10 py-4 shadow-sm'>
          <div className='col-span-6 flex items-center'>
            <div className='flex items-center'>
              <input id='CheckedAllProduct' type='checkbox' className='h-[18px] w-[18px] accent-orange' />
              <label htmlFor='CheckedAllProduct' className='px-[20px] text-sm'>
                Product
              </label>
            </div>
          </div>
          <div className='col-span-6 flex items-center'>
            <div className='grid flex-1 grid-cols-6 text-sm text-gray-500/90'>
              <div className='col-span-2 text-center'>Unit Price</div>
              <div className='col-span-2 text-center'>Quantity</div>
              <div className='col-span-1 text-center'>Total Price</div>
              <div className='col-span-1 text-center'>Actions</div>
            </div>
          </div>
        </div>
        {purchaseInCart &&
          purchaseInCart.map((purchase) => (
            <div key={purchase._id} className='mt-[15px] rounded-[3px] bg-white px-5 py-4 shadow-sm'>
              <div className='grid grid-cols-12 gap-4 border px-5 py-[16px]'>
                <div className='col-span-6 flex items-center'>
                  <div className='flex items-center gap-5'>
                    <input
                      id='CheckedAllProduct'
                      type='checkbox'
                      className='h-[18px] w-[18px] flex-shrink-0 accent-orange'
                    />
                    <Link
                      to={`${path.home}${generateNameId(purchase.product.name, purchase.product._id)}`}
                      className='flex items-start gap-[10px]'
                    >
                      <img
                        className='h-20 w-20 object-cover'
                        src={purchase.product.image}
                        alt={purchase.product.name}
                      />
                      <span className='line-clamp-2 pt-[5px] text-sm text-black'>
                        {purchase.product.name}
                      </span>
                    </Link>
                  </div>
                </div>
                <div className='col-span-6 flex items-center'>
                  <div className='grid flex-1 grid-cols-6 text-sm text-gray-500/90'>
                    <div className='col-span-2'>
                      <div className='flex items-center justify-center gap-[10px] text-sm'>
                        <span className='text-gray-400 line-through'>
                          ₫{formatPriceNumber(purchase.price_before_discount)}
                        </span>
                        <span className='text-black'>₫{formatPriceNumber(purchase.price)}</span>
                      </div>
                    </div>
                    <div className='col-span-2 flex justify-center'>
                      <div className='flex items-center overflow-hidden rounded-sm shadow-sm'>
                        <QuantityController value={purchase.buy_count} max={purchase.product.quantity} />
                      </div>
                    </div>
                    <div className='col-span-1 text-center text-sm text-orange'>
                      ₫{formatPriceNumber(purchase.price * purchase.buy_count)}
                    </div>
                    <div className='col-span-1 text-center'>
                      <button className='text-black outline-none hover:text-orange'>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        <div className='sticky bottom-0 mt-[15px] rounded-[3px] border bg-white px-5 py-4 shadow-sm'>
          <div className='flex items-center justify-between text-base'>
            <div className='flex items-center'>
              <input id='selectAllProduct' type='checkbox' className='h-[18px] w-[18px] accent-orange' />
              <label htmlFor='selectAllProduct' className='cursor-pointer px-[20px]'>
                Select All ({purchaseInCart?.length})
              </label>
              <button className='px-1 outline-none'>Delete</button>
            </div>
            <div className='flex items-center gap-[15px]'>
              <div className=''>
                <div className='flex items-center gap-[5px]'>
                  <span>Total (1 item):</span>
                  <span className='text-2xl leading-4 text-orange'>₫375.000</span>
                </div>
                <div className='flex items-center justify-end gap-[24px] text-sm'>
                  <span>Saved</span>
                  <span className='text-orange'>₫340k</span>
                </div>
              </div>
              <button className='mr-[2px] w-[210px] rounded-sm bg-orange px-[36px] py-[10px] text-sm capitalize text-white hover:bg-[#f05d40]'>
                check out
              </button>
            </div>
          </div>
        </div>
        <div className='mt-9 flex items-center justify-between'>
          <div className='text-base uppercase text-gray-500'>YOU MAY ALSO LIKE</div>
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig
              }).toString()
            }}
            className='flex items-center gap-1 p-1 text-sm text-orange'
          >
            <span>See All</span>
            <svg
              enableBackground='new 0 0 11 11'
              viewBox='0 0 11 11'
              x={0}
              y={0}
              className='h-[10px] w-[10px] fill-orange'
            >
              <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
            </svg>
          </Link>
        </div>
        <div className='mt-5 grid grid-cols-6 gap-3'>
          {productCategory &&
            productCategory.map((product) => (
              <Link
                key={product._id}
                to={`${path.home}${generateNameId(product.name, product._id)}`}
                className='col-span-1 h-full overflow-hidden rounded-sm bg-white shadow transition hover:translate-y-[-.0625rem] hover:shadow-[0_0.0625rem_20px_0_rgba(0,0,0,.05)]'
              >
                <div className='relative w-full pt-[100%]'>
                  <img
                    className='absolute left-0 top-0 h-full w-full object-cover'
                    src={product.image}
                    alt={product.name}
                  />
                </div>
                <div className='p-2'>
                  <div className='line-clamp-2 text-xs'>{product.name}</div>
                  <div className='mt-2 flex items-center gap-1'>
                    <div className='flex items-end text-sm text-gray-400 line-through'>
                      <span>₫</span>
                      <span>{formatPriceNumber(product.price_before_discount)}</span>
                    </div>
                    <div className='flex items-center text-orange'>
                      <span className='text-xs'>₫</span>
                      <span className='text-base'>{formatPriceNumber(product.price)}</span>
                    </div>
                  </div>
                  <div className='mb-1 mt-3 flex items-center gap-1'>
                    <div className='flex items-center gap-[1px]'>
                      <RatingStar size={10} rating={product.rating} />
                    </div>
                    <span className='text-xs'>{formatSocialNumber(product.sold)} SOLD</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  )
}
