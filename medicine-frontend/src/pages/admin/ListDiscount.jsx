import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListDiscount() {
    const [discounts, setDiscounts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [mode, setMode] = useState('add'); // "add" or "update"
    const [discountName, setDiscountName] = useState('');
    const [percentage, setPercentage] = useState(0);
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

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

    useEffect(() => {
        fetchDiscounts();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (discount) => {
        if (selectedDiscount && selectedDiscount.id === discount.id) {
            setSelectedDiscount(null);
            setDiscountName('');
            setPercentage(0);
            setMode('add');
        } else {
            setSelectedDiscount(discount);
            setDiscountName(discount.name);
            setPercentage(discount.percentage);
            setMode('update');
        }
    };

    const handleSort = () => {
        const sortedDiscounts = [...discounts].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return isSortedAsc ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setDiscounts(sortedDiscounts);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredDiscounts = discounts.filter((discount) =>
        discount.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const accountId = localStorage.getItem('accountId');


        if (mode === 'add') {
            try {
                const newDiscount = {
                    name: discountName,
                    percentage: parseFloat(percentage),
                    adminAccount: { id: accountId } // replace with actual admin ID
                };

                await axios.post('http://localhost:8080/api/discount', newDiscount, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'Discount added successfully', type: 'success' });
                setDiscountName('');
                setPercentage(0);
                fetchDiscounts();
            } catch (error) {
                setNotification({
                    message: 'Error adding discount', type: 'error'
                });
            }
        } else if (mode === 'update') {
            try {
                const discountToUpdate = {
                    id: selectedDiscount.id,
                    name: discountName,
                    percentage: parseFloat(percentage),
                    adminAccount: { id: accountId } // replace with actual admin ID
                };

                await axios.put('http://localhost:8080/api/discount', discountToUpdate, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'Discount updated successfully', type: 'success' });
                setDiscountName('');
                setPercentage(0);
                setSelectedDiscount(null);
                setMode('add');
                fetchDiscounts();
            } catch (error) {
                setNotification({
                    message: 'Error updating discount', type: 'error'
                });
            }
        }
    };

    const deleteDiscount = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/discount/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Discount deleted successfully', type: 'success' });
            setSelectedDiscount(null);
            setDiscountName('');
            setPercentage(0);
            setMode('add');
            fetchDiscounts(); // Refresh the discount list
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNotification({ message: 'Discount is currently being used and cannot be deleted.', type: 'error' });
            } else {
                setNotification({ message: 'Error deleting discount', type: 'error' });
            }
            console.error('Error deleting discount:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedDiscount(null); setMode('add'); setDiscountName(''); }}>
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
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={handleSort}>Name</th>
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={handleSort}>Percentage</th>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredDiscounts.map((discount, index) => (
                                                        <tr key={discount.id} style={{ backgroundColor: selectedDiscount?.id === discount.id ? 'lightgray' : 'white' }}>
                                                            <th scope="row" onClick={() => handleRowClick(discount)} >{index + 1}</th>
                                                            <td onClick={() => handleRowClick(discount)} >{discount.name}</td>
                                                            <td onClick={() => handleRowClick(discount)} >{discount.percentage}</td>
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
                                                                    onClick={() => deleteDiscount(discount.id)} >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <form onSubmit={handleFormSubmit} style={{ marginRight: 'auto' }}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">Discount name</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="name"
                                                            aria-label="name"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                            value={discountName}
                                                            onChange={(e) => setDiscountName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">Percentage</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="percentage"
                                                            aria-label="percentage"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                            value={percentage}
                                                            min={1}
                                                            max={100}
                                                            onChange={(e) => setPercentage(e.target.value)}
                                                        />
                                                    </div>
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
                                                    }}>
                                                    {mode === 'add' ? 'Add' : 'Update'}
                                                </button>
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

export default ListDiscount