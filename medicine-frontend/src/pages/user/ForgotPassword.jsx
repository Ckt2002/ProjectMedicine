import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from '../../components/user/Head';
import { useNavigate } from 'react-router-dom';
import Notification from './Notification';

function ForgotPassword() {
    const [currentForm, setCurrentForm] = useState(1);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [account, setAccount] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            // Kiểm tra email tồn tại và lấy thông tin tài khoản
            const response = await axios.get(`http://localhost:8080/api/account/email/${email}`);
            if (response.data) {
                // Gửi mã xác thực đến email
                await axios.get(`http://localhost:8080/api/account/send-email/${email}`);
                setAccount(response.data);
                setNotification({ message: 'Check verify code in your email', type: 'success' });
                setCurrentForm(2);
            } else {
                setNotification({ message: 'Email not found', type: 'error' });
            }
        } catch (error) {
            setNotification({ message: 'Error checking email: ' + error.message, type: 'error' });
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        try {
            const trimmedCode = code.trim();
            // Xác thực mã
            const response = await axios.get(`http://localhost:8080/api/account/confirm-email/${email}/${trimmedCode}`);
            if (response.status === 200) {
                setCurrentForm(3);
            } else {
                setNotification({ message: 'Invalid verification code.', type: 'error' });
            }
        } catch (error) {
            setNotification({ message: 'Error verifying code: ' + error.message, type: 'error' });
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== repeatPassword) {
            setNotification({ message: 'Passwords do not match.', type: 'error' });
            return;
        }
        try {
            const trimmedPassword = newPassword.trim();
            const updatedAccount = { ...account, password: trimmedPassword };
            // Cập nhật mật khẩu mới
            await axios.put('http://localhost:8080/api/account/updatePassword', updatedAccount);
            setNotification({ message: 'Password updated successfully.', type: 'success' });
            navigate('/login');
        } catch (error) {
            setNotification({ message: 'Error updating password: ' + error.message, type: 'error' });
        }
    };

    return (
        <div>
            <Head />
            <Notification message={notification.message} type={notification.type} />
            {/* breadcrumb-section  */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            {/* <div className="breadcrumb-text"> */}
                            <h1 style={{ color: 'white' }}>FORGOT PASSWORD</h1>
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="checkout-section mt-100 mb-150">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="checkout-accordion-wrap">
                                        <div className="accordion" id="accordionExample">
                                            <div className="card single-accordion">
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link" type="button" data-toggle="" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            FORGOT PASSWORD
                                                        </button>
                                                    </h5>
                                                </div>
                                                {currentForm === 1 && (
                                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div className="card-body">
                                                            <div className="billing-address-form">
                                                                <form onSubmit={handleEmailSubmit}>
                                                                    <p>Enter your email</p>
                                                                    <p><input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></p>
                                                                    <button type="submit" className="mybtn">
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {currentForm === 2 && (
                                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div className="card-body">
                                                            <div className="billing-address-form">
                                                                <form onSubmit={handleCodeSubmit}>
                                                                    <p>Restore code</p>
                                                                    <p><input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required /></p>
                                                                    <button type="submit" className="mybtn">
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {currentForm === 3 && (
                                                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div className="card-body">
                                                            <div className="billing-address-form">
                                                                <form onSubmit={handlePasswordSubmit}>
                                                                    <p>New password</p>
                                                                    <p><input type="password" placeholder="New password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required /></p>
                                                                    <p>Repeat password</p>
                                                                    <p><input type="password" placeholder="Repeat password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required /></p>
                                                                    <button type="submit" className="mybtn">
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
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
            {/* end breadcrumb section  */}
        </div>
    );
}

export default ForgotPassword