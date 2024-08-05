import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function CreateOrderSupplierAdmin() {
    const [order, setOrder] = useState({
        id: '0',
        orderDate: '',
        updateDate: '',
        status: 'ordered',
        accountAdmin: { id: localStorage.getItem('accountId') },
        supplier: { id: '' }
    });

    const [suppliers, setSuppliers] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [orderDetails, setOrderDetails] = useState([{ medicine: '', quantity: '' }]);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        // Gọi API để lấy danh sách suppliers
        axios.get('http://localhost:8080/api/supplier/active', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setSuppliers(response.data);
            })
            .catch(error => {
                console.error('Error fetching suppliers:', error);
            });
        axios.get('http://localhost:8080/api/medicine', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setMedicines(response.data);
            })
            .catch(error => {
                console.error('Error fetching medicines:', error);
            });
    }, []);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, subfield] = name.split('.');
        if (subfield) {
            setOrder({
                ...order,
                [field]: {
                    ...order[field],
                    [subfield]: value
                }
            });
        } else {
            setOrder({
                ...order,
                [name]: value
            });
        }
    };

    const handleOrderDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedOrderDetails = [...orderDetails];
        updatedOrderDetails[index][name] = value;
        setOrderDetails(updatedOrderDetails);
    };

    const addOrderDetail = () => {
        setOrderDetails([...orderDetails, { medicine: '', quantity: '' }]);
    };

    const removeOrderDetail = (index) => {
        const updatedOrderDetails = orderDetails.filter((_, i) => i !== index);
        setOrderDetails(updatedOrderDetails);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi OrderSupplier
            const orderResponse = await axios.post('http://localhost:8080/api/order_supplier', order, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Order Response:', orderResponse);
            const orderId = orderResponse.data;
            console.log('Order ID:', orderId);

            // Gửi từng DetailOrderSupplier
            for (const detail of orderDetails) {
                const detailOrderSupplier = {
                    id: { orderSupplierId: orderId, medicineId: detail.medicine },
                    orderSupplier: { id: orderId },
                    medicine: { id: detail.medicine },
                    quantity: detail.quantity
                };
                await axios.post('http://localhost:8080/api/detail-order-supplier', detailOrderSupplier, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            }

            setNotification({ message: 'Order created successfully!', type: 'success' });
        } catch (error) {
            console.error('Error creating order:', error);
            setNotification({ message: 'Error creating order', type: 'error' });
        }
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
                                            <h5 className="mb-0">Create Order</h5>
                                            <small className="text-muted float-end">Merged input group</small>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="supplier-name">Supplier</label>
                                                    <div className="input-group input-group-merge">
                                                        <select
                                                            className="form-control"
                                                            id="supplier-id"
                                                            name="supplier.id"
                                                            value={order.supplier.id}
                                                            onChange={handleChange}
                                                            aria-label="Supplier"
                                                            aria-describedby="supplier-id2"
                                                        >
                                                            <option value="">Select Supplier</option>
                                                            {suppliers.map(supplier => (
                                                                <option key={supplier.id} value={supplier.id}>
                                                                    {supplier.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <h5>Details</h5>
                                                    {orderDetails.map((detail, index) => (
                                                        <div key={index} className="mb-3">
                                                            <div className="input-group">
                                                                <select
                                                                    className="form-control"
                                                                    name="medicine"
                                                                    value={detail.medicine}
                                                                    onChange={(e) => handleOrderDetailChange(index, e)}
                                                                >
                                                                    <option value="">Select Medicine</option>
                                                                    {medicines.map(medicine => (
                                                                        <option key={medicine.id} value={medicine.id}>
                                                                            {medicine.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <input
                                                                    type="number"
                                                                    className="form-control"
                                                                    name="quantity"
                                                                    placeholder="Quantity"
                                                                    value={detail.quantity}
                                                                    onChange={(e) => handleOrderDetailChange(index, e)}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                    onClick={() => removeOrderDetail(index)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <button
                                                        style={{ backgroundColor: '#6f42c1', color: 'white' }}
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={addOrderDetail}
                                                        onMouseEnter={(e) => {
                                                            e.target.style.backgroundColor = 'white';
                                                            e.target.style.color = 'gray';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.target.style.backgroundColor = '#6f42c1';
                                                            e.target.style.color = 'white';
                                                        }}
                                                    >
                                                        Add
                                                    </button>
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
                                                    }} >Create</button>
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

export default CreateOrderSupplierAdmin;
