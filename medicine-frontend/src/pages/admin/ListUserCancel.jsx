import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListUserCancel() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/order/status/canceled', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                setOrders(response.data);
            } catch (error) {
                setNotification({ message: 'Error fetching orders', type: 'success' });
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleDetailClick = (orderId) => {
        navigate('/admin/detailUserOrder', { state: { orderId } });
    };

    // const handleStatusChange = async (event, orderId) => {
    //     const newStatus = event.target.value;
    //     const updatedOrders = orders.map(order =>
    //         order.id === orderId ? { ...order, status: newStatus } : order
    //     );
    //     setOrders(updatedOrders);

    //     const updatedOrder = updatedOrders.find(order => order.id === orderId);

    //     try {
    //         await axios.put('http://localhost:8080/api/order', updatedOrder, {
    //             headers: {
    //                 'Authorization': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         });
    //         setNotification({ message: 'Order updated successfully', type: 'success' });
    //         console.log('Order updated successfully');
    //     } catch (error) {
    //         setNotification({ message: 'Error updating order status', type: 'success' });
    //         console.error('Error updating order status:', error);
    //     }
    // };

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />
                <Notification message={notification.message} type={notification.type} />
                <div className="layout-page">
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                        <div className="nav-item d-flex align-items-center" style={{ width: '100%' }}>
                            <i className="bx bx-search fs-10 lh-100"></i>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search..."
                                aria-label="Search..."
                                style={{ width: '100%' }}
                            />
                        </div>
                    </nav>
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-lg-12 mb-4 order-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col" style={{ color: 'white' }}>#</th>
                                                        <th scope="col" style={{ color: 'white' }}>Order ID</th>
                                                        <th scope="col" style={{ color: 'white' }}>Account</th>
                                                        <th scope="col" style={{ color: 'white' }}>Total Price</th>
                                                        <th scope="col" style={{ color: 'white' }}>Order Date</th>
                                                        <th scope="col" style={{ color: 'white' }}>Status</th>
                                                        <th scope="col" style={{ color: 'white' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map((order, index) => (
                                                        <tr key={order.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{order.id}</td>
                                                            <td>{order.accountUser.username}</td>
                                                            <td>{order.totalPrice}</td>
                                                            <td>{new Date(order.orderDate).toLocaleString()}</td>
                                                            <td>{order.status}
                                                            </td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-info"
                                                                    onClick={() => handleDetailClick(order.id)}
                                                                >
                                                                    Detail
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListUserCancel