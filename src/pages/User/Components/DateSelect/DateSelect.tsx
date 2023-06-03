import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface Props {
  errorMessage?: string
  value?: Date
  onChange?: (value: Date) => void
}

export default function DateSelect({ errorMessage, value, onChange }: Props) {
  const [date, setDate] = useState({
    day: 1,
    month: 0,
    year: 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        day: value.getDate(),
        month: value.getMonth(),
        year: value.getFullYear()
      })
    }
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = e.target
    const newDate = {
      ...date,
      [name]: valueFromSelect
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.day))
  }

  return (
    <>
      <div className='flex gap-5 pb-[10px]'>
        <span className='mt-2 min-w-[20%] text-right text-gray-400'>Date of birth</span>
        <div className='flex-1'>
          <div className='flex flex-1 items-center justify-between gap-2'>
            <select
              onChange={handleChange}
              name='day'
              value={date.day}
              className='w-full cursor-pointer rounded-sm border px-[15px] py-[10px] outline-none hover:border-orange'
            >
              <option value='' disabled>
                Day
              </option>
              {range(1, 32).map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <select
              onChange={handleChange}
              name='month'
              value={date.month}
              className='w-full cursor-pointer rounded-sm border px-[15px] py-[10px] outline-none hover:border-orange'
            >
              <option value='' disabled>
                Month
              </option>
              {range(0, 12).map((month) => (
                <option key={month} value={month}>
                  {month + 1}
                </option>
              ))}
            </select>
            <select
              onChange={handleChange}
              name='year'
              value={date.year}
              className='w-full cursor-pointer rounded-sm border px-[15px] py-[10px] outline-none hover:border-orange'
            >
              <option value='' disabled>
                Year
              </option>
              {range(1990, 2024).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className='min-h-[1.5rem] pl-1 pt-1 text-sm text-[#ff424f]'>{errorMessage}</div>
        </div>
      </div>
    </>
  )
}
