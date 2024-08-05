import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function AdminAccount() {
    const [account, setAccount] = useState({});
    const [notification, setNotification] = useState({ message: '', type: '' });
    const location = useLocation();
    const navigate = useNavigate();
    const accountId = localStorage.getItem('accountId');

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/account/${accountId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                setAccount(response.data);
            } catch (error) {
                console.error('Error fetching account:', error);
                setNotification({ message: 'Error fetching account information', type: 'error' });
            }
        };

        if (accountId) {
            fetchAccount();
        }
    }, [accountId]);

    const handleChange = (field, value) => {
        setAccount((prevAccount) => ({ ...prevAccount, [field]: value }));
    };

    const handleUpdateAccount = async () => {
        try {
            const response = await axios.put('http://localhost:8080/api/account', account, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Account updated successfully', type: 'success' });
        } catch (error) {
            console.error('Error updating account:', error);
            setNotification({ message: 'Error updating account', type: 'error' });
        }
    };

    const handleChangePassword = () => {
        navigate('/admin/changePassword');
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
                                <div className="col-xl">
                                    <div className="card mb-4">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">Account</h5>
                                            {/* <small className="text-muted float-end">Edit view</small> */}
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="account-username">Username</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="account-username"
                                                        value={account.username || ''}
                                                        onChange={(e) => handleChange('username', e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="account-email">Email</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        id="account-email"
                                                        value={account.email || ''}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="account-first-name">First Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="account-first-name"
                                                        value={account.first_name || ''}
                                                        onChange={(e) => handleChange('first_name', e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="account-last-name">Last Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="account-last-name"
                                                        value={account.last_name || ''}
                                                        onChange={(e) => handleChange('last_name', e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="account-phone-number">Phone Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="account-phone-number"
                                                        value={account.phone_number || ''}
                                                        onChange={(e) => handleChange('phone_number', e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="account-address">Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="account-address"
                                                        value={account.address || ''}
                                                        onChange={(e) => handleChange('address', e.target.value)}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="account-role">Role</label>
                                                    <input
                                                        id="account-role"
                                                        className="form-control"
                                                        value={account.role || ''}
                                                        // onChange={(e) => handleChange('role', e.target.value)}
                                                        readOnly
                                                    >
                                                    </input>
                                                </div>
                                                <button type="button" className="btn btn-primarys"
                                                    style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }} onClick={handleUpdateAccount}>
                                                    Update Account
                                                </button>
                                                <button type="button" className="btn btn-primarys"
                                                    style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }}
                                                    onClick={handleChangePassword}>
                                                    Change Password
                                                </button>
                                            </form>
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

export default AdminAccount