import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListDosageForm() {
    const [dosageForms, setDosageForms] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedDosageForm, setSelectedDosageForm] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [mode, setMode] = useState('add'); // "add" or "update"
    const [dosageFormContent, setDosageFormContent] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchDosageForms = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/dosage_form', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(response.data);
            setDosageForms(response.data);
        } catch (error) {
            console.error('Error fetching dosage form:', error);
            setNotification({
                message: 'Error fetching dosage form', type: 'error'
            });
        }
    };

    useEffect(() => {
        fetchDosageForms();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (dosageForm) => {
        if (selectedDosageForm && selectedDosageForm.id === dosageForm.id) {
            setSelectedDosageForm(null);
            setDosageFormContent('');
            setMode('add');
        } else {
            setSelectedDosageForm(dosageForm);
            setDosageFormContent(dosageForm.name);
            setMode('update');
        }
    };

    const handleSort = () => {
        const sortedDosageForms = [...dosageForms].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return isSortedAsc ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setDosageForms(sortedDosageForms);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredDosageForms = dosageForms.filter((dosageForm) =>
        dosageForm.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'add') {
            try {
                await axios.post('http://localhost:8080/api/dosage_form', { name: dosageFormContent }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'dosage form added successfully', type: 'success' });
                setDosageFormContent('');
                fetchDosageForms();
            } catch (error) {
                setNotification({
                    message: 'Error adding dosage form', type: 'error'
                });
            }
        } else if (mode === 'update') {
            try {
                await axios.put('http://localhost:8080/api/dosage_form',
                    { ...selectedDosageForm, name: dosageFormContent }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
                );
                setNotification({ message: 'Dosage form updated successfully', type: 'success' });
                setDosageFormContent('');
                setSelectedDosageForm(null);
                setMode('add');
                fetchDosageForms();
            } catch (error) {
                setNotification({
                    message: 'Error updating dosage form', type: 'error'
                });
            }
        }
    };

    const deleteDosageForm = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/dosage_form/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Dosage form deleted successfully', type: 'success' });
            setSelectedDosageForm(null);
            setDosageFormContent('');
            setMode('add');
            fetchDosageForms();
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNotification({ message: 'Dosage form is currently being used and cannot be deleted.', type: 'error' });
            } else {
                setNotification({ message: 'Error deleting dosage form', type: 'error' });
            }
            console.error('Error deleting dosage form:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedDosageForm(null); setMode('add'); setDosageFormContent(''); }}>
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
                                                    {filteredDosageForms.map((brand, index) => (
                                                        <tr key={brand.id} style={{ backgroundColor: selectedDosageForm?.id === brand.id ? 'lightgray' : 'white' }}>
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
                                                                    onClick={() => deleteDosageForm(brand.id)} >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <form onSubmit={handleFormSubmit} style={{ marginRight: 'auto' }}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">Name</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="name"
                                                            aria-label="name"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                            value={dosageFormContent}
                                                            onChange={(e) => setDosageFormContent(e.target.value)}
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

export default ListDosageForm