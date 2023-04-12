import { Link } from 'react-router-dom'
import path from '~/constants/path'
import Popover from '../Popover'
import { useMutation } from 'react-query'
import AuthApi from '~/apis/authApi'
import { useContext } from 'react'
import { AppContext } from '../Contexts/app.context'
import { toast } from 'react-toastify'

export default function NavHeader() {
  const { isAuthenticated, setIsAuthenticated, profile, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => AuthApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
    },
    onError: (error) => {
      toast.error(error as string)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='bg-orange h-[2.125rem] flex items-center'>
      <nav className='container'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center text-white'>
            <Link to='/' className='text-[13px] hover:opacity-80 pr-2 border-r border-r-white/50'>
              Seller Center
            </Link>
            <Popover
              isArrow={false}
              placement='bottom-start'
              renderPopover={
                <div className='bg-white w-[11.25rem] rounded-sm shadow-sm border'>
                  <img
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/d91264e165ed6facc6178994d5afae79.png'
                    alt='download_qr_code'
                    className='w-[180px] h-[180px]'
                  />
                  <div className='px-[15px] pb-3 flex flex-wrap justify-between items-center gap-2'>
                    <div className='w-[70px] mt-[5px]'>
                      <img
                        className='w-full'
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/39f189e19764dab688d3850742f13718.png'
                        alt='App Store'
                      />
                    </div>
                    <div className='w-[70px] mt-[5px]'>
                      <img
                        className='w-full'
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/f4f5426ce757aea491dce94201560583.png'
                        alt='Play Store'
                      />
                    </div>
                    <div className='w-[70px] mt-[5px]'>
                      <img
                        className='w-full'
                        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/assets/1ae215920a31f2fc75b00d4ee9ae8551.png'
                        alt='App Gallery'
                      />
                    </div>
                  </div>
                </div>
              }
              className='text-[13px] px-2 py-4 hover:text-white/80'
            >
              <Link to='/'>Download</Link>
            </Popover>
            <span className='text-[13px] px-2 border-l border-l-white/50'>Follow us on</span>
            <div className='flex items-center gap-2'>
              <Link
                to='/'
                className='w-4 h-4 bg-bg-social bg-[8.064516129032258%_16.129032258064516%] bg-no-repeat bg-[length:487.5%_293.75%]'
              ></Link>
              <Link
                to='/'
                className='w-4 h-4 bg-bg-social bg-[58.064516129032256%_16.129032258064516%] bg-no-repeat bg-[length:487.5%_293.75%]'
              ></Link>
            </div>
          </div>
          <ul className='flex items-center text-white gap-4 text-[13px]'>
            <li>
              <Link to='/' className='flex items-center py-2 gap-1 hover:opacity-80'>
                <svg viewBox='3 2.5 14 14' x={0} y={0} className='fill-white w-[0.875rem] h-[1.125rem]'>
                  <path d='m17 15.6-.6-1.2-.6-1.2v-7.3c0-.2 0-.4-.1-.6-.3-1.2-1.4-2.2-2.7-2.2h-1c-.3-.7-1.1-1.2-2.1-1.2s-1.8.5-2.1 1.3h-.8c-1.5 0-2.8 1.2-2.8 2.7v7.2l-1.2 2.5-.2.4h14.4zm-12.2-.8.1-.2.5-1v-.1-7.6c0-.8.7-1.5 1.5-1.5h6.1c.8 0 1.5.7 1.5 1.5v7.5.1l.6 1.2h-10.3z' />
                  <path d='m10 18c1 0 1.9-.6 2.3-1.4h-4.6c.4.9 1.3 1.4 2.3 1.4z' />
                </svg>
                <span>Notifications</span>
              </Link>
            </li>
            <li>
              <Link to='/' className='flex items-center py-2 gap-1 hover:opacity-80'>
                <svg
                  height={16}
                  viewBox='0 0 16 16'
                  width={16}
                  className='fill-white w-[1.125rem] h-[1.125rem]'
                >
                  <g fill='none' fillRule='evenodd' transform='translate(1)'>
                    <circle cx={7} cy={8} r={7} stroke='currentColor' />
                    <path
                      fill='currentColor'
                      d='m6.871 3.992c-.814 0-1.452.231-1.914.704-.462.462-.693 1.089-.693 1.892h1.155c0-.484.099-.858.297-1.122.22-.319.583-.473 1.078-.473.396 0 .715.11.935.33.209.22.319.517.319.902 0 .286-.11.55-.308.803l-.187.209c-.682.605-1.1 1.056-1.243 1.364-.154.286-.22.638-.22 1.045v.187h1.177v-.187c0-.264.055-.506.176-.726.099-.198.253-.396.462-.572.517-.451.825-.737.924-.858.275-.352.418-.803.418-1.342 0-.66-.22-1.188-.66-1.573-.44-.396-1.012-.583-1.716-.583zm-.198 6.435c-.22 0-.418.066-.572.22-.154.143-.231.33-.231.561 0 .22.077.407.231.561s.352.231.572.231.418-.077.572-.22c.154-.154.242-.341.242-.572s-.077-.418-.231-.561c-.154-.154-.352-.22-.583-.22z'
                    />
                  </g>
                </svg>
                <span>Help</span>
              </Link>
            </li>
            <Popover
              renderPopover={
                <div className='bg-white min-w-[200px] rounded-sm shadow-sm text-black flex flex-col text-left text-base border border-t-0'>
                  <button className='pr-8 pl-4 py-2 hover:text-orange hover:bg-slate-100 text-left'>
                    English
                  </button>
                  <button className='pr-8 pl-4 py-2 hover:text-orange hover:bg-slate-100 text-left'>
                    Việt Nam
                  </button>
                </div>
              }
              as={'li'}
              className='flex items-center py-4 gap-1 hover:cursor-pointer hover:text-white/80'
            >
              <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M8.00065 14.6667C11.6825 14.6667 14.6673 11.6819 14.6673 8.00004C14.6673 4.31814 11.6825 1.33337 8.00065 1.33337C4.31875 1.33337 1.33398 4.31814 1.33398 8.00004C1.33398 11.6819 4.31875 14.6667 8.00065 14.6667Z'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M5.33464 8.00004C5.33464 11.6819 6.52854 14.6667 8.0013 14.6667C9.47406 14.6667 10.668 11.6819 10.668 8.00004C10.668 4.31814 9.47406 1.33337 8.0013 1.33337C6.52854 1.33337 5.33464 4.31814 5.33464 8.00004Z'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M1.33398 8H14.6673'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
              <span>English</span>
              <svg viewBox='0 0 12 12' fill='none' width={12} height={12} color='currentColor'>
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6 8.146L11.146 3l.707.707-5.146 5.147a1 1 0 01-1.414 0L.146 3.707.854 3 6 8.146z'
                  fill='currentColor'
                />
              </svg>
            </Popover>
            {!isAuthenticated && (
              <li className='flex items-center'>
                <Link className=' px-2 border-r border-r-white/50 hover:opacity-80' to={path.register}>
                  Sign Up
                </Link>
                <Link className=' px-2 hover:opacity-80' to={path.login}>
                  Login
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <Popover
                as={'li'}
                className='flex py-4 items-center gap-1 cursor-pointer hover:text-white/80'
                renderPopover={
                  <div className='bg-white min-w-[150px] rounded-sm shadow-sm text-black flex flex-col text-left text-base border border-t-0'>
                    <Link to={path.profile} className='pr-8 pl-4 py-2 hover:text-cyan-400 hover:bg-slate-100'>
                      My Profile
                    </Link>
                    <Link to={path.cart} className='pr-8 pl-4 py-2 hover:text-cyan-400 hover:bg-slate-100'>
                      My Cart
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='pr-8 pl-4 py-2 hover:text-cyan-400 hover:bg-slate-100 text-left'
                    >
                      Logout
                    </button>
                  </div>
                }
              >
                <img
                  className='w-[20px] h-[20px] object-cover rounded-full'
                  src='https://images.unsplash.com/photo-1680728841730-481c20899554?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
                  alt='avatar'
                />
                <span>{profile?.email}</span>
              </Popover>
            )}
          </ul>
        </div>
      </nav>
    </div>
  )
}
