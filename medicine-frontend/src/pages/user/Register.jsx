import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from '../../components/user/Head';

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
        status: 'active' // default status
    });

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
                toast.error(`Please enter ${key.replace('_', ' ')}`);
                return;
            }
        }

        try {
            const response = await axios.post('http://localhost:8080/api/account', formData);
            if (response.status === 201) {
                toast.success('Registration successful!');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                toast.error(err.response.data);
            } else {
                toast.error('Registration failed!');
            }
        }
    };

    return (
        <div>
            <Head />
            <ToastContainer />
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
        </div>
    );
}

export default Register;