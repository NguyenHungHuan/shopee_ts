import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'
import path from '~/constants/path'

export default function UserSideNav() {
  return (
    <div className='flex-shrink-0 w-[180px]'>
      <div className='flex items-center gap-[15px] py-[15px] border-b border-gray-200'>
        <Link to={path.profile} className='w-12 h-12 rounded-full overflow-hidden border border-gray-400'>
          <img
            className='h-full w-full object-cover'
            src='https://images.unsplash.com/photo-1680728841730-481c20899554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
            alt='avatar'
          />
        </Link>
        <div className='text-sm'>
          <div className='font-bold'>nhhuaan</div>
          <Link to={path.profile} className='flex items-center text-gray-400'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Edit Profile
          </Link>
        </div>
      </div>
      <div className='mt-[27px]'>
        <NavLink
          to={path.profile}
          className={({ isActive }) =>
            classNames('flex items-center gap-[10px] mb-4 text-sm hover:text-orange', {
              'text-orange': isActive,
              'text-black': !isActive
            })
          }
        >
          <img
            className='w-5 h-5'
            src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4'
            alt='icon'
          />
          My Account
        </NavLink>
        <NavLink
          to={path.changePassword}
          className={({ isActive }) =>
            classNames('flex items-center gap-[10px] mb-4 text-sm hover:text-orange', {
              'text-orange': isActive,
              'text-black': !isActive
            })
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='#255fba'
            className='w-5 h-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
            />
          </svg>
          Change Password
        </NavLink>
        <NavLink
          to={path.historyPurchase}
          className={({ isActive }) =>
            classNames('flex items-center gap-[10px] mb-4 text-sm hover:text-orange', {
              'text-orange': isActive,
              'text-black': !isActive
            })
          }
        >
          <img
            className='w-5 h-5'
            src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078'
            alt='icon'
          />
          My Purchase
        </NavLink>
      </div>
    </div>
  )
}
