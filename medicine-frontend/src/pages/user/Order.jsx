import React from 'react'
import Head from '../../components/user/Head'
import Footer from '../../components/user/Footer'
import { Link } from 'react-router-dom'

function Order() {
    return (
        <div>
            <Head />

            {/* breadcrumb-section  */}
            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="breadcrumb-text">
                                <h1>ORDER</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section  */}

            <div className="cart-section mt-80 mb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                        <tr className="table-head-row">
                                            <th className="product-image">Created date</th>
                                            <th className="product-name">Total price</th>
                                            <th className="product-price">Status</th>
                                            <th className="product-image">Updated date</th>
                                            <th className="product-quantity"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="table-body-row">
                                            <td className="product-name">03/06/2024</td>
                                            <td className="product-price">$100</td>
                                            <td className="product-quantity">Recieved</td>
                                            <td className="product-name">15/06/2024</td>
                                            <td className="product-total"><Link to="/detailOrder" class="boxed-btn">Detail</Link></td>
                                        </tr>
                                        <tr className="table-body-row">
                                            <td className="product-name">25/06/2024</td>
                                            <td className="product-price">$85</td>
                                            <td className="product-quantity">Checking</td>
                                            <td className="product-name">25/06/2024</td>
                                            <td className="product-total"><Link to="/detailOrder" class="boxed-btn">Detail</Link></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* <div className="col-lg-4">
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
                                            <td><strong>Subtotal: </strong></td>
                                            <td>$500</td>
                                        </tr>
                                        <tr className="total-data">
                                            <td><strong>Shipping: </strong></td>
                                            <td>$45</td>
                                        </tr>
                                        <tr className="total-data">
                                            <td><strong>Total: </strong></td>
                                            <td>$545</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    <a href="cart.html" className="boxed-btn">Update Cart</a>
                                    <a href="checkout.html" className="boxed-btn black">Check Out</a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Order