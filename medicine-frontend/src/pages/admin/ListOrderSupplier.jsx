import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListOrderSupplier() {
    const navigate = useNavigate();
    const [orderSuppliers, setOrderSuppliers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/order_supplier', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setOrderSuppliers(response.data);
            })
            .catch(error => {
                console.error('Error fetching order suppliers:', error);
            });
    }, []);

    const handleDetailClick = (orderSupplierId) => {
        console.log(orderSupplierId);
        navigate('/admin/detailOrderSupplier', { state: { orderSupplierId } });
    };

    const handleImportClick = (orderSupplierId) => {
        navigate('/admin/createImport', { state: { orderSupplierId } });
    };

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
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col" style={{ color: 'white' }}>Order ID</th>
                                                        <th scope="col" style={{ color: 'white' }}>Order Date</th>
                                                        <th scope="col" style={{ color: 'white' }}>Status</th>
                                                        <th scope="col" style={{ color: 'white' }}>Supplier</th>
                                                        <th scope="col" style={{ color: 'white' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orderSuppliers.map((orderSupplier, index) => (
                                                        <tr key={orderSupplier.id}>
                                                            <th scope="row">{orderSupplier.id}</th>
                                                            <td>{new Date(orderSupplier.orderDate).toLocaleDateString()}</td>
                                                            <td>{orderSupplier.status}</td>
                                                            <td>{orderSupplier.supplier.name}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-info"
                                                                    onClick={() => handleDetailClick(orderSupplier.id)}
                                                                >
                                                                    Detail
                                                                </button>
                                                                {orderSupplier.status !== 'imported' && (
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        style={{ backgroundColor: '#6f42c1', color: 'white', marginLeft: '10px' }}
                                                                        onMouseEnter={(e) => {
                                                                            e.target.style.backgroundColor = 'white';
                                                                            e.target.style.color = 'gray';
                                                                        }}
                                                                        onMouseLeave={(e) => {
                                                                            e.target.style.backgroundColor = '#6f42c1';
                                                                            e.target.style.color = 'white';
                                                                        }}
                                                                        onClick={() => handleImportClick(orderSupplier.id)}
                                                                    >
                                                                        Import
                                                                    </button>
                                                                )}
                                                            </td>
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

export default ListOrderSupplier