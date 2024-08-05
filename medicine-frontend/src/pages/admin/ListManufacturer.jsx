import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListManufacturer() {
    const [manufacturers, setManufacturer] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedManufacturer, setSelectedManufacturer] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [mode, setMode] = useState('add'); // "add" or "update"
    const [manufacturerName, setManufacturerName] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchManufacturer = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/manufacturer', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setManufacturer(response.data);
        } catch (error) {
            console.error('Error fetching manufacturer:', error);
            setNotification({
                message: 'Error fetching manufacturer', type: 'error'
            });
        }
    };

    useEffect(() => {
        fetchManufacturer();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (manufacturer) => {
        if (selectedManufacturer && selectedManufacturer.id === manufacturer.id) {
            setSelectedManufacturer(null);
            setManufacturerName('');
            setMode('add');
        } else {
            setSelectedManufacturer(manufacturer);
            setManufacturerName(manufacturer.name);
            setMode('update');
        }
    };

    const handleSort = () => {
        const sortedManufacturers = [...manufacturers].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return isSortedAsc ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setManufacturer(sortedManufacturers);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredManufacturer = manufacturers.filter((manufacturer) =>
        manufacturer.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'add') {
            try {
                await axios.post('http://localhost:8080/api/manufacturer', { name: manufacturerName }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'manufacturer added successfully', type: 'success' });
                setManufacturerName('');
                fetchManufacturer();
            } catch (error) {
                setNotification({
                    message: 'Error adding manufacturer', type: 'error'
                });
            }
        } else if (mode === 'update') {
            try {
                await axios.put('http://localhost:8080/api/manufacturer', { ...selectedManufacturer, name: manufacturerName }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'manufacturer updated successfully', type: 'success' });
                setManufacturerName('');
                setSelectedManufacturer(null);
                setMode('add');
                fetchManufacturer();
            } catch (error) {
                setNotification({
                    message: 'Error updating manufacturer', type: 'error'
                });
            }
        }
    };

    const deleteBrand = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/manufacturer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'manufacturer deleted successfully', type: 'success' });
            setSelectedManufacturer(null);
            setManufacturerName('');
            setMode('add');
            fetchManufacturer();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNotification({ message: 'manufacturer is currently being used and cannot be deleted.', type: 'error' });
            } else {
                setNotification({ message: 'Error deleting manufacturer', type: 'error' });
            }
            console.error('Error deleting manufacturer:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedManufacturer(null); setMode('add'); setManufacturerName(''); }}>
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
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredManufacturer.map((medicineType, index) => (
                                                        <tr key={medicineType.id} style={{ backgroundColor: selectedManufacturer?.id === medicineType.id ? 'lightgray' : 'white' }}>
                                                            <th scope="row" onClick={() => handleRowClick(medicineType)} >{index + 1}</th>
                                                            <td onClick={() => handleRowClick(medicineType)} >{medicineType.name}</td>
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
                                                                    onClick={() => deleteBrand(medicineType.id)} >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <form onSubmit={handleFormSubmit} style={{ marginRight: 'auto' }}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">Manufacturer name</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="name"
                                                            aria-label="name"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                            value={manufacturerName}
                                                            onChange={(e) => setManufacturerName(e.target.value)}
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

export default ListManufacturer