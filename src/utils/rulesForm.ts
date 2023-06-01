import * as yup from 'yup'

export const schema = yup.object({
  email: yup
    .string()
    .email('Email is not valid')
    .required('Please enter your email')
    .min(5, 'Email include 5 - 160 characters')
    .max(160, 'Email include 5 - 160 characters'),
  password: yup
    .string()
    .required('Please enter your password')
    .min(6, 'Password include 6 - 160 characters')
    .max(160, 'Password include 5 - 160 characters'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Confirm password not correct')
    .required('Please confirm your password')
})
export const loginSchema = schema.omit(['confirm_password'])

const testPriceMinMax = (testContext: yup.TestContext<yup.AnyObject>) => {
  const { price_min, price_max } = testContext.parent
  if (price_min !== '' && price_max !== '') {
    return Number(price_max) >= Number(price_min)
  }
  return price_min === '' || price_max === ''
}

export const InputPriceSchema = yup.object({
  price_min: yup.string().test({
    name: 'price-not-allowed',
    message: 'Please input valid price range',
    test: (value, testContext) => testPriceMinMax(testContext)
  }),
  price_max: yup.string().test({
    name: 'price-not-allowed',
    message: 'Please input valid price range',
    test: (value, testContext) => testPriceMinMax(testContext)
  })
})

export const searchSchema = yup.object({
  name: yup.string().trim().required()
})

export const userSchema = yup.object({
  name: yup.string().max(160, 'Name must be 160 characters or less.').required('Name cannot be empty.'),
  phone: yup.string().max(20, 'Phone must be 20 characters or less.'),
  address: yup.string().max(160, 'Address must be 160 characters or less.'),
  date_of_birth: yup.date().max(new Date(), 'Date is invalid, please set a correct date.'),
  avatar: yup.string().max(1000, 'Image is invalid, please set a correct image.'),
  password: schema.fields['password'],
  new_password: schema.fields['password'],
  confirm_password: yup
    .string()
    .oneOf([yup.ref('new_password')], 'Confirm password not correct')
    .required('Please confirm your new password')
})

export type FormData = yup.InferType<typeof schema>
export type FormDataPrice = yup.InferType<typeof InputPriceSchema>
export type LoginFormData = yup.InferType<typeof loginSchema>
export type SearchFormData = yup.InferType<typeof searchSchema>
export type UserSchema = yup.InferType<typeof userSchema>
