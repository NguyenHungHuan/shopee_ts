import { produce } from 'immer'
import keyBy from 'lodash/keyBy'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link, createSearchParams, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import productsApi from '~/apis/productApi'
import purchaseApi, { purchaseBody } from '~/apis/purchaseApi'
import Button from '~/components/Button'
import { AppContext } from '~/Contexts/app.context'
import QuantityController from '~/components/QuantityController'
import RatingStar from '~/components/RatingStar'
import path from '~/constants/path'
import { queryParamsDefault } from '~/constants/product'
import { purchasesStatus } from '~/constants/purchase'
import { ExtendedPurchase, purchase } from '~/types/purchase.type'
import { formatPriceNumber, formatSocialNumber, generateNameId } from '~/utils/utils'
import useScrollTop from '~/hooks/useScrollTop'

export default function Cart() {
  useScrollTop()
  // const { extendedPurchases, setExtendedPurchases } = useContext(AppContext)
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchasesInCartData, refetch } = useQuery({
    queryKey: ['purchase', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const purchasesInCart = purchasesInCartData?.data.data

  const updatePurchaseMutation = useMutation({
    mutationFn: (data: purchaseBody) => purchaseApi.updatePurchase(data),
    onSuccess: () => {
      refetch()
    }
  })

  const deletePurchaseMutation = useMutation({
    mutationFn: (data: string[]) => purchaseApi.deletePurchase(data),
    onSuccess: () => {
      refetch()
    }
  })

  const buyPurchaseMutation = useMutation({
    mutationFn: (data: purchaseBody[]) => purchaseApi.buyPurchase(data),
    onSuccess: (data) => {
      refetch()
      toast.success(data.data.message, {
        autoClose: 1000,
        position: 'top-center'
      })
    }
  })

  const isAllChecked = useMemo(
    () => extendedPurchases?.every((purchase) => purchase.checked),
    [extendedPurchases]
  )
  const checkedPurchase = useMemo(
    () => extendedPurchases.filter((purchase) => purchase.checked),
    [extendedPurchases]
  )
  const checkedPurchaseCount = checkedPurchase.length
  const totalPricePurchase = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + current.price * current.buy_count
      }, 0),
    [checkedPurchase]
  )
  const totalSavingPricePurchase = useMemo(
    () =>
      checkedPurchase.reduce((result, current) => {
        return result + (current.price_before_discount - current.price) * current.buy_count
      }, 0),
    [checkedPurchase]
  )

  const categoryId = purchasesInCart && purchasesInCart[0]?.product.category._id
  const queryConfig = {
    page: queryParamsDefault.page,
    limit: queryParamsDefault.limit,
    category: categoryId || ''
  }
  const { data: productCategoryData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productsApi.getProducts(queryConfig),
    staleTime: 3 * 60 * 1000,
    enabled: Boolean(categoryId)
  })
  const productCategory = productCategoryData?.data.data.products

  const location = useLocation()
  const chosenPurchaseIdFromLocation = (location.state as { purchaseId: string } | null)?.purchaseId

  useEffect(() => {
    setExtendedPurchases((prev) => {
      const extendedPurchasesObject = keyBy(prev, '_id')
      return (
        purchasesInCart?.map((purchase) => {
          const isChosenPurchaseFromLocation = chosenPurchaseIdFromLocation === purchase._id
          return {
            ...purchase,
            disabled: false,
            checked: isChosenPurchaseFromLocation || Boolean(extendedPurchasesObject[purchase._id]?.checked)
          }
        }) || []
      )
    })
  }, [purchasesInCart, chosenPurchaseIdFromLocation])

  useEffect(() => {
    return () => {
      history.replaceState(null, '')
    }
  }, [])

  const handleChecked = (purchaseIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].checked = event.target.checked
      })
    )
  }

  const handleCheckedAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }

  const handleType = (purchaseIndex: number, value: number) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[purchaseIndex].buy_count = value
      })
    )
  }

  const handleOnFocusOut = (purchaseIndex: number, value: number, enable: boolean) => {
    if (enable) {
      const purchase = extendedPurchases[purchaseIndex]
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (enabled) {
      const purchase = extendedPurchases[purchaseIndex]
      setExtendedPurchases(
        produce((draft) => {
          draft[purchaseIndex].disabled = true
        })
      )
      updatePurchaseMutation.mutate({ product_id: purchase.product._id, buy_count: value })
    }
  }

  const handleDeletePurchase = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchases[purchaseIndex]._id
    deletePurchaseMutation.mutate([purchaseId])
  }

  const handleDeleteManyPurchase = () => {
    if (checkedPurchaseCount > 0) {
      const purchaseIds = checkedPurchase.map((purchase) => purchase._id)
      deletePurchaseMutation.mutate(purchaseIds)
    }
  }

  const handleBuyPurchase = () => {
    if (checkedPurchaseCount > 0) {
      const body = checkedPurchase.map((purchase) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyPurchaseMutation.mutate(body)
    }
  }

  return (
    <div className='border-b-4 border-b-orange bg-[#f5f5f5] pb-[60px] pt-10'>
      <div className='container'>
        {extendedPurchases && extendedPurchases.length > 0 ? (
          <>
            <div className='grid grid-cols-12 rounded-[3px] bg-white px-10 py-4 shadow-sm'>
              <div className='col-span-6 flex items-center'>
                <div className='flex items-center'>
                  <input
                    id='CheckedAllProduct'
                    type='checkbox'
                    className='h-[18px] w-[18px] accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckedAll}
                  />
                  <label htmlFor='CheckedAllProduct' className='cursor-pointer px-[20px] text-sm'>
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
            {extendedPurchases &&
              extendedPurchases.map((purchase, index) => (
                <div key={purchase._id} className='mt-[15px] rounded-[3px] bg-white px-5 py-4 shadow-sm'>
                  <div className='grid grid-cols-12 gap-4 border px-5 py-[16px]'>
                    <div className='col-span-6 flex items-center'>
                      <div className='flex items-center gap-5'>
                        <input
                          id='CheckedAllProduct'
                          type='checkbox'
                          className='h-[18px] w-[18px] flex-shrink-0 accent-orange'
                          checked={purchase.checked}
                          onChange={handleChecked(index)}
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
                            <QuantityController
                              value={purchase.buy_count}
                              max={purchase.product.quantity}
                              onIncrease={(value) =>
                                handleQuantity(index, value, value <= purchase.product.quantity)
                              }
                              onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                              onType={(value) => handleType(index, value)}
                              onFocusOut={(value) =>
                                handleOnFocusOut(
                                  index,
                                  value,
                                  value !== (purchasesInCart as purchase[])[index].buy_count
                                )
                              }
                              disabled={purchase.disabled}
                            />
                          </div>
                        </div>
                        <div className='col-span-1 text-center text-sm text-orange'>
                          ₫{formatPriceNumber(purchase.price * purchase.buy_count)}
                        </div>
                        <div className='col-span-1 text-center'>
                          <button
                            className='text-black outline-none hover:text-orange'
                            onClick={handleDeletePurchase(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            <div className='sticky bottom-0 mt-[15px] rounded-[3px] border bg-white px-5 py-4 shadow-sm'>
              <div className='flex items-center justify-between text-base'>
                <div className='flex items-center'>
                  <input
                    id='selectAllProduct'
                    type='checkbox'
                    className='h-[18px] w-[18px] accent-orange'
                    checked={isAllChecked}
                    onChange={handleCheckedAll}
                  />
                  <label htmlFor='selectAllProduct' className='cursor-pointer px-[20px]'>
                    Select All ({extendedPurchases?.length})
                  </label>
                  <button onClick={handleDeleteManyPurchase} className='px-1 outline-none'>
                    Delete ({checkedPurchaseCount})
                  </button>
                </div>
                <div className='flex items-center gap-[15px]'>
                  <div className=''>
                    <div className='flex items-center gap-[5px]'>
                      <span>Total ({checkedPurchaseCount} item):</span>
                      <span className='text-2xl leading-4 text-orange'>
                        ₫{formatPriceNumber(totalPricePurchase)}
                      </span>
                    </div>
                    <div className='flex items-center justify-end gap-[24px] text-sm'>
                      <span>Saved</span>
                      <span className='text-orange'>₫{formatPriceNumber(totalSavingPricePurchase)}</span>
                    </div>
                  </div>
                  <Button
                    onClick={handleBuyPurchase}
                    disabled={buyPurchaseMutation.isLoading}
                    isLoading={buyPurchaseMutation.isLoading}
                    className='mr-[2px] w-[210px] rounded-sm bg-orange px-[36px] py-[10px] text-sm capitalize text-white hover:bg-[#f05d40]'
                  >
                    check out
                  </Button>
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
          </>
        ) : (
          <div className='my-20 flex flex-1 flex-col items-center text-lg text-[#0000008a]'>
            <img
              src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/a60759ad1dabe909c46a817ecbf71878.png'
              className='h-[134px] w-[134px]'
              alt=''
            />
            <span>Uh oh! We couldn&lsquo;t find any purchases?</span>
            <span className='mt-4'>or</span>
            <Link
              to={path.home}
              className='mt-4 rounded-sm bg-orange px-8 py-[10px] text-lg capitalize text-white shadow-sm hover:bg-orange/90'
            >
              Add some
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
