import { Link } from 'react-router-dom'

const customerService = [
  { name: 'Help Centre' },
  { name: 'Shopee Blog' },
  { name: 'Shopee Mall' },
  { name: 'How To Buy' },
  { name: 'How To Sell' },
  { name: 'Payment' },
  { name: 'Shopee Coins' },
  { name: 'Shipping' },
  { name: 'Return & Refund' },
  { name: 'Contact Us' },
  { name: 'Warranty Policy' }
]

const aboutShopee = [
  { name: 'About Us' },
  { name: 'Shopee Careers' },
  { name: 'Shopee Policies' },
  { name: 'Privacy Policy' },
  { name: 'Shopee Mall' },
  { name: 'Seller Centre' },
  { name: 'Flash Deals' },
  { name: 'Shopee Ambassador Programme' },
  { name: 'Media Contact' }
]

const payment = [
  { image: 'https://down-vn.img.susercontent.com/file/d4bbea4570b93bfd5fc652ca82a262a8' },
  { image: 'https://down-vn.img.susercontent.com/file/a0a9062ebe19b45c1ae0506f16af5c16' },
  { image: 'https://down-vn.img.susercontent.com/file/38fd98e55806c3b2e4535c4e4a6c4c08' },
  { image: 'https://down-vn.img.susercontent.com/file/bc2a874caeee705449c164be385b796c' },
  { image: 'https://down-vn.img.susercontent.com/file/2c46b83d84111ddc32cfd3b5995d9281' },
  { image: 'https://down-vn.img.susercontent.com/file/5e3f0bee86058637ff23cfdf2e14ca09' },
  { image: 'https://down-vn.img.susercontent.com/file/9263fa8c83628f5deff55e2a90758b06' },
  { image: 'https://down-vn.img.susercontent.com/file/0217f1d345587aa0a300e69e2195c492' }
]

const logistics = [
  { image: 'https://down-vn.img.susercontent.com/file/5e7282bd0f7ee0872fdb0bd1d40fbe9e' },
  { image: 'https://down-vn.img.susercontent.com/file/d10b0ec09f0322f9201a4f3daf378ed2' },
  { image: 'https://down-vn.img.susercontent.com/file/77bf96a871418fbc21cc63dd39fb5f15' },
  { image: 'https://down-vn.img.susercontent.com/file/59270fb2f3fbb7cbc92fca3877edde3f' },
  { image: 'https://down-vn.img.susercontent.com/file/957f4eec32b963115f952835c779cd2c' },
  { image: 'https://down-vn.img.susercontent.com/file/0d349e22ca8d4337d11c9b134cf9fe63' },
  { image: 'https://down-vn.img.susercontent.com/file/3900aefbf52b1c180ba66e5ec91190e5' },
  { image: 'https://down-vn.img.susercontent.com/file/6e3be504f08f88a15a28a9a447d94d3d' },
  { image: 'https://down-vn.img.susercontent.com/file/b8348201b4611fc3315b82765d35fc63' },
  { image: 'https://down-vn.img.susercontent.com/file/0b3014da32de48c03340a4e4154328f6' }
]

