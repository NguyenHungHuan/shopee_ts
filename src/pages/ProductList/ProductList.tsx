import isUndefined from 'lodash/isUndefined'
import omitBy from 'lodash/omitBy'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import productsApi from '~/apis/productApi'
import FilterPanel from '~/components/FilterPanel'
import Paginate from '~/components/Paginate'
import RatingStar from '~/components/RatingStar'
import SortBar from '~/components/SortBar'
import { queryParamsDefault } from '~/constants/product'
import useQueryParams from '~/hooks/useQueryParams'
import { productListConfig } from '~/types/products.type'
import { formatPriceNumber, formatSocialNumber } from '~/utils/utils'

export type QueryConfig = {
  [key in keyof productListConfig]: string
}

export default function ProductList() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      category: queryParams.category,
      exclude: queryParams.exclude,
      page: queryParams.page || queryParamsDefault.page,
      limit: queryParams.limit || queryParamsDefault.limit,
      name: queryParams.name,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  const { data, isLoading } = useQuery({
    queryKey: ['product', queryConfig],
    keepPreviousData: true,
    queryFn: () => productsApi.getProducts(queryConfig as productListConfig)
  })
  console.log(data)
  const productsList = data?.data.data.products

  return (
    <div className='border-b-4 border-b-orange bg-[#f5f5f5] pb-[60px] pt-10'>
      <div className='container'>
        <div className='flex gap-5'>
          <div className='w-[190px]'>
            <FilterPanel />
          </div>
          <div className='flex-1'>
            <SortBar queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size as number} />
            <div className='mb-12 mt-4 grid grid-cols-5 gap-[10px] px-[5px]'>
              {productsList?.map((product) => (
                <Link
                  key={product._id}
                  to='/'
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
                      <RatingStar rating={product.rating} />
                      <span className='text-xs'>{formatSocialNumber(product.sold)} SOLD</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Paginate queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size as number} />
          </div>
        </div>
      </div>
    </div>
  )
}
