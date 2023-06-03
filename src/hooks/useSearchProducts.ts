import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import omit from 'lodash/omit'
import path from '~/constants/path'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchFormData, searchSchema } from '~/utils/rulesForm'
import { useForm } from 'react-hook-form'

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<SearchFormData>({
    resolver: yupResolver(searchSchema)
  })

  const onSubmit = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.name
          },
          ['order', 'sort_by']
        )
      : {
          ...queryConfig,
          name: data.name
        }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return {
    register,
    onSubmit
  }
}
