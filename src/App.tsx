import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import ProductDetail from './pages/ProductDetail'
import ProductList from './pages/ProductList'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import CartLayout from './layouts/CartLayout'
import Cart from './pages/Cart'
import UserLayout from './pages/User/layouts/UserLayout'
import Profile from './pages/User/pages/Profile'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase/HistoryPurchase'
import NotFound from './pages/NotFound'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useContext } from 'react'
import { AppContext } from './Contexts/app.context'

export default function App() {
  const { isAuthenticated } = useContext(AppContext)
  const ProtectedRoute = () => {
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
  }
  const RejectedRoute = () => {
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.profile} />
  }

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={path.home} element={<ProductList />} />
          <Route path={path.productDetail} element={<ProductDetail />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<UserLayout />}>
              <Route path={path.user} element={<Profile />} />
              <Route path={path.profile} element={<Profile />} />
              <Route path={path.changePassword} element={<ChangePassword />} />
              <Route path={path.historyPurchase} element={<HistoryPurchase />} />
            </Route>
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<CartLayout />}>
            <Route path={path.cart} element={<Cart />} />
          </Route>
        </Route>

        <Route element={<RejectedRoute />}>
          <Route element={<RegisterLayout />}>
            <Route path={path.login} element={<Login />} />
            <Route path={path.register} element={<Register />} />
          </Route>
        </Route>

        <Route path={path.star} element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  )
}
