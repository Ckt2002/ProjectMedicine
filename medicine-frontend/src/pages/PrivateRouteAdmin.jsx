import { Navigate } from 'react-router-dom';

const PrivateRouteAdmin = ({ element: Component, ...rest }) => {
    const accountId = localStorage.getItem('accountId');
    const role = localStorage.getItem('accountRole');

    // console.log(localStorage.getItem('accountId'));
    // console.log(localStorage.getItem('accountRole'));

    if (!accountId || role !== 'admin') {
        // Nếu không có token hoặc không phải admin, chuyển hướng đến trang đăng nhập
        return <Navigate to="/admin/login" />;
    }
    // Nếu có token và là admin, cho phép truy cập vào trang
    return <Component {...rest} />;
};

export default PrivateRouteAdmin;