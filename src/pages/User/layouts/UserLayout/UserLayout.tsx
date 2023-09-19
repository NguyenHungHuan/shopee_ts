import { Outlet } from 'react-router-dom'
import UserSideNav from '../../Components/UserSideNav'

export default function UserLayout() {
  return (
    <div className='border-b-4 border-b-orange bg-[#f5f5f5] pb-[50px] pt-[20px]'>
      <div className='container'>
        <div className='flex flex-col gap-[27px] md:flex-row'>
          <UserSideNav />
          <div className='flex-1'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
