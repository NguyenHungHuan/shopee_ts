interface Props {
  fillColor?: string
  bgFillColor?: string
  strokeColor?: string
  size?: number
  rating?: number
}

export default function RatingStar({
  fillColor = '#ffce3d',
  strokeColor = '#ffce3d',
  size = 10,
  rating,
  bgFillColor = '#cacaca'
}: Props) {
  const handleWidth = (order: number) => {
    if (rating) {
      if (order <= rating) {
        return '100%'
      }
      if (order > rating && order - rating < 1) {
        return (rating - Math.floor(rating)) * 100 + '%'
      }
      return '0%'
    }
    return '100%'
  }
  return (
    <div className='flex items-center gap-[1px]'>
      {Array(5)
        .fill(0)
        .map((_, indexStar) => {
          return (
            <div key={indexStar} className='relative'>
              <div className='absolute inset-0 overflow-hidden' style={{ width: handleWidth(indexStar + 1) }}>
                <svg
                  enableBackground='new 0 0 15 15'
                  viewBox='0 0 15 15'
                  x={0}
                  y={0}
                  width={size}
                  height={size}
                  fill={fillColor}
                  stroke={strokeColor}
                >
                  <polygon
                    points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeMiterlimit={10}
                  />
                </svg>
              </div>
              <svg
                enableBackground='new 0 0 15 15'
                viewBox='0 0 15 15'
                x={0}
                y={0}
                width={size}
                height={size}
                fill={bgFillColor}
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
  )
}
