import FilterPanel from '~/components/FilterPanel'
import SortBar from '~/components/SortBar'

export default function ProductList() {
  return (
    <div className='pt-10 pb-[60px] bg-[#f5f5f5]'>
      <div className='min-w-[1200px] w-[1200px] mx-auto'>
        <div className='flex gap-5'>
          <div className='w-[190px]'>
            <FilterPanel />
          </div>
          <div className='flex-1'>
            <SortBar />
            ProductList
          </div>
        </div>
      </div>
    </div>
  )
}
