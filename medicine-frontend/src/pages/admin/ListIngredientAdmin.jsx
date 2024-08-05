import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListIngredientAdmin() {
    const [ingredients, setIngredients] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [isSortedAsc, setIsSortedAsc] = useState(true);
    const [mode, setMode] = useState('add'); // "add" or "update"
    const [ingredientName, setIngredientName] = useState('');
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const fetchIngredients = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/ingredient', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIngredients(response.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRowClick = (ingredient) => {
        if (selectedIngredient && selectedIngredient.id === ingredient.id) {
            setSelectedIngredient(null);
            setIngredientName('');
            setMode('add');
        } else {
            setSelectedIngredient(ingredient);
            setIngredientName(ingredient.name);
            setMode('update');
        }
    };

    const handleSort = () => {
        const sortedIngredients = [...ingredients].sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return isSortedAsc ? -1 : 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return isSortedAsc ? 1 : -1;
            return 0;
        });
        setIngredients(sortedIngredients);
        setIsSortedAsc(!isSortedAsc);
    };

    const filteredIngredients = ingredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (mode === 'add') {
            // Add new ingredient
            try {
                await axios.post('http://localhost:8080/api/ingredient', { name: ingredientName }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'Ingredient added successfully', type: 'success' });
                setIngredientName('');
                fetchIngredients(); // Refresh the ingredient list
            } catch (error) {
                console.error('Error adding ingredient:', error);
                setNotification({
                    message: 'Error adding ingredient', type: 'error'
                });
            }
        } else if (mode === 'update') {
            // Update existing ingredient
            try {
                await axios.put('http://localhost:8080/api/ingredient', { ...selectedIngredient, name: ingredientName }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setNotification({ message: 'Ingredient updated successfully', type: 'success' });
                setIngredientName('');
                setSelectedIngredient(null);
                setMode('add');
                fetchIngredients(); // Refresh the ingredient list
            } catch (error) {
                console.error('Error updating ingredient:', error);
                setNotification({
                    message: 'Error updating ingredient', type: 'error'
                });
            }
        }
    };

    const deleteIngredient = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/ingredient/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Ingredient deleted successfully', type: 'success' });
            setSelectedIngredient(null);
            setIngredientName('');
            setMode('add');
            fetchIngredients(); // Refresh the ingredient list
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setNotification({ message: 'Ingredient is currently being used and cannot be deleted.', type: 'error' });
            } else {
                setNotification({ message: 'Error deleting ingredient', type: 'error' });
            }
            console.error('Error deleting ingredient:', error);
        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar"
            onClick={() => { setSelectedIngredient(null); setMode('add'); setIngredientName(''); }}>
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
                                                    {filteredIngredients.map((ingredient, index) => (
                                                        <tr key={ingredient.id} style={{ backgroundColor: selectedIngredient?.id === ingredient.id ? 'lightgray' : 'white' }}>
                                                            <th scope="row" onClick={() => handleRowClick(ingredient)} >{index + 1}</th>
                                                            <td onClick={() => handleRowClick(ingredient)} >{ingredient.name}</td>
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
                                                                    onClick={() => deleteIngredient(ingredient.id)} >Delete</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            <form onSubmit={handleFormSubmit} style={{ marginRight: 'auto' }}>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="basic-icon-default-fullname">Ingredient name</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="basic-icon-default-fullname"
                                                            placeholder="name"
                                                            aria-label="name"
                                                            aria-describedby="basic-icon-default-fullname2"
                                                            value={ingredientName}
                                                            onChange={(e) => setIngredientName(e.target.value)}
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

export default ListIngredientAdmin