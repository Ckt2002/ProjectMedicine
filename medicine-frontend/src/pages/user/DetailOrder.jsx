import React from 'react'
import Head from '../../components/user/Head'
import Footer from '../../components/user/Footer'
import { Link } from 'react-router-dom'

function DetailOrder() {
    return (
        <div>
            <Head />

            {/* breadcrumb-section  */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>DETAIL ORDER</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section  */}

            <div className="cart-section mt-80 mb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                        <tr className="table-head-row">
                                            <th className="product-remove"></th>
                                            <th className="product-image">Product Image</th>
                                            <th className="product-name">Name</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                            <th className="product-total">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table-body-row">
                                            <td className="product-remove"><a href="#"><i className="far fa-window-close"></i></a></td>
                                            <td className="product-image"><img src="assets/img/products/product-img-1.jpg" alt="" /></td>
                                            <td className="product-name">Strawberry</td>
                                            <td className="product-price">$85</td>
                                            <td className="product-quantity">1</td>
                                            <td className="product-total">Recieved</td>
                                        </tr>
                                        <tr className="table-body-row">
                                            <td className="product-remove"><a href="#"><i className="far fa-window-close"></i></a></td>
                                            <td className="product-image"><img src="assets/img/products/product-img-2.jpg" alt="" /></td>
                                            <td className="product-name">Berry</td>
                                            <td className="product-price">$70</td>
                                            <td className="product-quantity">1</td>
                                            <td className="product-total">Recieved</td>
                                        </tr>
                                        <tr className="table-body-row">
                                            <td className="product-remove"><a href="#"><i className="far fa-window-close"></i></a></td>
                                            <td className="product-image"><img src="assets/img/products/product-img-3.jpg" alt="" /></td>
                                            <td className="product-name">Lemon</td>
                                            <td className="product-price">$35</td>
                                            <td className="product-quantity">1</td>
                                            <td className="product-total">Recieved</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="total-section">
                                <table className="total-table">
                                    <thead className="total-table-head">
                                        <tr className="table-total-row">
                                            <th>Total</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="total-data">
                                            <td><strong>Total: </strong></td>
                                            <td>$545</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    <Link to="" className="boxed-btn">Cancel order</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default DetailOrder