import classNames from 'classnames'
import omit from 'lodash/omit'
import { useQuery } from 'react-query'
import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import productsApi from '~/apis/productApi'
import path from '~/constants/path'
import { QueryConfig } from '~/pages/ProductList/ProductList'
import InputNumber from '../InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormDataPrice, InputPriceSchema } from '~/utils/rulesForm'
import { NoUndefinedField } from '~/types/utils.type'

interface Props {
  queryConfig: QueryConfig
}

export default function FilterPanel({ queryConfig }: Props) {
  const navigate = useNavigate()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    trigger
  } = useForm<NoUndefinedField<FormDataPrice>>({
    defaultValues: {
      price_min: '',
      price_max: ''
    },
    resolver: yupResolver(InputPriceSchema)
  })
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => productsApi.getCategories()
  })
  const categoryList = data?.data.data

  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })

  const handleResetFilter = () => {
    reset()
    navigate({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig
          },
          ['rating_filter', 'price_max', 'price_min']
        )
      ).toString()
    })
  }

  return (
    <div>
      <Link
        to={{
          pathname: path.home,
          search: createSearchParams(
            omit(
              {
                ...queryConfig
              },
              ['category']
            )
          ).toString()
        }}
        className={classNames('flex items-center gap-2 border-b border-b-gray-200 py-4', {
          'fill-black font-bold': !queryConfig.category,
          'fill-black/40 font-normal': queryConfig.category
        })}
      >
        <svg viewBox='0 0 12 10' className='h-[16px] w-[12px]'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        <span>All Categories</span>
      </Link>
      {categoryList &&
        categoryList.map((category) => (
          <Link
            key={category._id}
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                category: category._id.toString()
              }).toString()
            }}
            className={classNames('flex items-center gap-2 py-2 pl-3 pr-[10px] text-[14px]', {
              'font-bold text-orange': queryConfig.category === category._id
            })}
          >
            {queryConfig.category === category._id && (
              <svg viewBox='0 0 4 7' className='h-[7px] w-[4px] fill-orange'>
                <polygon points='4 3.5 0 0 0 7' />
              </svg>
            )}
            {category.name}
          </Link>
        ))}
      <div className='mt-[30px] border-b border-b-gray-300/60'>
        <div className='flex items-center gap-2 pb-[20px] font-bold'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x={0}
            y={0}
            className='h-3 w-3 stroke-black'
          >
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              />
            </g>
          </svg>
          <span>SEARCH FILTER</span>
        </div>
      </div>
      <div className='border-b border-b-gray-300/60 py-[20px]'>
        <div className='mb-4 text-[14px]'>Price Range</div>
        <form noValidate onSubmit={onSubmit}>
          <div className='flex items-center justify-between'>
            <Controller
              name='price_min'
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_max')
                  }}
                  classNameError='hidden'
                  type='text'
                  placeholder='₫ MIN'
                  classNameInput='w-[5rem] border border-gray-400 py-1 pl-[5px] text-[14px] shadow-inner outline-none'
                />
              )}
            />
            <div className='mx-2 h-[1px] flex-1 bg-[#bdbdbd]'></div>
            <Controller
              name='price_max'
              control={control}
              render={({ field }) => (
                <InputNumber
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    trigger('price_min')
                  }}
                  type='text'
                  classNameError='hidden'
                  placeholder='₫ MAX'
                  classNameInput='w-[5rem] border border-gray-400 py-1 pl-[5px] text-[14px] shadow-inner outline-none'
                />
              )}
            />
          </div>
          <div className='min-h-[1.5rem] pl-1 pt-1 text-center text-sm text-[#ff424f]'>
            {errors.price_min?.message}
          </div>
          <button
            type='submit'
            className='mt-2 w-full rounded-sm bg-orange px-8 py-1.5 text-sm uppercase text-white shadow-sm hover:bg-[#f05d40]'
          >
            Apply
          </button>
        </form>
      </div>
      <div className='border-b border-b-gray-300/80 py-[20px]'>
        <div className='mb-2 text-[14px]'>Rating</div>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Link
              key={index}
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryConfig,
                  rating_filter: (5 - index).toString()
                }).toString()
              }}
              className='flex items-center gap-2 pl-2 pr-[10px] pt-2 text-[14px] text-black'
            >
              <div className='flex items-center gap-[1px]'>
                {Array(5)
                  .fill(0)
                  .map((_, indexStar) => {
                    if (index < 5 - indexStar) {
                      return (
                        <div key={indexStar}>
                          <svg
                            enableBackground='new 0 0 15 15'
                            viewBox='0 0 15 15'
                            x={0}
                            y={0}
                            width={14}
                            height={14}
                            fill='#ffce3d'
                            stroke='#ffce3d'
                          >
                            <polygon
                              points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeMiterlimit={10}
                            />
                          </svg>
                        </div>
                      )
                    }
                    return (
                      <div key={indexStar}>
                        <svg
                          enableBackground='new 0 0 15 15'
                          viewBox='0 0 15 15'
                          x={0}
                          y={0}
                          width={14}
                          height={14}
                          fill='none'
                          stroke='#ffce3d'
                        >
                          <polygon
                            points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeMiterlimit={10}
                          />
                        </svg>
                      </div>
                    )
                  })}
              </div>
              {index !== 0 ? '& Up' : ''}
            </Link>
          ))}
      </div>
      <button
        onClick={handleResetFilter}
        className='mt-4 w-full rounded-sm bg-orange px-8 py-1.5 text-sm uppercase text-white shadow-sm hover:bg-[#f05d40]'
      >
        Clear all
      </button>
    </div>
  )
}
