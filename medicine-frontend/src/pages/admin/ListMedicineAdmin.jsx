import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';
import { useNavigate } from 'react-router-dom';

function ListMedicineAdmin() {
    const [medicines, setMedicines] = useState([]);
    const [search, setSearch] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
    const navigate = useNavigate();

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
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
            }
        };

        fetchMedicines();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedMedicines = [...medicines].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const filteredMedicines = sortedMedicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleDetailClick = (medicine) => {
        navigate('/admin/detailMedicine', { state: { medicine } });
    };

    const handleDeleteClick = async (medicine) => {
        try {
            console.log(medicine);
            const medicineToUpdate = { ...medicine, status: "stop" };
            await axios.put('http://localhost:8080/api/medicine', medicineToUpdate, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Delete successfully', type: 'success' });
        } catch (error) {
            setNotification({ message: 'Error delete medicine', type: 'error' });
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

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
                                        <div className="card-body">
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col" style={{ color: 'white' }}>Image</th>
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={() => handleSort('name')}>Name</th>
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={() => handleSort('price')}>Price</th>
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={() => handleSort('medicineType.name')}>Medicine Type</th>
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={() => handleSort('status')}>status</th>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredMedicines.map((medicine) => (
                                                        <tr key={medicine.id}>
                                                            <td><img src={`/images/products/${medicine.image}`} alt={medicine.name} style={{ width: 'auto', height: '50px' }} /></td>
                                                            <td>{medicine.name}</td>
                                                            <td>{medicine.price} VND</td>
                                                            <td>{medicine.medicineType.name}</td>
                                                            <td>{medicine.status}</td>
                                                            <td>
                                                                <button className="btn btn-primary"
                                                                    style={{ backgroundColor: '#6f42c1', color: 'white' }}
                                                                    onMouseEnter={(e) => {
                                                                        e.target.style.backgroundColor = 'white';
                                                                        e.target.style.color = 'gray';
                                                                    }}
                                                                    onMouseLeave={(e) => {
                                                                        e.target.style.backgroundColor = '#6f42c1';
                                                                        e.target.style.color = 'white';
                                                                    }}
                                                                    onClick={() => handleDetailClick(medicine)}
                                                                >Detail</button>
                                                            </td>
                                                            <td>
                                                                {medicine?.status === 'selling' && ( // Kiểm tra xem medicine.status có phải là 'selling' không
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
                                                                        onClick={() => handleDeleteClick(medicine)}
                                                                    >
                                                                        Delete
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

export default ListMedicineAdmin;
