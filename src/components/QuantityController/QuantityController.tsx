import { useState } from 'react'
import InputNumber from '../InputNumber'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  max?: number
  value?: number
  onType?: (value: number) => void
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
  onFocusOut?: (value: number) => void
}

export default function QuantityController({
  max,
  value,
  onDecrease,
  onIncrease,
  onType,
  onFocusOut,
  ...rest
}: Props) {
  const [localValue, setLocalValue] = useState<number>(1)
  const handleIncreaseCount = () => {
    let _value = (value || localValue) + 1
    if (max !== undefined && _value >= max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }
  const handleDecreaseCount = () => {
    let _value = (value || localValue) - 1
    if (_value < 1) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }
  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    }
    if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }
  const handleFocusOut = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const _value = Number(e.target.value)
    onFocusOut && onFocusOut(_value)
  }

  return (
    <div className='flex items-center overflow-hidden rounded-sm shadow-sm'>
      <button className='border p-[10px]' onClick={handleDecreaseCount}>
        <svg
          enableBackground='new 0 0 10 10'
          viewBox='0 0 10 10'
          x={0}
          y={0}
          className='h-[10px] w-[10px] fill-gray-500'
        >
          <polygon points='4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5' />
        </svg>
      </button>
      <InputNumber
        value={value || localValue}
        classNameInput='h-8 w-[50px] border-y text-center text-base outline-none'
        classNameError='hidden'
        onChange={handleChangeCount}
        onBlur={handleFocusOut}
        {...rest}
      />
      <button className='border p-[10px]' onClick={handleIncreaseCount}>
        <svg
          enableBackground='new 0 0 10 10'
          viewBox='0 0 10 10'
          x={0}
          y={0}
          className='h-[10px] w-[10px] fill-gray-500'
        >
          <polygon points='10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5' />
        </svg>
      </button>
    </div>
  )
}
