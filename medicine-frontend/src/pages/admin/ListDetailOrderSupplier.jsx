import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/admin/SideBar';

function ListDetailOrderSupplier() {
    const location = useLocation();
    const { orderSupplierId } = location.state || {};
    const [details, setDetails] = useState([]);

    useEffect(() => {
        console.log(orderSupplierId);
        axios.get(`http://localhost:8080/api/detail-order-supplier/${orderSupplierId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setDetails(response.data);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
            });
    }, [orderSupplierId]);

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />
                <div className="layout-page">
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                        id="layout-navbar">
                        {/* Searching */}
                        <div className="nav-item d-flex align-items-center" style={{ width: '100%' }}>
                            <i className="bx bx-search fs-10 lh-100"></i>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search..."
                                aria-label="Search..."
                                style={{ width: '100%' }}
                            />
                        </div>
                    </nav>
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-lg-12 mb-4 order-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Detail Order Supplier</h5>
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col" style={{ color: 'white' }}>Medicine ID</th>
                                                        <th scope="col" style={{ color: 'white' }}>Medicine Name</th>
                                                        <th scope="col" style={{ color: 'white' }}>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {details.map(detail => (
                                                        <tr key={detail.id.medicineId}>
                                                            <td>{detail.medicine.id}</td>
                                                            <td>{detail.medicine.name}</td>
                                                            <td>{detail.quantity}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
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

export default ListDetailOrderSupplier