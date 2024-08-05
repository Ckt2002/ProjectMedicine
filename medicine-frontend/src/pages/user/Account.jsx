import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';
import { Link, useNavigate } from 'react-router-dom';
import Notification from './Notification';

function Account() {
    const [account, setAccount] = useState(null);
    const [originalAccount, setOriginalAccount] = useState(null);
    const [isFormChanged, setIsFormChanged] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const getAccount = async (accountId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/account/${accountId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAccount(response.data);
            setOriginalAccount(response.data);
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
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!account) {
            setNotification({ message: 'Account information is missing', type: 'error' });
            return;
        }
        try {
            const response = await axios.put('http://localhost:8080/api/account', account, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setOriginalAccount(response.data);
            setIsFormChanged(false);
            setNotification({ message: 'Account updated successfully!', type: 'success' });
        } catch (error) {
            setNotification({ message: 'There was an error updating the data!', type: 'error' });
        }
    };

    const handleLogout = async () => {
        try {
            console.log(localStorage.getItem('token'));
            const response = await axios.post('http://localhost:8080/api/account/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                withCredentials: true
            });
            if (response.status === 200) {
                localStorage.removeItem('accountId');
                localStorage.removeItem('token');
                localStorage.removeItem('accountRole');
                navigate('/home');
            }
        } catch (error) {
            setNotification({ message: 'Error during logout', type: 'error' });
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount({ ...account, [name]: value });

        setIsFormChanged(
            JSON.stringify({ ...account, [name]: value }) !== JSON.stringify(originalAccount)
        );
    };

    const handleCancel = () => {
        setAccount(originalAccount);
        setIsFormChanged(false);
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
                                <h1>ACCOUNT</h1>
                                <div className="hero-btns">
                                    <button onClick={handleLogout} style={{
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
                                        <i className="fas fa-sign-out-alt"></i> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="checkout-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="checkout-accordion-wrap">
                                <div className="accordion" id="accordionExample">
                                    <div className="card single-accordion">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" aria-expanded="true" aria-controls="collapseOne">
                                                    Account Information
                                                </button>
                                            </h5>
                                        </div>

                                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="billing-address-form">
                                                    <form onSubmit={handleSubmit}>
                                                        <h5><strong>Account</strong></h5>
                                                        <p>Username</p>
                                                        <p>
                                                            <input
                                                                type="text"
                                                                placeholder="Username"
                                                                name="username"
                                                                value={account?.username || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </p>
                                                        <p>Email</p>
                                                        <p>
                                                            <input
                                                                type="email"
                                                                placeholder="Email"
                                                                name="email"
                                                                value={account?.email || ''}
                                                                readOnly
                                                            />
                                                        </p>

                                                        <h5><strong>Personal Information</strong></h5>
                                                        <p>First name</p>
                                                        <p>
                                                            <input
                                                                type="text"
                                                                placeholder="Your first name"
                                                                name="first_name"
                                                                value={account?.first_name || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </p>
                                                        <p>Last name</p>
                                                        <p>
                                                            <input
                                                                type="text"
                                                                placeholder="Your last name"
                                                                name="last_name"
                                                                value={account?.last_name || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </p>
                                                        <p>Phone number</p>
                                                        <p>
                                                            <input
                                                                type="text"
                                                                placeholder="Phone number"
                                                                name="phone_number"
                                                                value={account?.phone_number || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </p>
                                                        <p>Address</p>
                                                        <p>
                                                            <input
                                                                type="text"
                                                                placeholder="Address"
                                                                name="address"
                                                                value={account?.address || ''}
                                                                onChange={handleChange}
                                                            />
                                                        </p>

                                                        <div style={{ display: 'flex', gap: '10px' }}>
                                                            {isFormChanged && (
                                                                <>
                                                                    <button type="submit" className="mybtn">
                                                                        Update
                                                                    </button>
                                                                    <button type="button" className="mybtn" onClick={handleCancel}>
                                                                        Cancel
                                                                    </button>
                                                                </>
                                                            )}
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="order-details-wrap">
                                <table className="order-details">
                                    <tbody className="order-details-body">
                                        <tr>
                                            <td><Link to="/cart" className="">Cart</Link></td>
                                        </tr>
                                        <tr>
                                            <td><Link to="/order" className="">Order</Link></td>
                                        </tr>
                                        <tr>
                                            <td><Link to="/recieve" className="">Order recieved</Link></td>
                                        </tr>
                                        <tr>
                                            <td><Link to="/cancel" className="">Order canceled</Link></td>
                                        </tr>
                                        <tr>
                                            <td><Link to="/changePassword" className="">Change password</Link></td>
                                        </tr>
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

export default Account;
