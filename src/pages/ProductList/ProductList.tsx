import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import productsApi from '~/apis/productApi'
import FilterPanel from '~/components/FilterPanel'
import RatingStar from '~/components/RatingStar'
import SortBar from '~/components/SortBar'
import useQueryParams from '~/hooks/useQueryParams'
import { formatPriceNumber, formatSocialNumber } from '~/utils/utils'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data, isLoading } = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => productsApi.getProducts(queryParams)
  })
  console.log(data)
  const productsList = data?.data.data.products

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
              {productsList?.map((product) => (
                <Link
                  key={product._id}
                  to='/'
                  className='transition col-span-1 h-full bg-white rounded-sm shadow hover:shadow-[0_0.0625rem_20px_0_rgba(0,0,0,.05)] hover:translate-y-[-.0625rem] overflow-hidden'
                >
                  <div className='relative pt-[100%] w-full'>
                    <img
                      className='absolute top-0 left-0 w-full h-full object-cover'
                      src={product.image}
                      alt={product.name}
                    />
                  </div>
                  <div className='p-2'>
                    <div className='text-xs line-clamp-2'>{product.name}</div>
                    <div className='flex items-center gap-1 mt-2'>
                      <div className='flex items-end text-gray-400 line-through text-sm'>
                        <span>₫</span>
                        <span>{formatPriceNumber(product.price_before_discount)}</span>
                      </div>
                      <div className='flex items-center text-orange'>
                        <span className='text-xs'>₫</span>
                        <span className='text-base'>{formatPriceNumber(product.price)}</span>
                      </div>
                    </div>
                    <div className='flex items-center mt-3 mb-1 gap-1'>
                      <RatingStar rating={product.rating} />
                      <span className='text-xs'>{formatSocialNumber(product.sold)} SOLD</span>
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
