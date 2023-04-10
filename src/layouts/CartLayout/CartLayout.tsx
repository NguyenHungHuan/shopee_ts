import React from 'react'
import { Outlet } from 'react-router-dom'
import CartHeader from '~/components/CartHeader'
import Footer from '~/components/Footer'

export default function CartLayout() {
  return (
    <>
      <CartHeader />
      <Outlet />
      <Footer />
    </>
  )
}
