import classNames from 'classnames'
import { useQuery } from 'react-query'
import { Link, createSearchParams, useNavigate, useParams } from 'react-router-dom'
import productsApi from '~/apis/productApi'
import FilterPanel from '~/components/FilterPanel'
import Paginate from '~/components/Paginate'
import RatingStar from '~/components/RatingStar'
import SortBar from '~/components/SortBar'
import path from '~/constants/path'
import { queryParamsDefault } from '~/constants/product'
import useQueryConfig from '~/hooks/useQueryConfig'
import useScrollTop from '~/hooks/useScrollTop'
import { productListConfig } from '~/types/products.type'
import { formatPriceNumber, formatSocialNumber, generateNameId } from '~/utils/utils'

export type QueryConfig = {
  [key in keyof productListConfig]: string
}

export default function ProductList() {
  useScrollTop()
  const navigate = useNavigate()
  const queryConfig = useQueryConfig()
  const resultSearch = queryConfig.name
  const { data, isLoading } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => productsApi.getProducts(queryConfig as productListConfig),
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  console.log(data)
  const productsList = data?.data.data.products

  const handleResetFilter = () => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        page: queryParamsDefault.page.toString(),
        limit: queryParamsDefault.limit.toString()
      }).toString()
    })
  }

  return (
    <div
      className={classNames('border-b-4 border-b-orange bg-[#f5f5f5] pb-[60px]', {
        'pt-10': !resultSearch,
        'pt-5': resultSearch
      })}
    >
      <div className='container'>
        <div className='flex gap-5'>
          <div className='w-[190px]'>
            <FilterPanel queryConfig={queryConfig} />
          </div>
          {data && data.data.data.products.length <= 0 ? (
            <div className='mt-10 flex flex-1 flex-col items-center text-lg text-[#0000008a]'>
              <img
                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/a60759ad1dabe909c46a817ecbf71878.png'
                className='h-[134px] w-[134px]'
                alt=''
              />
              <span>Uh oh! We couldn&lsquo;t find any listings. Try turning off some filters?</span>
              <span className='mt-4'>or</span>
              <button
                onClick={handleResetFilter}
                className='mt-4 rounded-sm bg-orange px-6 py-[10px] text-lg capitalize text-white shadow-sm hover:bg-orange/90'
              >
                reset filter
              </button>
            </div>
          ) : (
            <div className='flex-1'>
              {resultSearch && (
                <div className='mb-6 flex items-center'>
                  <svg viewBox='0 0 18 24' className='mr-3 h-[22px] w-4'>
                    <g transform='translate(-355 -149)'>
                      <g transform='translate(355 149)'>
                        <g fillRule='nonzero' transform='translate(5.4 19.155556)'>
                          <path d='m1.08489412 1.77777778h5.1879153c.51164401 0 .92641344-.39796911.92641344-.88888889s-.41476943-.88888889-.92641344-.88888889h-5.1879153c-.51164402 0-.92641345.39796911-.92641345.88888889s.41476943.88888889.92641345.88888889z' />
                          <g transform='translate(1.9 2.666667)'>
                            <path d='m .75 1.77777778h2.1c.41421356 0 .75-.39796911.75-.88888889s-.33578644-.88888889-.75-.88888889h-2.1c-.41421356 0-.75.39796911-.75.88888889s.33578644.88888889.75.88888889z' />
                          </g>
                        </g>
                        <path
                          d='m8.1 8.77777718v4.66666782c0 .4295545.40294373.7777772.9.7777772s.9-.3482227.9-.7777772v-4.66666782c0-.42955447-.40294373-.77777718-.9-.77777718s-.9.34822271-.9.77777718z'
                          fillRule='nonzero'
                        />
                        <path
                          d='m8.1 5.33333333v.88889432c0 .49091978.40294373.88888889.9.88888889s.9-.39796911.9-.88888889v-.88889432c0-.49091977-.40294373-.88888889-.9-.88888889s-.9.39796912-.9.88888889z'
                          fillRule='nonzero'
                        />
                        <path d='m8.80092773 0c-4.86181776 0-8.80092773 3.97866667-8.80092773 8.88888889 0 1.69422221.47617651 3.26933331 1.295126 4.61333331l2.50316913 3.9768889c.30201078.4782222.84303623.7697778 1.42482388.7697778h7.17785139c.7077799 0 1.3618277-.368 1.7027479-.9617778l2.3252977-4.0213333c.7411308-1.2888889 1.1728395-2.7786667 1.1728395-4.37688891 0-4.91022222-3.9409628-8.88888889-8.80092777-8.88888889m0 1.77777778c3.82979317 0 6.94810087 3.18933333 6.94810087 7.11111111 0 1.24444441-.3168334 2.43022221-.9393833 3.51466671l-2.3252977 4.0213333c-.0166754.0284444-.0481735.0462222-.0833772.0462222h-7.07224026l-2.43461454-3.8648889c-.68184029-1.12-1.04128871-2.4053333-1.04128871-3.71733331 0-3.92177778 3.11645483-7.11111111 6.94810084-7.11111111' />
                      </g>
                    </g>
                  </svg>
                  Search result for
                  <span className='ml-1 text-orange'>&apos;{resultSearch}&apos;</span>
                </div>
              )}
              <SortBar queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size as number} />
              <div className='mb-12 mt-4 grid grid-cols-5 gap-[10px] px-[5px]'>
                {productsList?.map((product) => (
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
                        <RatingStar rating={product.rating} />
                        <span className='text-xs'>{formatSocialNumber(product.sold)} SOLD</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Paginate queryConfig={queryConfig} pageSize={data?.data.data.pagination.page_size as number} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
