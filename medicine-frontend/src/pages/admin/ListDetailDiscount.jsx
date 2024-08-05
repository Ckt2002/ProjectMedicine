import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListDetailDiscount() {
    const [detailDiscounts, setDetailDiscounts] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedDetailDiscount, setSelectedDetailDiscount] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [selectedDiscountId, setSelectedDiscountId] = useState('');
    const [selectedMedicineId, setSelectedMedicineId] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchDetailDiscounts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/detail-discount');
            setDetailDiscounts(response.data);
        } catch (error) {
            console.error('Error fetching detail discounts:', error);
            setNotification({
                message: 'Error fetching detail discounts', type: 'error'
            });
        }
    };

    const fetchDiscounts = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/discount', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setDiscounts(response.data);
        } catch (error) {
            console.error('Error fetching discounts:', error);
            setNotification({
                message: 'Error fetching discounts', type: 'error'
            });
        }
    };

    const fetchMedicines = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/medicine', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMedicines(response.data);
        } catch (error) {
            console.error('Error fetching medicines:', error);
            setNotification({
                message: 'Error fetching medicines', type: 'error'
            });
        }
    };

    useEffect(() => {
        fetchDetailDiscounts();
        fetchDiscounts();
        fetchMedicines();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (detailDiscount) => {
        if (selectedDetailDiscount && selectedDetailDiscount.id === detailDiscount.id) {
            setSelectedDetailDiscount(null);
        } else {
            setSelectedDetailDiscount(detailDiscount);
        }
    };

    const handleSort = () => {
        const sortedDetailDiscounts = [...detailDiscounts].sort((a, b) => {
            if (a.discount.name.toLowerCase() < b.discount.name.toLowerCase()) return isSortedAsc ? -1 : 1;
            if (a.discount.name.toLowerCase() > b.discount.name.toLowerCase()) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setDetailDiscounts(sortedDetailDiscounts);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredDetailDiscounts = detailDiscounts.filter((detailDiscount) =>
        detailDiscount.discount.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const newDetailDiscount = {
                id: { discountId: selectedDiscountId, medicineId: selectedMedicineId },
                discount: { id: selectedDiscountId },
                medicine: { id: selectedMedicineId },
                fromDate: fromDate,
                toDate: toDate
            };

            await axios.post('http://localhost:8080/api/detail-discount/add', newDetailDiscount, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Detail discount added successfully', type: 'success' });
            setSelectedDiscountId('');
            setSelectedMedicineId('');
            setFromDate('');
            setToDate('');
            fetchDetailDiscounts();
        } catch (error) {
            setNotification({
                message: 'Error adding detail discount', type: 'error'
            });
        }
    };

    const deleteDetailDiscount = async (discountId, medicineId) => {
        try {
            await axios.delete(`http://localhost:8080/api/detail-discount/${discountId}/${medicineId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Detail discount deleted successfully', type: 'success' });
            fetchDetailDiscounts();
        } catch (error) {
            setNotification({
                message: 'Error deleting detail discount', type: 'error'
            });
            console.error('Error deleting detail discount:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedDetailDiscount(null); }}>
            <div className="layout-container" onClick={(e) => e.stopPropagation()}>

                <SideBar />

                <Notification message={notification.message} type={notification.type} />

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
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </nav>

                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-lg-12 mb-4 order-0">
                                    <div className="card">
                                        <div className="card-body" style={{ display: 'flex' }}>
                                            <table className="table" style={{ width: 'auto', marginLeft: 'auto', marginRight: 'auto' }}>
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={handleSort}>Discount Name</th>
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={handleSort}>Medicine Name</th>
                                                        <th scope="col" style={{ color: 'white' }}>From Date</th>
                                                        <th scope="col" style={{ color: 'white' }}>To Date</th>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredDetailDiscounts.map((detailDiscount, index) => (
                                                        <tr key={detailDiscount.id} style={{ backgroundColor: selectedDetailDiscount?.id === detailDiscount.id ? 'lightgray' : 'white' }}>
                                                            <th scope="row" onClick={() => handleRowClick(detailDiscount)} >{index + 1}</th>
                                                            <td onClick={() => handleRowClick(detailDiscount)} >{detailDiscount.discount.name}</td>
                                                            <td onClick={() => handleRowClick(detailDiscount)} >{detailDiscount.medicine.name}</td>
                                                            <td onClick={() => handleRowClick(detailDiscount)} >{detailDiscount.fromDate}</td>
                                                            <td onClick={() => handleRowClick(detailDiscount)} >{detailDiscount.toDate}</td>
                                                            <td>
                                                                <button className="btn btn-primary"
                                                                    style={{ backgroundColor: 'red', color: 'white' }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.backgroundColor = 'white';
                                                                        e.target.style.color = 'gray';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.backgroundColor = 'red';
                                                                        e.target.style.color = 'white';
                                                                    }}
                                                                    onClick={() => deleteDetailDiscount(detailDiscount.discount.id, detailDiscount.medicine.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <form onSubmit={handleFormSubmit} style={{ marginLeft: '20px' }}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="discountSelect">Discount</label>
                                                    <select
                                                        className="form-select"
                                                        id="discountSelect"
                                                        value={selectedDiscountId}
                                                        onChange={(e) => setSelectedDiscountId(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Discount</option>
                                                        {discounts.map((discount) => (
                                                            <option key={discount.id} value={discount.id}>{discount.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicineSelect">Medicine</label>
                                                    <select
                                                        className="form-select"
                                                        id="medicineSelect"
                                                        value={selectedMedicineId}
                                                        onChange={(e) => setSelectedMedicineId(e.target.value)}
                                                        required
                                                    >
                                                        <option value="">Select Medicine</option>
                                                        {medicines.map((medicine) => (
                                                            <option key={medicine.id} value={medicine.id}>{medicine.name}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="fromDate">From Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="fromDate"
                                                        value={fromDate}
                                                        onChange={(e) => setFromDate(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="toDate">To Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="toDate"
                                                        value={toDate}
                                                        onChange={(e) => setToDate(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <button type="submit" className="btn btn-primary"
                                                    style={{ margin: '10px', backgroundColor: '#6f42c1', color: 'white' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }}>Add Detail Discount</button>
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

export default ListDetailDiscount