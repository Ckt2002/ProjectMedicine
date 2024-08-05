import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListBrandAdmin() {
    const [brands, setBrands] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [mode, setMode] = useState('add'); // "add" or "update"
    const [brandName, setBrandName] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchBrands = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/brand', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(response.data);
            setBrands(response.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
            setNotification({
                message: 'Error fetching brands', type: 'error'
            });
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (brand) => {
        if (selectedBrand && selectedBrand.id === brand.id) {
            setSelectedBrand(null);
            setBrandName('');
            setMode('add');
        } else {
            setSelectedBrand(brand);
            setBrandName(brand.name);
            setMode('update');
        }
    };

    const handleSort = () => {
        const sortedBrands = [...brands].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return isSortedAsc ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setBrands(sortedBrands);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredBrands = brands.filter((brand) =>
        brand.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'add') {
            // Add new brand
            try {
                await axios.post('http://localhost:8080/api/brand', { name: brandName }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'Brand added successfully', type: 'success' });
                setBrandName('');
                fetchBrands(); // Refresh the brand list
            } catch (error) {
                setNotification({
                    message: 'Error adding brand', type: 'error'
                });
            }
        } else if (mode === 'update') {
            // Update existing brand
            try {
                await axios.put('http://localhost:8080/api/brand', { ...selectedBrand, name: brandName }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'Brand updated successfully', type: 'success' });
                setBrandName('');
                setSelectedBrand(null);
                setMode('add');
                fetchBrands(); // Refresh the brand list
            } catch (error) {
                setNotification({
                    message: 'Error updating brand', type: 'error'
                });
            }
        }
    };

    const deleteBrand = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/brand/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Brand deleted successfully', type: 'success' });
            setSelectedBrand(null);
            setBrandName('');
            setMode('add');
            fetchBrands(); // Refresh the brand list
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNotification({ message: 'Brand is currently being used and cannot be deleted.', type: 'error' });
            } else {
                setNotification({ message: 'Error deleting brand', type: 'error' });
            }
            console.error('Error deleting brand:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedBrand(null); setMode('add'); setBrandName(''); }}>
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
                                                    {filteredBrands.map((brand, index) => (
                                                        <tr key={brand.id} style={{ backgroundColor: selectedBrand?.id === brand.id ? 'lightgray' : 'white' }}>
                                                            <th scope="row" onClick={() => handleRowClick(brand)} >{index + 1}</th>
                                                            <td onClick={() => handleRowClick(brand)} >{brand.name}</td>
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
                                                                    onClick={() => deleteBrand(brand.id)} >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <form onSubmit={handleFormSubmit} style={{ marginRight: 'auto' }}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">Brand name</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="name"
                                                            aria-label="name"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                            value={brandName}
                                                            onChange={(e) => setBrandName(e.target.value)}
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

export default ListBrandAdmin