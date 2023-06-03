import { QueryConfig } from '~/pages/ProductList/ProductList'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { queryParamsDefault, sortBy, orderConstant } from '~/constants/product'
import { productListConfig } from '~/types/products.type'
import path from '~/constants/path'
import classNames from 'classnames'
import omit from 'lodash/omit'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

export default function SortBar({ queryConfig, pageSize }: Props) {
  const navigate = useNavigate()
  const { sort_by = queryParamsDefault.sort_by, order, page } = queryConfig
  const handleSort = (value: Exclude<productListConfig['sort_by'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: value.toString()
          },
          ['order']
        )
      ).toString()
    })
  }
  const isActive = (value: Exclude<productListConfig['sort_by'], undefined>) => {
    return sort_by === value
  }
  const handleOrder = (value: Exclude<productListConfig['order'], undefined>) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price.toString(),
        order: value.toString()
      }).toString()
    })
  }
  return (
    <div className='flex items-center justify-between rounded-sm bg-[#ededed] px-5 py-[13px]'>
      <div className='flex items-center justify-center gap-[10px] text-sm'>
        <span className='mr-1 text-gray-500'>Sort by</span>
        <button
          onClick={() => handleSort(sortBy.view)}
          className={classNames('min-w-[90px] rounded-sm px-[21px] py-[7px]  shadow-sm hover:opacity-80', {
            'bg-orange text-white': isActive(sortBy.view),
            'bg-white text-black': !isActive(sortBy.view)
          })}
        >
          Popular
        </button>
        <button
          onClick={() => handleSort(sortBy.createdAt)}
          className={classNames('min-w-[90px] rounded-sm px-[21px] py-[7px]  shadow-sm hover:opacity-80', {
            'bg-orange text-white': isActive(sortBy.createdAt),
            'bg-white text-black': !isActive(sortBy.createdAt)
          })}
        >
          Lasted
        </button>
        <button
          onClick={() => handleSort(sortBy.sold)}
          className={classNames('min-w-[90px] rounded-sm px-[21px] py-[7px]  shadow-sm hover:opacity-80', {
            'bg-orange text-white': isActive(sortBy.sold),
            'bg-white text-black': !isActive(sortBy.sold)
          })}
        >
          Top Sales
        </button>
        <select
          value={order || ''}
          onChange={(e) => handleOrder(e.target.value as Exclude<productListConfig['order'], undefined>)}
          className='min-w-[200px] cursor-pointer rounded-sm bg-white px-2 py-[9px] outline-none hover:opacity-80'
        >
          <option value='' hidden>
            Price
          </option>
          <option value={orderConstant.asc}>Price: Low to High</option>
          <option value={orderConstant.desc}>Price: High to Low</option>
        </select>
      </div>
      <div className='flex items-center gap-5'>
        <div className='flex items-center text-sm'>
          <span className='text-orange'>{page}</span>
          <span>/{pageSize}</span>
        </div>
        <div className='flex items-center'>
          {Number(page) > 1 ? (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (Number(page) - 1).toString()
                }).toString()
              }}
              className='rounded-sm border-r bg-white fill-black px-[12.5px] py-3 shadow-sm'
            >
              <svg viewBox='0 0 7 11' className='h-[10px] w-[10px]'>
                <path
                  d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                  fillRule='nonzero'
                />
              </svg>
            </Link>
          ) : (
            <span className='rounded-sm border-r bg-white fill-black/30 px-[12.5px] py-3 opacity-60 shadow-sm'>
              <svg viewBox='0 0 7 11' className='h-[10px] w-[10px]'>
                <path
                  d='M4.694078 9.8185598L.2870824 5.4331785c-.1957415-.1947815-.1965198-.511363-.0017382-.7071046a.50867033.50867033 0 0 1 .000868-.0008702L4.7381375.2732784 4.73885.273991c.1411545-.127878.3284279-.205779.5338961-.205779.4393237 0 .7954659.3561422.7954659.7954659 0 .2054682-.077901.3927416-.205779.5338961l.0006632.0006632-.0226101.0226101a.80174653.80174653 0 0 1-.0105706.0105706L2.4680138 4.7933195c-.1562097.1562097-.1562097.4094757 0 .5656855a.45579485.45579485 0 0 0 .0006962.0006944l3.3930018 3.3763607-.0009482.0009529c.128869.1413647.2074484.3293723.2074484.5357331 0 .4393237-.3561422.7954659-.7954659.7954659-.2049545 0-.391805-.077512-.5328365-.2048207l-.0003877.0003896-.0097205-.0096728a.80042023.80042023 0 0 1-.0357234-.0355483z'
                  fillRule='nonzero'
                />
              </svg>
            </span>
          )}
          {Number(page) < pageSize ? (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: (Number(page) + 1).toString()
                }).toString()
              }}
              className='rounded-sm bg-white px-[12.5px] py-3 shadow-sm'
            >
              <svg viewBox='0 0 7 11' className='h-[10px] w-[10px]'>
                <path
                  d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                  fillRule='nonzero'
                />
              </svg>
            </Link>
          ) : (
            <span className='rounded-sm bg-white fill-black/30 px-[12.5px] py-3 opacity-60 shadow-sm'>
              <svg viewBox='0 0 7 11' className='h-[10px] w-[10px]'>
                <path
                  d='M2.305922 9.81856l4.4069956-4.385381c.1957415-.194782.1965198-.511364.0017382-.707105a.26384055.26384055 0 0 0-.000868-.00087L2.2618625.273278 2.26115.273991C2.1199955.146113 1.9327221.068212 1.7272539.068212c-.4393237 0-.7954659.356142-.7954659.795466 0 .205468.077901.392741.205779.533896l-.0006632.000663.0226101.02261c.0034906.003557.0070143.00708.0105706.010571L4.5319862 4.79332c.1562097.156209.1562097.409475 0 .565685-.0002318.000232-.0004639.000463-.0006962.000694L1.1382882 8.73606l.0009482.000953c-.128869.141365-.2074484.329372-.2074484.535733 0 .439324.3561422.795466.7954659.795466.2049545 0 .391805-.077512.5328365-.204821l.0003877.00039.0097205-.009673c.012278-.011471.0241922-.023327.0357234-.035548z'
                  fillRule='nonzero'
                />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
