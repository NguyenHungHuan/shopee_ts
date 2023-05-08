import InputNumber from '../InputNumber'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  max?: number
  value: number
  onType?: (value: number) => void
  onDecrease?: (value: number) => void
  onIncrease?: (value: number) => void
}

export default function QuantityController({ max, value, onDecrease, onIncrease, onType, ...rest }: Props) {
  const handleIncreaseCount = () => {
    if (max !== undefined && value >= max) {
      return (value = max)
    }
    return onIncrease && onIncrease(value + 1)
  }
  const handleDecreaseCount = () => {
    if (value <= 1) {
      return (value = 1)
    }
    return onDecrease && onDecrease(value - 1)
  }
  const handleChangeCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(e.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    }
    if (_value < 1) {
      _value = 1
    }
    return onType && onType(_value)
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
        value={value}
        classNameInput='h-8 w-[50px] border-y text-center text-base outline-none'
        classNameError='hidden'
        onChange={handleChangeCount}
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
