import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListDetailUserOrder() {
    const [details, setDetails] = useState([]);
    const [order, setOrder] = useState(null);
    const location = useLocation();
    const orderId = location.state?.orderId;

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
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/detail-order/order/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setDetails(response.data);
            } catch (error) {
                setNotification({ message: 'Error fetching order details', type: 'error' });
                console.error('Error fetching order details:', error);
            }
        };

        const fetchOrder = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setOrder(response.data);
            } catch (error) {
                console.error('Error fetching order:', error);
            }
        };

        if (orderId) {
            fetchOrderDetails();
            fetchOrder();
        }
    }, [orderId]);

    const handleConfirm = async (order) => {
        const updatedOrder = { ...order, status: 'confirm' };

        try {
            await axios.put('http://localhost:8080/api/order', updatedOrder, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setOrder(updatedOrder);
            setNotification({ message: 'Order updated successfully', type: 'success' });
            console.log('Order updated successfully');
        } catch (error) {
            setNotification({ message: 'Error updating order status', type: 'error' });
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />
                <Notification message={notification.message} type={notification.type} />
                <div className="layout-page">
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-lg-12 mb-4 order-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5>Order Details</h5>
                                            {order && (
                                                <div>
                                                    <p>Order ID: {order.id}</p>
                                                    <p>Total Price: {order.totalPrice}</p>
                                                    <p>Order Date: {new Date(order.orderDate).toLocaleString()}</p>
                                                    <p>Updated Date: {new Date(order.updatedDate).toLocaleString()}</p>
                                                    <p>Status: {order.status}</p>
                                                    {order.status === 'ordered' && (
                                                        <button
                                                            className="btn btn-info"
                                                            style={{ marginBottom: '20px' }}
                                                            onClick={() => handleConfirm(order)}
                                                        >
                                                            Confirm
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col" style={{ color: 'white' }}>#</th>
                                                        <th scope="col" style={{ color: 'white' }}>Seri ID</th>
                                                        <th scope="col" style={{ color: 'white' }}>Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {details.map((detail, index) => (
                                                        <tr key={detail.id.seriId}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{detail.seri.id}</td>
                                                            <td>{detail.price}</td>
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

export default ListDetailUserOrder