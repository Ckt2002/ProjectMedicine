import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function AdminChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [step, setStep] = useState(1);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [account, setAccount] = useState(null);
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

    const handleVerifyCurrentPassword = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/account/${accountId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            setAccount(response.data)
            if (response.data.password === currentPassword) {
                setStep(2);
            } else {
                setNotification({ message: 'Current password is incorrect', type: 'error' });
            }
        } catch (error) {
            setNotification({ message: 'Error verifying current password', type: 'error' });
        }
    };

    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setNotification({ message: 'New passwords do not match', type: 'error' });
            return;
        }
        try {
            const newAccount = {
                ...account,
                password: newPassword
            };
            console.log(newAccount);
            await axios.put('http://localhost:8080/api/account', newAccount, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Password updated successfully', type: 'success' });
            navigate('/admin/account');
        } catch (error) {
            setNotification({ message: 'Error updating password', type: 'error' });
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
                                <div className="col-xl">
                                    <div className="card mb-4">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">Change Password</h5>
                                        </div>
                                        <div className="card-body">
                                            {step === 1 && (
                                                <form onSubmit={handleVerifyCurrentPassword}>
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="current-password">Current Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="current-password"
                                                            value={currentPassword}
                                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-primarys"
                                                        style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.backgroundColor = 'white';
                                                            e.target.style.color = 'gray';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.backgroundColor = '#6f42c1';
                                                            e.target.style.color = 'white';
                                                        }}>Verify Password</button>
                                                </form>
                                            )}
                                            {step === 2 && (
                                                <form onSubmit={handleUpdatePassword}>
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="new-password">New Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="new-password"
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label" htmlFor="confirm-new-password">Confirm New Password</label>
                                                        <input
                                                            type="password"
                                                            className="form-control"
                                                            id="confirm-new-password"
                                                            value={confirmNewPassword}
                                                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <button type="submit" className="btn btn-primarys"
                                                        style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.backgroundColor = 'white';
                                                            e.target.style.color = 'gray';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.backgroundColor = '#6f42c1';
                                                            e.target.style.color = 'white';
                                                        }}>Update Password</button>
                                                </form>
                                            )}
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

export default AdminChangePassword