import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

function Head() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // const navigate = useNavigate();

    useEffect(() => {
        // lưu token đăng nhập trong local storage
        const token = localStorage.getItem('accountId');
        const role = localStorage.getItem('accountRole') === 'user';
        if (token && role) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <div>
            <ToastContainer />
            {/*  header  */}
            <div className="top-header-area" id="sticker">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-sm-12 text-center">
                            <div className="main-menu-wrap">
                                {/*  logo  */}
                                <div className="site-logo">
                                    <Link to="/home">
                                        <div className="row">
                                            <div className="col-lg-8 offset-lg-2">
                                                <div className="breadcrumb-text">
                                                    <p><img src="assets/img/medicine-logo.png" alt="" />MEDICINE</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                {/*  logo  */}

                                {/*  menu start  */}
                                <nav className="main-menu">
                                    <ul>
                                        <li>
                                            <Link to="/home">Home</Link>
                                        </li>
                                        <li>
                                            <Link to="/product">Shop</Link>
                                        </li>
                                        <li>
                                            <Link to="/medicineType">Medicine types</Link>
                                        </li>
                                        <li>
                                            <div className="header-icons">
                                                <Link className="shopping-cart" to="/cart">
                                                    <i className="fas fa-shopping-cart"></i>
                                                </Link>
                                                {isLoggedIn ? (
                                                    <Link className="mobile-hide search-bar-icon" to="/account">
                                                        <i className="fas fa-user"></i> Account
                                                    </Link>
                                                ) : (
                                                    <Link className="mobile-hide search-bar-icon" to="/login">
                                                        <i className="fas fa-user"></i> Login
                                                    </Link>
                                                )}
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                                <a className="mobile-show search-bar-icon" href="#"><i className="fas fa-search"></i></a>
                                <div className="mobile-menu"></div>
                                {/*  menu end  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end header  */}
        </div >
    )
}

export default Head