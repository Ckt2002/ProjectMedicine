import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// Giả định bạn đã có component Notification và Head
import Notification from './Notification';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';

function ChangePassword() {
    const [account, setAccount] = useState(null);
    const [currentForm, setCurrentForm] = useState(1);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
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


    const handleCurrentPasswordSubmit = async (e) => {
        e.preventDefault();
        const pass = currentPassword.trim();
        if (pass === account.password) {
            setCurrentForm(2);
        }
        else {
            setNotification({ message: 'Wrong password', type: 'error' });
        }
    };

    const handleNewPasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== repeatPassword) {
            setNotification({ message: 'Passwords do not match.', type: 'error' });
            return;
        }
        try {
            const trimmedPassword = newPassword.trim();
            const updatedAccount = { ...account, password: trimmedPassword };
            // Cập nhật mật khẩu mới
            // Giả định bạn đã có endpoint để cập nhật mật khẩu
            await axios.put('http://localhost:8080/api/account/updatePassword', updatedAccount);
            setNotification({ message: 'Password updated successfully.', type: 'success' });
            navigate('/account');
        } catch (error) {
            setNotification({ message: 'Error updating password: ' + error.message, type: 'error' });
        }
    };

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    return (
        <div>
            <Head />
            <Notification message={notification.message} type={notification.type} />
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>CHANGE PASSWORD</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ width: '80%', maxWidth: '1200px', margin: '50px auto' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="checkout-accordion-wrap">
                                <div className="accordion" id="accordionExample">
                                    <div className="card single-accordion">
                                        <div className="card-header" id="headingOne">
                                            <h5 className="mb-0">
                                                <button className="btn btn-link" type="button" data-toggle="collapse" aria-expanded="false" aria-controls="collapseOne">
                                                    Change Password
                                                </button>
                                            </h5>
                                        </div>

                                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="billing-address-form">
                                                    {currentForm === 1 && (
                                                        <form onSubmit={handleCurrentPasswordSubmit}>
                                                            <p>Current Password</p>
                                                            <p>
                                                                <input
                                                                    type="password"
                                                                    placeholder="Password"
                                                                    value={currentPassword}
                                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                                    required
                                                                />
                                                            </p>

                                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                                <button type="submit" className="mybtn">
                                                                    Submit
                                                                </button>
                                                            </div>
                                                        </form>
                                                    )}
                                                    {currentForm === 2 && (
                                                        <form onSubmit={handleNewPasswordSubmit}>
                                                            <p>New Password</p>
                                                            <p>
                                                                <input
                                                                    type="password"
                                                                    placeholder="New Password"
                                                                    value={newPassword}
                                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                                    required
                                                                />
                                                            </p>
                                                            <p>Repeat Password</p>
                                                            <p>
                                                                <input
                                                                    type="password"
                                                                    placeholder="Repeat Password"
                                                                    value={repeatPassword}
                                                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                                                    required
                                                                />
                                                            </p>

                                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                                <button type="submit" className="mybtn">
                                                                    Submit
                                                                </button>
                                                            </div>
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
            </div>

            <Footer />
        </div>
    );
}

export default ChangePassword;
