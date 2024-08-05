import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../components/admin/SideBar';

function ListImportSupplier() {
    const navigate = useNavigate();
    const [importSuppliers, setImportSuppliers] = useState([]);

    useEffect(() => {
        const fetchImportSuppliers = async () => {
            try {
                const data = await getImportSuppliers();
                setImportSuppliers(data);
            } catch (error) {
                console.error('Error fetching import suppliers:', error);
            }
        };

        fetchImportSuppliers();
    }, []);

    const getImportSuppliers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/import_supplier', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching import suppliers:', error);
            throw error;
        }
    };

    const handleDetailClick = (importSupplierId) => {
        navigate('/admin/detailImport', { state: { importSupplierId } });
    };

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />
                <div className="layout-page">
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
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
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                        <th scope="col" style={{ color: 'white' }}>Order ID</th>
                                                        <th scope="col" style={{ color: 'white' }}>Total Price</th>
                                                        <th scope="col" style={{ color: 'white' }}>Import Date</th>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {importSuppliers.map((importSupplier, index) => (
                                                        <tr key={importSupplier.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{importSupplier.order?.id}</td>
                                                            <td>{importSupplier.totalPrice}</td>
                                                            <td>{new Date(importSupplier.importDate).toLocaleString()}</td>
                                                            <td>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    style={{ backgroundColor: '#6f42c1', color: 'white' }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.backgroundColor = 'white';
                                                                        e.target.style.color = 'gray';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.backgroundColor = '#6f42c1';
                                                                        e.target.style.color = 'white';
                                                                    }}
                                                                    onClick={() => handleDetailClick(importSupplier.id)}
                                                                >
                                                                    Detail
                                                                </button>
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

export default ListImportSupplier