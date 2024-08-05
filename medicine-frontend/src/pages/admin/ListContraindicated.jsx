import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListContraindicated() {
    const [contraindicateds, setContraindicateds] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedContraindicated, setSelectedContraindicated] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [mode, setMode] = useState('add'); // "add" or "update"
    const [contraindicatedContent, setContraindicatedContent] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchContraindicated = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/contraindicated',
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            setContraindicateds(response.data);
        } catch (error) {
            console.error('Error fetching contraindicated:', error);
            setNotification({
                message: 'Error fetching contraindicated', type: 'error'
            });
        }
    };

    useEffect(() => {
        fetchContraindicated();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (contraindicated) => {
        if (selectedContraindicated && selectedContraindicated.id === contraindicated.id) {
            setSelectedContraindicated(null);
            setContraindicatedContent('');
            setMode('add');
        } else {
            setSelectedContraindicated(contraindicated);
            setContraindicatedContent(contraindicated.name);
            setMode('update');
        }
    };

    const handleSort = () => {
        const sortedContraindicateds = [...contraindicateds].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return isSortedAsc ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setContraindicateds(sortedContraindicateds);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredContraindicated = contraindicateds.filter((contraindicated) =>
        contraindicated.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'add') {
            try {
                await axios.post('http://localhost:8080/api/contraindicated', { name: contraindicatedContent },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                setNotification({ message: 'contraindicated added successfully', type: 'success' });
                setContraindicatedContent('');
                fetchContraindicated();
            } catch (error) {
                setNotification({
                    message: 'Error adding contraindicated', type: 'error'
                });
            }
        } else if (mode === 'update') {
            try {
                await axios.put('http://localhost:8080/api/contraindicated',
                    { ...selectedContraindicated, name: contraindicatedContent },
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                setNotification({ message: 'contraindicated updated successfully', type: 'success' });
                setContraindicatedContent('');
                setSelectedContraindicated(null);
                setMode('add');
                fetchContraindicated();
            } catch (error) {
                setNotification({
                    message: 'Error updating contraindicated', type: 'error'
                });
            }
        }
    };

    const deleteBrand = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/contraindicated/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'contraindicated deleted successfully', type: 'success' });
            setSelectedContraindicated(null);
            setContraindicatedContent('');
            setMode('add');
            fetchContraindicated();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNotification({ message: 'contraindicated is currently being used and cannot be deleted.', type: 'error' });
            } else {
                setNotification({ message: 'Error deleting contraindicated', type: 'error' });
            }
            console.error('Error deleting contraindicated:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedContraindicated(null); setMode('add'); setContraindicatedContent(''); }}>
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
                                                    {filteredContraindicated.map((contraindicated, index) => (
                                                        <tr key={contraindicated.id} style={{ backgroundColor: selectedContraindicated?.id === contraindicated.id ? 'lightgray' : 'white' }}>
                                                            <th scope="row" onClick={() => handleRowClick(contraindicated)} >{index + 1}</th>
                                                            <td onClick={() => handleRowClick(contraindicated)}
                                                                style={{ maxWidth: '600px' }}>{contraindicated.name}</td>
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
                                                                    onClick={() => deleteBrand(contraindicated.id)} >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <form onSubmit={handleFormSubmit} style={{ marginRight: 'auto' }}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">Content</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="content"
                                                            aria-label="content"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                            value={contraindicatedContent}
                                                            onChange={(e) => setContraindicatedContent(e.target.value)}
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

export default ListContraindicated