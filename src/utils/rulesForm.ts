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

export type FormData = yup.InferType<typeof schema>
export type LoginFormData = yup.InferType<typeof loginSchema>
