import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';

function DetailOrder() {
    const location = useLocation();
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        if (location.state && location.state.order) {
            console.log(location.state.order.id);
            const fetchOrderDetails = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/detail-order/order/${location.state.order.id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const data = response.data;

                    // Nhóm các chi tiết đơn hàng theo id của medicine
                    const groupedDetails = data.reduce((acc, detail) => {
                        const medicineId = detail.seri.medicine.id;
                        if (!acc[medicineId]) {
                            acc[medicineId] = { ...detail, quantity: 0 };
                        }
                        acc[medicineId].quantity += 1;
                        return acc;
                    }, {});

                    // Chuyển đổi đối tượng groupedDetails thành mảng
                    const updatedData = Object.values(groupedDetails);

                    // console.log(updatedData);
                    setOrderDetails(updatedData);
                } catch (error) {
                    console.error('Error fetching order details:', error);
                }
            };

            fetchOrderDetails();
        }
    }, [location.state]);

    return (
        <div>
            <Head />
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
            <div className="cart-section mt-80 mb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                        <tr className="table-head-row">
                                            <th className="product-image">Product Image</th>
                                            <th className="product-name">Name</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails.map((detail) => (
                                            <tr className="table-body-row" key={detail.seri.medicine.id}>
                                                <td className="product-image">
                                                    <img src={`/images/products/${detail.seri.medicine.image}`} alt="" />
                                                </td>
                                                <td className="product-name" style={{ maxWidth: '400px' }}>{detail.seri.medicine.name}</td>
                                                <td className="product-price">{detail.price} VND</td>
                                                <td className="product-quantity">{detail.quantity}</td>
                                            </tr>
                                        ))}
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
                                            <td>{orderDetails.reduce((acc, detail) => acc + detail.price * detail.quantity, 0)} VND</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default DetailOrder;
