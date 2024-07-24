import React from 'react'
import Head from '../../components/user/Head'
import Footer from '../../components/user/Footer'

function Test() {
    return (
        <div>
            <Head />

            {/*  breadcrumb-section  */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>TEST</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end breadcrumb section  */}

            {/*  products  */}
            <div className="product-section mt-150 mb-150">
                <div className="container">

                    <div className="row">
                        <div className="col-md-12">
                            <div className="product-filters">
                                <ul>
                                    <li className="active" data-filter="*">All</li>
                                    <li data-filter=".strawberry">Strawberry</li>
                                    <li data-filter=".berry">Berry</li>
                                    <li data-filter=".lemon">Lemon</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="row product-lists">
                        <div className="col-lg-4 col-md-6 text-center strawberry">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-1.jpg" alt="" /></a>
                                </div>
                                <h3>Strawberry</h3>
                                <p className="product-price"><span>Per Kg</span> 85$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center berry">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-2.jpg" alt="" /></a>
                                </div>
                                <h3>Berry</h3>
                                <p className="product-price"><span>Per Kg</span> 70$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center lemon">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-3.jpg" alt="" /></a>
                                </div>
                                <h3>Lemon</h3>
                                <p className="product-price"><span>Per Kg</span> 35$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-4.jpg" alt="" /></a>
                                </div>
                                <h3>Avocado</h3>
                                <p className="product-price"><span>Per Kg</span> 50$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-5.jpg" alt="" /></a>
                                </div>
                                <h3>Green Apple</h3>
                                <p className="product-price"><span>Per Kg</span> 45$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center strawberry">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-6.jpg" alt="" /></a>
                                </div>
                                <h3>Strawberry</h3>
                                <p className="product-price"><span>Per Kg</span> 80$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="pagination-wrap">
                                <ul>
                                    <li><a href="#">Prev</a></li>
                                    <li><a href="#">1</a></li>
                                    <li><a className="active" href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">Next</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end products  */}

            <Footer />
        </div>
    )
}

export default Test