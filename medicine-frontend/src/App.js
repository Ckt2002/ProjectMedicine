import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import InactivityHandler from './pages/InactivityHandler';
import PrivateRouteAdmin from './pages/PrivateRouteAdmin';

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
import ChangePassword from './pages/user/ChangePassword';
import MedicineType from './pages/user/MedicineType';
import Recieve from './pages/user/Recieve';
import Cancel from './pages/user/Cancel';

import LoginAdmin from './pages/admin/LoginAdmin';
import ForgotPasswordAdmin from './pages/admin/ForgotPasswordAdmin';
import CreateOrderSupplierAdmin from './pages/admin/CreateOrderSupplierAdmin';
import CreateImportSupplier from './pages/admin/CreateImportSupplier';
import AddMedicineAdmin from './pages/admin/AddMedicineAdmin';
import Statistical from './pages/admin/Statistical';

import ListMedicineAdmin from './pages/admin/ListMedicineAdmin';
import ListMedicineType from './pages/admin/ListMedicineType';
import ListIngredientAdmin from './pages/admin/ListIngredientAdmin';
import ListBrandAdmin from './pages/admin/ListBrandAdmin';
import ListUserAccount from './pages/admin/ListUserAccount';
import ListOrderSupplier from './pages/admin/ListOrderSupplier';
import ListUserOrder from './pages/admin/ListUserOrder';
import ListImportSupplier from './pages/admin/ListImportSupplier';
import ListDosageForm from './pages/admin/ListDosageForm';
import ListEffect from './pages/admin/ListEffect';
import ListManufacturer from './pages/admin/ListManufacturer';
import ListContraindicated from './pages/admin/ListContraindicated';
import ListSupplier from './pages/admin/ListSupplier';
import ListDiscount from './pages/admin/ListDiscount';
import ListDetailMedicineAdmin from './pages/admin/ListDetailMedicineAdmin';
import ListDetailOrderSupplier from './pages/admin/ListDetailOrderSupplier';
import ListDetailImport from './pages/admin/ListDetailImport';
import ListDetailUserOrder from './pages/admin/ListDetailUserOrder';
import AdminAccount from './pages/admin/AdminAccount';
import AdminChangePassword from './pages/admin/AdminChangePassword';
import ListDetailDiscount from './pages/admin/ListDetailDiscount';
import ListUserRecieve from './pages/admin/ListUserRecieve';
import ListUserCancel from './pages/admin/ListUserCancel';
import ListUserConfirm from './pages/admin/ListUserConfirm';

function App() {

  return (
    <BrowserRouter>
      <InactivityHandler />
      <Routes>
        {/* User */}
        <Route path='/home' element={<Home />}></Route>
        <Route path='/product' element={<Product />}></Route>
        <Route path='/productDetail' element={<ProductDetail />}></Route>
        <Route path='/cart' element={<UserPrivateRoute><Cart /></UserPrivateRoute>}></Route>
        <Route path='/account' element={<UserPrivateRoute><Account /></UserPrivateRoute>}></Route>
        <Route path='/changePassword' element={<UserPrivateRoute><ChangePassword /></UserPrivateRoute>}></Route>
        <Route path='/order' element={<UserPrivateRoute><Order /></UserPrivateRoute>}></Route>
        <Route path='/recieve' element={<UserPrivateRoute><Recieve /></UserPrivateRoute>}></Route>
        <Route path='/cancel' element={<UserPrivateRoute><Cancel /></UserPrivateRoute>}></Route>
        <Route path='/detailOrder' element={<UserPrivateRoute><DetailOrder /></UserPrivateRoute>}></Route>
        <Route path='/medicineType' element={<MedicineType />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/forgotPassword' element={<ForgotPassword />}></Route>

        {/* Admin */}
        <Route path='/admin/login' element={<LoginAdmin />} />
        <Route path='/admin/forgotPassword' element={<ForgotPasswordAdmin />} />
        <Route path='/admin/createOrder' element={<PrivateRouteAdmin element={CreateOrderSupplierAdmin} />} />
        <Route path='/admin/createImport' element={<PrivateRouteAdmin element={CreateImportSupplier} />} />
        <Route path='/admin/addMedicine' element={<PrivateRouteAdmin element={AddMedicineAdmin} />} />
        <Route path='/admin/statistical' element={<PrivateRouteAdmin element={Statistical} />} />
        <Route path='/admin/detailMedicine' element={<PrivateRouteAdmin element={ListDetailMedicineAdmin} />} />
        <Route path='/admin/medicine' element={<PrivateRouteAdmin element={ListMedicineAdmin} />} />
        <Route path='/admin/medicineType' element={<PrivateRouteAdmin element={ListMedicineType} />} />
        <Route path='/admin/ingredient' element={<PrivateRouteAdmin element={ListIngredientAdmin} />} />
        <Route path='/admin/brand' element={<PrivateRouteAdmin element={ListBrandAdmin} />} />
        <Route path='/admin/userAccount' element={<PrivateRouteAdmin element={ListUserAccount} />} />
        <Route path='/admin/order' element={<PrivateRouteAdmin element={ListOrderSupplier} />} />
        <Route path='/admin/userOrder' element={<PrivateRouteAdmin element={ListUserOrder} />} />
        <Route path='/admin/userRecieve' element={<PrivateRouteAdmin element={ListUserRecieve} />} />
        <Route path='/admin/userCancel' element={<PrivateRouteAdmin element={ListUserCancel} />} />
        <Route path='/admin/userConfirm' element={<PrivateRouteAdmin element={ListUserConfirm} />} />
        <Route path='/admin/import' element={<PrivateRouteAdmin element={ListImportSupplier} />} />
        <Route path='/admin/dosageForm' element={<PrivateRouteAdmin element={ListDosageForm} />} />
        <Route path='/admin/effect' element={<PrivateRouteAdmin element={ListEffect} />} />
        <Route path='/admin/manufacturer' element={<PrivateRouteAdmin element={ListManufacturer} />} />
        <Route path='/admin/contraindication' element={<PrivateRouteAdmin element={ListContraindicated} />} />
        <Route path='/admin/supplier' element={<PrivateRouteAdmin element={ListSupplier} />} />
        <Route path='/admin/discount' element={<PrivateRouteAdmin element={ListDiscount} />} />
        <Route path='/admin/detailOrderSupplier' element={<PrivateRouteAdmin element={ListDetailOrderSupplier} />} />
        <Route path='/admin/detailImport' element={<PrivateRouteAdmin element={ListDetailImport} />} />
        <Route path='/admin/detailUserOrder' element={<PrivateRouteAdmin element={ListDetailUserOrder} />} />
        <Route path='/admin/account' element={<PrivateRouteAdmin element={AdminAccount} />} />
        <Route path='/admin/changePassword' element={<PrivateRouteAdmin element={AdminChangePassword} />} />
        <Route path='/admin/detailDiscount' element={<PrivateRouteAdmin element={ListDetailDiscount} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App