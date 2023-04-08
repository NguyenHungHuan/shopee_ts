import FilterPanel from '~/components/FilterPanel'

export default function ProductList() {
  return (
    <div className='pt-10 pb-[60px] bg-[#f5f5f5]'>
      <div className='min-w-[1200px] w-[1200px] mx-auto'>
        <div className='flex gap-5'>
          <div className='w-[190px]'>
            <FilterPanel />
          </div>
          <div className=''>Product</div>
        </div>
      </div>
    </div>
  )
}
