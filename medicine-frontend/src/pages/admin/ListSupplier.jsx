import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListSupplier() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [mode, setMode] = useState('add'); // "add" or "update"
    const [supplierName, setSupplierName] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchSupplier = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/supplier', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuppliers(response.data);
        } catch (error) {
            console.error('Error fetching supplier:', error);
            setNotification({
                message: 'Error fetching supplier', type: 'error'
            });
        }
    };

    useEffect(() => {
        fetchSupplier();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (supplier) => {
        if (selectedSupplier && selectedSupplier.id === supplier.id) {
            setSelectedSupplier(null);
            setSupplierName('');
            setMode('add');
        } else {
            setSelectedSupplier(supplier);
            setSupplierName(supplier.name);
            setMode('update');
        }
    };

    const handleSort = () => {
        const sortedsuppliers = [...suppliers].sort((a, b) => {
            const nameA = a.name ? a.name.toLowerCase() : '';
            const nameB = b.name ? b.name.toLowerCase() : '';
            if (nameA < nameB) return isSortedAsc ? -1 : 1;
            if (nameA > nameB) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setSuppliers(sortedsuppliers);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredsupplier = suppliers.filter((supplier) =>
        supplier.name && supplier.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'add') {
            try {
                await axios.post('http://localhost:8080/api/supplier', { name: supplierName, status: 'active' }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'supplier added successfully', type: 'success' });
                setSupplierName('');
                fetchSupplier();
            } catch (error) {
                setNotification({
                    message: 'Error adding supplier', type: 'error'
                });
            }
        } else if (mode === 'update') {
            try {
                await axios.put('http://localhost:8080/api/supplier', { ...selectedSupplier, name: supplierName }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'supplier updated successfully', type: 'success' });
                setSupplierName('');
                setSelectedSupplier(null);
                setMode('add');
                fetchSupplier();
            } catch (error) {
                setNotification({
                    message: 'Error updating supplier', type: 'error'
                });
            }
        }
    };

    const handleStatusChange = async (supplier, newStatus) => {
        const updatedSupplier = { ...supplier, status: newStatus };
        try {
            const response = await axios.put('http://localhost:8080/api/supplier', updatedSupplier, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setSuppliers((prevSuppliers) =>
                prevSuppliers.map((supp) => (supp.id === supplier.id ? response.data : supp))
            );
            fetchSupplier();
        } catch (error) {
            console.error('Error updating supplier:', error);
        }
    };

    const deleteBrand = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/supplier/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'supplier deleted successfully', type: 'success' });
            setSelectedSupplier(null);
            setSupplierName('');
            setMode('add');
            fetchSupplier();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNotification({ message: 'supplier is currently being used and cannot be deleted.', type: 'error' });
            } else {
                setNotification({ message: 'Error deleting supplier', type: 'error' });
            }
            console.error('Error deleting supplier:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedSupplier(null); setMode('add'); setSupplierName(''); }}>
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
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={handleSort}>Status</th>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredsupplier.map((supplier, index) => (
                                                        <tr key={supplier.id} style={{ backgroundColor: selectedSupplier?.id === supplier.id ? 'lightgray' : 'white' }}>
                                                            <th scope="row" onClick={() => handleRowClick(supplier)} >{index + 1}</th>
                                                            <td onClick={() => handleRowClick(supplier)}
                                                                style={{ maxWidth: '600px' }}>{supplier.name}</td>
                                                            <td>
                                                                <select value={supplier.status} className="form-select" aria-label="Default select example"
                                                                    onChange={(e) => handleStatusChange(supplier, e.target.value)}>
                                                                    <option value="active" style={{ color: 'green' }}>Active</option>
                                                                    <option value="inactive" style={{ color: 'red' }}>Inactive</option>
                                                                </select>
                                                            </td>
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
                                                                    onClick={() => deleteBrand(supplier.id)} >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <form onSubmit={handleFormSubmit} style={{ marginRight: 'auto' }}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">Supplier name</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="name"
                                                            aria-label="name"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                            value={supplierName}
                                                            onChange={(e) => setSupplierName(e.target.value)}
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

export default ListSupplier