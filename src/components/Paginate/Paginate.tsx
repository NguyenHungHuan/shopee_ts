import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import path from '~/constants/path'
import { QueryConfig } from '~/pages/ProductList/ProductList'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2
export default function Paginate({ pageSize, queryConfig }: Props) {
  const page = Number(queryConfig.page)
  let dotBefore = false
  let dotAfter = false
  const handleDotBefore = (index: number) => {
    if (!dotBefore) {
      dotBefore = true
      return (
        <span
          key={index}
          className='mx-[15px] flex max-w-[40px] justify-center rounded-sm px-[14.5px] py-[1px] outline-none'
        >
          ...
        </span>
      )
    }
    return null
  }
  const handleDotAfter = (index: number) => {
    if (!dotAfter) {
      dotAfter = true
      return (
        <span
          key={index}
          className='mx-[15px] flex max-w-[40px] justify-center rounded-sm px-[14.5px] py-[1px] outline-none'
        >
          ...
        </span>
      )
    }
    return null
  }
  return (
    <div className='mb-14 flex flex-wrap items-center justify-center text-xl text-gray-400'>
      {page > 1 ? (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='mx-[15px] px-[13px] py-2'
        >
          <svg
            enableBackground='new 0 0 11 11'
            viewBox='0 0 11 11'
            x={0}
            y={0}
            className='h-[14px] w-[14px] fill-gray-400'
          >
            <g>
              <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z' />
            </g>
          </svg>
        </Link>
      ) : (
        <span className='mx-[15px] px-[13px] py-2'>
          <svg
            enableBackground='new 0 0 11 11'
            viewBox='0 0 11 11'
            x={0}
            y={0}
            className='h-[14px] w-[14px] fill-gray-400'
          >
            <g>
              <path d='m8.5 11c-.1 0-.2 0-.3-.1l-6-5c-.1-.1-.2-.3-.2-.4s.1-.3.2-.4l6-5c .2-.2.5-.1.7.1s.1.5-.1.7l-5.5 4.6 5.5 4.6c.2.2.2.5.1.7-.1.1-.3.2-.4.2z' />
            </g>
          </svg>
        </span>
      )}
      {Array(pageSize)
        .fill(0)
        .map((_, index) => {
          const pageNumber = index + 1
          if ((page === 1 || page === 2) && pageNumber > 5) {
            return handleDotAfter(index)
          }
          if (page === 3 && pageNumber > page * RANGE) {
            return handleDotAfter(index)
          }
          if ((page === 4 || page === 5) && pageNumber > page + RANGE) {
            return handleDotAfter(index)
          }
          if (
            page > 5 &&
            pageNumber < pageSize - RANGE - 2 &&
            pageNumber < page - RANGE &&
            pageNumber > RANGE
          ) {
            return handleDotBefore(index)
          } else if (page > 5 && pageNumber > page + RANGE) {
            return handleDotAfter(index)
          }
          return (
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  page: pageNumber.toString()
                }).toString()
              }}
              key={index}
              className={classNames(
                'mx-[15px] flex max-w-[40px] justify-center rounded-sm px-[14.5px] py-[1px]',
                {
                  'bg-orange text-white': pageNumber === page
                }
              )}
            >
              {pageNumber}
            </Link>
          )
        })}
      {page < pageSize ? (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='mx-[15px] px-[13px] py-2'
        >
          <svg
            enableBackground='new 0 0 11 11'
            viewBox='0 0 11 11'
            x={0}
            y={0}
            className='h-[14px] w-[14px] fill-gray-400'
          >
            <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
          </svg>
        </Link>
      ) : (
        <span className='mx-[15px] px-[13px] py-2'>
          <svg
            enableBackground='new 0 0 11 11'
            viewBox='0 0 11 11'
            x={0}
            y={0}
            className='h-[14px] w-[14px] fill-gray-400'
          >
            <path d='m2.5 11c .1 0 .2 0 .3-.1l6-5c .1-.1.2-.3.2-.4s-.1-.3-.2-.4l-6-5c-.2-.2-.5-.1-.7.1s-.1.5.1.7l5.5 4.6-5.5 4.6c-.2.2-.2.5-.1.7.1.1.3.2.4.2z' />
          </svg>
        </span>
      )}
    </div>
  )
}
