import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function CreateImportSupplier() {
    const navigate = useNavigate();
    const location = useLocation();
    const { orderSupplierId } = location.state;
    const [totalPrice, setTotalPrice] = useState(0);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/detail-order-supplier/${orderSupplierId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                const fetchedDetails = response.data.map(detail => ({ ...detail, price: 0 }));
                setDetails(fetchedDetails);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
            });
    }, [orderSupplierId]);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handlePriceChange = (index, e) => {
        const updatedDetails = [...details];
        updatedDetails[index].price = parseFloat(e.target.value) || 0;
        setDetails(updatedDetails);
        updateTotalPrice(updatedDetails);
    };

    const updateTotalPrice = (updatedDetails) => {
        const newTotalPrice = updatedDetails.reduce((total, detail) => {
            return total + (detail.price * detail.quantity);
        }, 0);
        setTotalPrice(newTotalPrice);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const importData = {
            id: '0',
            totalPrice: totalPrice,
            importDate: '',
            order: { id: orderSupplierId },
            accountAdmin: { id: localStorage.getItem('accountId') }
        };

        axios.post('http://localhost:8080/api/import_supplier', importData, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                const importId = response.data;
                setNotification({ message: 'Import created successfully', type: 'success' });

                console.log("creating detail import");
                const detailPromises = details.map(detail => {
                    const detailData = {
                        id: {
                            importSupplierId: importId,
                            medicineId: detail.medicine.id
                        },
                        importSupplier: { id: importId },
                        medicine: { id: detail.medicine.id },
                        price: detail.price,
                        quantity: detail.quantity
                    };
                    console.log(detailData);
                    axios.post('http://localhost:8080/api/detail-import-supplier', detailData, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    console.log("detail import created");
                    console.log("creating seri");
                    for (let i = 0; i < detail.quantity; i++) {
                        const seri = {
                            id: '0',
                            status: 'new',
                            medicine: { id: detail.medicine.id }
                        };
                        console.log(seri)
                        axios.post('http://localhost:8080/api/seri', seri, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    }
                });

                // Đổi order status tại đây
                return Promise.all(detailPromises)
                    .then(() => {
                        console.log("update order status")
                        return axios.put(`http://localhost:8080/api/order_supplier/${orderSupplierId}/imported`, {}, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`
                            }
                        });
                    });
            })
            .then(() => {
                setNotification({ message: 'Import details created successfully', type: 'success' });
            })
            .catch(error => {
                setNotification({ message: 'Import creation failed: ' + error, type: 'error' });
            });
    };

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />
                <Notification message={notification.message} type={notification.type} />
                <div className="layout-page">
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-xl">
                                    <div className="card mb-4">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">Create Import</h5>
                                            <small className="text-muted float-end">Merged input group</small>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="totalPrice">Total Price</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="totalPrice"
                                                        value={totalPrice}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <h5>Details</h5>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Medicine</th>
                                                                <th scope="col">Quantity</th>
                                                                <th scope="col">Price</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {details.map((detail, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={detail.medicine.name}
                                                                            readOnly
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={detail.quantity}
                                                                            readOnly
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            value={detail.price}
                                                                            onChange={(e) => handlePriceChange(index, e)}
                                                                            min={0}
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <button type="submit" className="btn btn-primary"
                                                    style={{ backgroundColor: '#6f42c1', color: 'white' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }}>Create</button>
                                            </form>
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

export default CreateImportSupplier