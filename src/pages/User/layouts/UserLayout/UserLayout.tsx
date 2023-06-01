import { Outlet } from 'react-router-dom'
import UserSideNav from '../../Components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='border-b-4 border-b-orange bg-[#f5f5f5] pb-[50px] pt-[20px]'>
      <div className='mx-auto w-[1200px] min-w-[1200px]'>
        <div className='flex gap-[27px]'>
          <UserSideNav />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
