import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';


function ListEffect() {
    const [effects, setEffects] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedEffect, setSelectedEffect] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [mode, setMode] = useState('add'); // "add" or "update"
    const [effect, setEffect] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchEffects = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/effect', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(response.data);
            setEffects(response.data);
        } catch (error) {
            console.error('Error fetching effect:', error);
            setNotification({
                message: 'Error fetching effect', type: 'error'
            });
        }
    };

    useEffect(() => {
        fetchEffects();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (effect) => {
        if (selectedEffect && selectedEffect.id === effect.id) {
            setSelectedEffect(null);
            setEffect('');
            setMode('add');
        } else {
            setSelectedEffect(effect);
            setEffect(effect.name);
            setMode('update');
        }
    };

    const handleSort = () => {
        const sortedEffects = [...effects].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return isSortedAsc ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setEffects(sortedEffects);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredEffects = effects.filter((effect) =>
        effect.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'add') {
            try {
                await axios.post('http://localhost:8080/api/effect', { name: effect }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'Effect added successfully', type: 'success' });
                setEffect('');
                fetchEffects();
            } catch (error) {
                setNotification({
                    message: 'Error adding effect', type: 'error'
                });
            }
        } else if (mode === 'update') {
            try {
                await axios.put('http://localhost:8080/api/effect', { ...selectedEffect, name: effect }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'Effect updated successfully', type: 'success' });
                setEffect('');
                setSelectedEffect(null);
                setMode('add');
                fetchEffects();
            } catch (error) {
                setNotification({
                    message: 'Error updating effect', type: 'error'
                });
            }
        }
    };

    const deleteEffect = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/effect/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Effect deleted successfully', type: 'success' });
            setSelectedEffect(null);
            setEffect('');
            setMode('add');
            fetchEffects();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNotification({ message: 'Effect is currently being used and cannot be deleted.', type: 'error' });
            } else {
                setNotification({ message: 'Error deleting effect', type: 'error' });
            }
            console.error('Error deleting effect:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedEffect(null); setMode('add'); setEffect(''); }}>
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
                                                        <th scope="col" style={{ color: 'white', cursor: 'pointer' }} onClick={handleSort}>Content</th>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredEffects.map((effect, index) => (
                                                        <tr key={effect.id} style={{ backgroundColor: selectedEffect?.id === effect.id ? 'lightgray' : 'white' }}>
                                                            <th scope="row" onClick={() => handleRowClick(effect)} >{index + 1}</th>
                                                            <td onClick={() => handleRowClick(effect)} style={{ maxWidth: '600px' }} >{effect.name}</td>
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
                                                                    onClick={() => deleteEffect(effect.id)} >Delete</button>
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
                                                            value={effect}
                                                            onChange={(e) => setEffect(e.target.value)}
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

export default ListEffect