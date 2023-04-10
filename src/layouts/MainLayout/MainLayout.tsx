import Footer from '~/components/Footer'
import Header from '~/components/Header'
import { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
// interface Props {
//   children?: React.ReactNode
// }

export default function MainLayout() {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <Footer />
    </Fragment>
  )
}
