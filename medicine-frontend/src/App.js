import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './pages/user/Product';
import Cart from './pages/user/Cart';
import Home from './pages/user/Home';
import Account from './pages/user/Account';
import Order from './pages/user/Order';
import DetailOrder from './pages/user/DetailOrder';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import ForgotPassword from './pages/user/ForgotPassword';
import UserPrivateRoute from './pages/user/UserPrivateRoute';
import ProductDetail from './pages/user/ProductDetail';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/test' element={<Test />}></Route> */}
        <Route path='/home' element={<Home />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/productDetail' element={<ProductDetail />}></Route>
        <Route path='/cart' element={<UserPrivateRoute><Cart /></UserPrivateRoute>}></Route>
        <Route path='/account' element={<UserPrivateRoute><Account /></UserPrivateRoute>}></Route>
        <Route path='/order' element={<UserPrivateRoute><Order /></UserPrivateRoute>}></Route>
        <Route path='/detailOrder' element={<DetailOrder />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App