const followUs = [
  { name: 'Facebook', image: 'https://down-vn.img.susercontent.com/file/2277b37437aa470fd1c71127c6ff8eb5' },
  { name: 'Instagram', image: 'https://down-vn.img.susercontent.com/file/5973ebbc642ceee80a504a81203bfb91' },
  { name: 'LinkedIn', image: 'https://down-vn.img.susercontent.com/file/f4f86f1119712b553992a75493065d9a' }
]
const shopeeAppDownload = [
  { image: 'https://down-vn.img.susercontent.com/file/ad01628e90ddf248076685f73497c163' },
  { image: 'https://down-vn.img.susercontent.com/file/ae7dced05f7243d0f3171f786e123def' },
  { image: 'https://down-vn.img.susercontent.com/file/35352374f39bdd03b25e7b83542b2cb0' }
]
const country = [
  { name: 'Singapore' },
  { name: 'Indonesia' },
  { name: 'Taiwan' },
  { name: 'Thailand' },
  { name: 'Malaysia' },
  { name: 'Vietnam' },
  { name: 'Philippines' },
  { name: 'Brazil' },
  { name: 'México' },
  { name: 'Colombia' },
  { name: 'Chile' }
]
export default function Footer() {
  return (
    <footer className='bg-[#f5f5f5]'>
      <div className='bg-[#fbfbfb]'>
        <div className='min-w-[1210px] w-[1200px] mx-auto px-20 pt-[60px]'>
          <div className='grid grid-cols-5 gap-4 pb-[30px] border-b border-b-gray-300'>
            <div className='col-span-1 text-left'>
              <div className='text-sm font-bold text-black/70'>CUSTOMER SERVICE</div>
              <ul className='text-[#000000a6] mt-4 text-sm'>
                {customerService.map((item) => (
                  <li key={item.name} className='mt-2'>
                    <Link to='/' className='hover:text-orange'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='col-span-1 text-left'>
              <div className='text-sm font-bold text-black/70'>CUSTOMER SERVICE</div>
              <ul className='text-[#000000a6] mt-4 text-sm'>
                {aboutShopee.map((item) => (
                  <li key={item.name} className='mt-2'>
                    <Link to='/' className='hover:text-orange'>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='col-span-1 text-left'>
              <div className='text-sm font-bold text-black/70'>PAYMENT</div>
              <ul className='text-[#000000a6] mt-4 text-sm flex flex-wrap gap-2'>
                {payment.map((item) => (
                  <li key={item.image} className='w-[60px] h-[30px] p-1 rounded shadow bg-white'>
                    <div className='h-full w-full flex items-center justify-center'>
                      <img src={item.image} alt='logo' />
                    </div>
                  </li>
                ))}
              </ul>
              <div className='text-sm font-bold text-black/70 mt-4'>LOGISTICS</div>
              <ul className='text-[#000000a6] mt-4 text-sm flex flex-wrap gap-2'>
                {logistics.map((item) => (
                  <li key={item.image} className='w-[60px] h-[30px] p-1 rounded shadow bg-white'>
                    <div className='h-full w-full flex items-center justify-center'>
                      <img src={item.image} alt='logo' />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className='col-span-1 text-left'>
              <div className='text-sm font-bold text-black/70'>FOLLOW US</div>
              <ul className='text-[#000000a6] mt-4 text-sm'>
                {followUs.map((item) => (
                  <li key={item.name} className='mb-2'>
                    <Link to='/'>
                      <div className='flex items-center gap-2'>
                        <img src={item.image} alt='' />
                        <span className='hover:text-orange'>{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className='col-span-1 text-left'>
              <div className='text-sm font-bold text-black/70'>SHOPEE APP DOWNLOAD</div>
              <div className='mt-4 flex items-start gap-2'>
                <Link to='/'>
                  <img
                    src='https://down-vn.img.susercontent.com/file/a5e589e8e118e937dc660f224b9a1472'
                    className='w-[88px] h-[88px] p-1 rounded-sm shadow bg-white'
                    alt='download_qr_code'
                  />
                </Link>
                <div>
                  {shopeeAppDownload.map((item) => (
                    <Link key={item.image} to='/' className='w-[4.25rem] h-4'>
                      <img src={item.image} className='w-full h-full p-1 rounded-sm shadow bg-white mb-2' alt='app' />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='min-w-[1210px] w-[1200px] mx-auto px-20'>
          <div className='py-8 flex flex-wrap items-center justify-between'>
            <div className='flex-shrink-0 text-[#000000a6] text-sm'>© 2023 Shopee. All Rights Reserved.</div>
            <div className='flex items-center justify-center flex-wrap'>
              <div className='text-[#000000a6] text-sm'>Country & Region:</div>
              {country.map((item) => (
                <div
                  key={item.name}
                  className='text-[#000000a6] text-sm px-[5px] border-r last:border-r-0 border-r-gray-400/80'
                >
                  <Link to='/'>{item.name}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='min-w-[1200px] w-[1200px] mx-auto px-20 py-10'>
        <div className='flex items-center justify-center mb-10'>
          <Link to='/' className='text-[#000000a6] text-xs px-[25px] border-r border-r-gray-400/80'>
            PRIVACY POLICY
          </Link>
          <Link to='/' className='text-[#000000a6] text-xs px-[25px] border-r border-r-gray-400/80'>
            TERM OF SERVICE
          </Link>
          <Link to='/' className='text-[#000000a6] text-xs px-[25px] border-r border-r-gray-400/80'>
            SHIPPING POLICY
          </Link>
          <Link to='/' className='text-[#000000a6] text-xs px-[25px]'>
            VIOLATION
          </Link>
        </div>
        <div className='flex items-center justify-center'>
          <Link to='/' className='mx-5'>
            <div className='w-[120px] h-[45px] bg-footer-registered bg-no-repeat bg-[14.391143911439114%_99.41176470588235%]'></div>
          </Link>
          <Link to='/' className='mx-5'>
            <div className='w-[120px] h-[45px] bg-footer-registered bg-no-repeat bg-[14.391143911439114%_99.41176470588235%]'></div>
          </Link>
          <Link to='/' className='mx-5'>
            <div className='w-[48px] h-[48px] bg-footer-registered bg-no-repeat bg-[1.6286644951140066%_92.21556886227545%]'></div>
          </Link>
        </div>
        <div className='mt-2 text-center text-xs text-[#000000a6] font-medium'>
          <div>Công ty TNHH Shopee</div>
          <div className='mt-6'>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </div>
          <div className='mt-2'>
            Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)
          </div>
          <div className='mt-2'>
            Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015
          </div>
          <div className='mt-2'>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</div>
        </div>
      </div>
    </footer>
  )
}
