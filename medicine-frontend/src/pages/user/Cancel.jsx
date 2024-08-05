import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';
import Notification from './Notification';

function Cancel() {
    const [orders, setOrders] = useState([]);
    const [account, setAccount] = useState("");
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const getAccount = async (accountId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/account/${accountId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAccount(response.data);
        } catch (error) {
            setNotification({ message: 'There was an error fetching the data!', type: 'error' });
        }
    };

    useEffect(() => {
        const accountId = localStorage.getItem('accountId');
        if (accountId) {
            getAccount(accountId);
        }
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/order/account/${account.id}/status/canceled`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [account.id]);

    const handleDetailClick = (order) => {
        navigate('/detailOrder', { state: { order } });
    };

    return (
        <div>
            <Head />
            <Notification message={notification.message} type={notification.type} />
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>ORDER CANCELED</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cart-section mt-80 mb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                        <tr className="table-head-row">
                                            <th className="product-image">Created date</th>
                                            <th className="product-name">Total price</th>
                                            <th className="product-price">Status</th>
                                            <th className="product-image">Updated date</th>
                                            <th className="product-quantity"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(orders) && orders
                                            .map((order) => (
                                                <tr className="table-body-row" key={order.id}>
                                                    <td className="product-name">{new Date(order.orderDate).toLocaleDateString()}</td>
                                                    <td className="product-price">{order.totalPrice} VND</td>
                                                    <td className="product-quantity">{order.status}</td>
                                                    <td className="product-name">{new Date(order.updatedDate).toLocaleDateString()}</td>
                                                    <td className="product-total">
                                                        <button onClick={() => handleDetailClick(order)} className="boxed-btn" style={{
                                                            backgroundColor: '#F28123',
                                                            color: 'white',
                                                            borderRadius: '50px',
                                                            padding: '10px 20px',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            transition: 'background-color 0.3s, color 0.3s'
                                                        }}
                                                            onMouseEnter={(e) => {
                                                                e.target.style.backgroundColor = 'white';
                                                                e.target.style.color = 'black';
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                e.target.style.backgroundColor = '#F28123';
                                                                e.target.style.color = 'white';
                                                            }}>
                                                            Detail
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Cancel