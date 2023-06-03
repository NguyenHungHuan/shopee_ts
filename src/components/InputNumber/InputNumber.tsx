import { forwardRef, useState } from 'react'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string
  classNameError?: string
  errorMessage?: string
  classNameInput?: string
}

const InputNumber = forwardRef<HTMLInputElement, Props>(function InputNumberInner(
  {
    className,
    classNameError = 'text-[#ff424f] min-h-[1.5rem] text-sm pt-1 pl-1 text-center',
    errorMessage,
    classNameInput,
    onChange,
    value = '',
    ...rest
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (/^\d+$/.test(value) || value === '') {
      onChange && onChange(e)
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        className={classNameInput}
        onChange={handleChange}
        value={value === undefined ? localValue : value}
        {...rest}
        ref={ref}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
