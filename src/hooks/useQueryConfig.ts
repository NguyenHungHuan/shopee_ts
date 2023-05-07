import { QueryConfig } from '~/pages/ProductList/ProductList'
import useQueryParams from './useQueryParams'
import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { queryParamsDefault } from '~/constants/product'

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || queryParamsDefault.page,
      limit: queryParams.limit || queryParamsDefault.limit,
      category: queryParams.category,
      exclude: queryParams.exclude,
      name: queryParams.name,
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter
    },
    isUndefined
  )
  return queryConfig
}
