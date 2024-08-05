import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/admin/SideBar';

function ListDetailImport() {
    const location = useLocation();
    const [details, setDetails] = useState([]);
    const importSupplierId = location.state;

    useEffect(() => {
        console.log(location.state.importSupplierId);
        const fetchDetailImportSupplier = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/detail-import-supplier/${location.state.importSupplierId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);
                setDetails(response.data);
            } catch (error) {
                console.error('Error fetching detail import supplier:', error);
            }
        };

        if (importSupplierId) {
            fetchDetailImportSupplier();
        }
    }, [importSupplierId]);

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />
                <div className="layout-page">
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
                                                        <th scope="col" style={{ color: 'white' }}>Medicine ID</th>
                                                        <th scope="col" style={{ color: 'white' }}>Price</th>
                                                        <th scope="col" style={{ color: 'white' }}>Quantity</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {details.map((detail, index) => (
                                                        <tr key={detail.id.medicineId}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{detail.medicine.id}</td>
                                                            <td>{detail.price}</td>
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

export default ListDetailImport