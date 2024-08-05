import React, { useEffect, useState } from 'react';
import Head from '../../components/user/Head';
import Notification from './Notification';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/account/login/${username}/${password}`);
            const { accountId, token } = response.data;
            localStorage.setItem('accountId', accountId);
            localStorage.setItem('token', token);
            localStorage.setItem('accountRole', 'user');
            setNotification({ message: 'Login successful!', type: 'success' });
            navigate('/home');
        } catch (error) {
            let errorMessage = 'Invalid username or password';
            if (error.response && error.response.data && error.response.data.error) {
                errorMessage = error.response.data.error;
            }
            setNotification({ message: errorMessage, type: 'error' });
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
                            <h1 style={{ color: 'white' }}>LOGIN</h1>
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
                                                            Login
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body">
                                                        <div className="billing-address-form">
                                                            <form onSubmit={handleLogin}>
                                                                <p>Username</p>
                                                                <p><input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></p>
                                                                <p>Password</p>
                                                                <p><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /></p>
                                                                <button type="submit" className="mybtn">
                                                                    Login
                                                                </button>
                                                            </form>
                                                            <br />
                                                            <Link to={'/register'}>Register</Link>
                                                            <br />
                                                            <Link to={'/forgotPassword'}>Forgot Password?</Link>
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
        </div>
    );
};

export default Login;
