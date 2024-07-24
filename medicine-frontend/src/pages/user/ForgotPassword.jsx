import React, { useState } from 'react'
import Head from '../../components/user/Head'
import { Link, useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const [currentForm, setCurrentForm] = useState(1);

    // const nextForm = () => {
    //     setCurrentForm((prevForm) => (prevForm < 3 ? prevForm + 1 : prevForm));
    // };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentForm < 3) {
            setCurrentForm(currentForm + 1);
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            <Head />
            {/* breadcrumb-section  */}
            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            {/* <div class="breadcrumb-text"> */}
                            <h1 style={{ color: 'white' }}>FORGOT PASSWORD</h1>
                            {/* </div> */}
                        </div>
                    </div>
                    <div class="checkout-section mt-100 mb-150">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="checkout-accordion-wrap">
                                        <div class="accordion" id="accordionExample">
                                            <div class="card single-accordion">
                                                <div class="card-header" id="headingOne">
                                                    <h5 class="mb-0">
                                                        <button class="btn btn-link" type="button" data-toggle="" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                            FORGOT PASSWORD
                                                        </button>
                                                    </h5>
                                                </div>
                                                {currentForm === 1 && (
                                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div class="card-body">
                                                            <div class="billing-address-form">
                                                                <form onSubmit={handleSubmit}>
                                                                    <p>Enter your email</p>
                                                                    <p><input type="text" placeholder="Email" /></p>
                                                                    <button type="submit" className="mybtn">
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {currentForm === 2 && (
                                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div class="card-body">
                                                            <div class="billing-address-form">
                                                                <form onSubmit={handleSubmit}>
                                                                    <p>Restore code</p>
                                                                    <p><input type="text" placeholder="Code" /></p>
                                                                    <button type="submit" className="mybtn">
                                                                        Submit
                                                                    </button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {currentForm === 3 && (
                                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                        <div class="card-body">
                                                            <div class="billing-address-form">
                                                                <form onSubmit={handleSubmit}>
                                                                    <p>New password</p>
                                                                    <p><input type="password" placeholder="New password" /></p>
                                                                    <p>Repeat password</p>
                                                                    <p><input type="password" placeholder="Repeat password" /></p>
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
    )
}

export default ForgotPassword