import React from 'react'
import { Navigate } from 'react-router-dom';

function UserPrivateRoute({ children }) {
    const isLoggedIn = !!localStorage.getItem('accountId'); // Kiểm tra trạng thái đăng nhập từ localStorage

    return isLoggedIn ? children : <Navigate to="/login" />;
};

export default UserPrivateRoute