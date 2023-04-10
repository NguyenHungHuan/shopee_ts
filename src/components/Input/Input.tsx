import type { UseFormRegister } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
  classNameInput?: string
  classNameError?: string
  errorMessage?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
}

export default function Input({
  className,
  classNameError = 'text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1',
  classNameInput = 'w-full outline-none border px-4 py-2 border-[#00000024] rounded-sm',
  errorMessage,
  name,
  register,
  ...rest
}: Props) {
  const registerResult = register && name ? register(name) : null
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
