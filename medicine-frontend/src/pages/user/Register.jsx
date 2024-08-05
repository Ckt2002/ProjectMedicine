import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Head from '../../components/user/Head';
import Notification from './Notification';

function Register() {
    const [formData, setFormData] = useState({
        id: '0',
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        role: 'user', // default role
        status: 'inactive' // default status
    });
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra xem tất cả các trường đã được nhập hay chưa
        for (let key in formData) {
            if (!formData[key]) {
                setNotification({ message: `Please enter ${key.replace('_', ' ')}`, type: 'error' });
                return;
            }
        }

        try {
            // Send confirmation email
            const emailResponse = await axios.get(`http://localhost:8080/api/account/send-email/${formData.email}`);
            if (emailResponse.status === 200) {
                // const response = await axios.post('http://localhost:8080/api/account', formData);
                setEmail(formData.email);
                setIsVerificationModalOpen(true);
                setNotification({ message: 'Verification email sent. Please check your email.', type: 'success' });
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setNotification({ message: err.response.data, type: 'error' });
            } else {
                setNotification({ message: 'Registration failed!', type: 'error' });
            }
        }
    };

    const handleVerification = async () => {
        try {
            // console.log("verificationCode: ", verificationCode);
            const response = await axios.get(`http://localhost:8080/api/account/confirm-email/${email}/${verificationCode}`);
            if (response.status === 200) {
                // Update the user's status to 'active'
                const accountResponse = await axios.post('http://localhost:8080/api/account/add', {
                    ...formData,
                    status: 'active'
                });
                if (accountResponse.status === 201) {
                    setNotification({ message: 'Registration successful! You can now log in.', type: 'success' });
                }
                setIsVerificationModalOpen(false);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setNotification({ message: err.response.data, type: 'error' });
            } else {
                setNotification({ message: 'Invalid verification code!', type: 'error' });
            }
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
                            <h1 style={{ color: 'white' }}>REGISTER</h1>
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
                                                            REGISTER
                                                        </button>
                                                    </h5>
                                                </div>

                                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <div className="billing-address-form">
                                                            <form onSubmit={handleSubmit}>
                                                                <p>Username</p>
                                                                <p><input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} /></p>
                                                                <p>Email</p>
                                                                <p><input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /></p>
                                                                <p>Password</p>
                                                                <p><input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} /></p>
                                                                <p>First name</p>
                                                                <p><input type="text" name="first_name" placeholder="First name" value={formData.first_name} onChange={handleChange} /></p>
                                                                <p>Last name</p>
                                                                <p><input type="text" name="last_name" placeholder="Last name" value={formData.last_name} onChange={handleChange} /></p>
                                                                <p>Address</p>
                                                                <p><input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} /></p>
                                                                <p>Phone number</p>
                                                                <p><input type="text" name="phone_number" placeholder="Phone number" value={formData.phone_number} onChange={handleChange} /></p>
                                                                <button type="submit" className="mybtn">
                                                                    Register
                                                                </button>
                                                            </form>
                                                            <br />
                                                            <Link to={'/login'}>Login</Link>
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
                </div>
            </div>

            {/* Verification Modal */}
            {isVerificationModalOpen && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        padding: '20px',
                        borderRadius: '8px',
                        textAlign: 'center'
                    }}>
                        <h2>Email Verification</h2>
                        <p>Please enter the verification code sent to your email.</p>
                        <input
                            type="text"
                            placeholder="Verification Code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            style={{
                                marginRight: '20px' // Thêm khoảng cách bên phải của input
                            }}
                        />
                        <button onClick={handleVerification} style={{
                            backgroundColor: '#F28123',
                            color: 'white',
                            borderRadius: '50px',
                            padding: '5px 20px',
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
                            }}>Verify</button>
                    </div>
                </div>
            )}
        </div >
    );
}

export default Register;
