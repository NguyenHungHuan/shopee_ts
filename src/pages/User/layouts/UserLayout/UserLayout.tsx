import UserSideNav from '../../Components/UserSideNav'
import ChangePassword from '../../pages/ChangePassword'
import HistoryPurchase from '../../pages/HistoryPurchase/HistoryPurchase'
import Profile from '../../pages/Profile'

export default function UserLayout() {
  return (
    <div className='pt-[20px] pb-[50px] bg-[#f5f5f5] border-b-4 border-b-orange'>
      <div className='min-w-[1200px] w-[1200px] mx-auto'>
        <div className='flex gap-[27px]'>
          <UserSideNav />
          <div className='flex-1'>
            <Profile />
            {/* <ChangePassword /> */}
            {/* <HistoryPurchase /> */}
          </div>
        </div>
      </div>
    </div>
  )
}
