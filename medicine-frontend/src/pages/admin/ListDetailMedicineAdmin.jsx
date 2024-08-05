import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function ListDetailMedicineAdmin() {
    const location = useLocation();
    const [medicine, setMedicine] = useState(null);
    const [medicineTypes, setMedicineTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [dosageForms, setDosageForms] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);
    const [medicineToUpdate, setMedicineToUpdate] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [ingredientMedicines, setIngredientMedicines] = useState([]);
    const [effectMedicines, setEffectMedicines] = useState([]);
    const [contraindicationMedicines, setContraindicationMedicines] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [contraindications, setContraindications] = useState([]);
    const [effects, setEffects] = useState([]);
    const [showSelectIngredient, setShowIngredientSelect] = useState(false);
    const [showSelectContraindication, setShowContraindicationSelect] = useState(false);
    const [showSelectEffect, setShowEffectSelect] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [imageChoosed, setImageChoosed] = useState(false);

    const fetchIngredientMedicines = async (medicine) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/ingredient_medicine/medicine/${medicine.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(response.data);
            setIngredientMedicines(response.data);
            const selectedIngredientsMap = {};
            response.data.forEach(ingredientMedicine => {
                selectedIngredientsMap[ingredientMedicine.ingredient.id] = ingredientMedicine.ingredient.id;
            });
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    const fetchMedicine = async (medicineId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/medicine/${medicineId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log(response.data);
            setMedicine(response.data);
            setMedicineToUpdate(response.data);
        } catch (error) {
            console.error('Error fetching medicine:', error);
        }
    };

    const fetchEffectMedicines = async (medicine) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/effect-medicine/medicine/${medicine.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEffectMedicines(response.data);
        } catch (error) {
            console.error('Error fetching effects:', error);
        }
    };

    const fetchContraindicationMedicines = async (medicine) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/contraindicated_medicine/${medicine.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setContraindicationMedicines(response.data);
        } catch (error) {
            console.error('Error fetching effects:', error);
        }
    };

    useEffect(() => {
        console.log(location.state.medicine.id);
        fetchMedicine(location.state.medicine.id);
        setImageUrl(`/images/products/${location.state.medicine.image}`);

        axios.get('http://localhost:8080/api/ingredient', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the ingredients!', error);
            });

        axios.get('http://localhost:8080/api/contraindicated', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setContraindications(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contraindications!', error);
            });

        axios.get('http://localhost:8080/api/effect', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                setEffects(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contraindications!', error);
            });

        const fetchData = async () => {
            try {
                const [medicineTypeResponse, brandResponse, dosageFormResponse, manufacturerResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/medicine_type'),
                    axios.get('http://localhost:8080/api/brand', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                    axios.get('http://localhost:8080/api/dosage_form', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }),
                    axios.get('http://localhost:8080/api/manufacturer', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                ]);

                setMedicineTypes(medicineTypeResponse.data);
                setBrands(brandResponse.data);
                setDosageForms(dosageFormResponse.data);
                setManufacturers(manufacturerResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (!medicine) {
            // setNotification({ message: 'No medicine details available', type: 'error' });
            console.log('No medicine details available')
        } else {
            console.log(medicine);
            fetchIngredientMedicines(medicine);
            fetchContraindicationMedicines(medicine);
            fetchEffectMedicines(medicine);
        }
    }, [medicine]);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        if (medicineToUpdate && medicineToUpdate !== medicine) {
            // console.log
            updateMedicine(medicineToUpdate);
        }
    }, [medicineToUpdate]);

    const updateMedicine = async (medicineToUpdate) => {
        try {
            // console.log(medicineToUpdate);
            await axios.put('http://localhost:8080/api/medicine', medicineToUpdate, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setMedicine(medicineToUpdate);
            console.log("Medicine updated successfully");
        } catch (error) {
            console.error("Failed to update medicine", error);
        }
    };

    const handleDeleteIngredientMedicine = async (ingredientId, medicineId) => {
        try {
            await axios.delete(`http://localhost:8080/api/ingredient_medicine/${medicineId}/${ingredientId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setIngredientMedicines(prev => prev.filter(cm => cm.ingredient.id !== ingredientId));
            setNotification({ message: 'Deleted successfully', type: 'success' });
        } catch (error) {
            console.error('Error deleting ingredient:', error);
            setNotification({ message: 'Error deleting ingredient', type: 'error' });
        }
    };

    const handleSelectIngredient = async (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== '') {
            try {
                const newIngredientMedicine = {
                    id: {
                        idMedicine: medicine.id,
                        idIngredient: selectedValue
                    },
                    medicine: { id: medicine.id },
                    ingredient: { id: selectedValue }
                };
                const response = await axios.post('http://localhost:8080/api/ingredient_medicine', newIngredientMedicine, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 201) {
                    fetchIngredientMedicines(medicine);
                    setShowIngredientSelect(false);
                    setNotification({ message: 'Added successfully', type: 'success' });
                }
                else {
                    setNotification({ message: response.data, type: 'error' });
                }
            } catch (error) {
                if (error.response) {
                    // Server responded with a status other than 2xx
                    setNotification({ message: error.response.data, type: 'error' });
                } else {
                    // Something else happened
                    setNotification({ message: 'Error adding ingredient medicine', type: 'error' });
                }
                console.error('Error adding ingredient medicine:', error);
            }
        }
    };

    const handleDeleteContraindication = async (contraindicationId, medicineId) => {
        try {
            await axios.delete(`http://localhost:8080/api/contraindicated_medicine/${medicineId}/${contraindicationId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setContraindicationMedicines(prev => prev.filter(cm => cm.contraindicated.id !== contraindicationId));
            setNotification({ message: 'Deleted successfully', type: 'success' });
        } catch (error) {
            console.error('Error deleting contraindication:', error);
            setNotification({ message: 'Error deleting contraindication', type: 'error' });
        }
    };

    const handleSelectContraindication = async (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== '') {
            try {
                const newContraindicationMedicine = {
                    id: {
                        contraindicatedId: selectedValue,
                        medicineId: medicine.id
                    },
                    contraindicated: { id: selectedValue },
                    medicine: { id: medicine.id }
                };
                const response = await axios.post('http://localhost:8080/api/contraindicated_medicine',
                    newContraindicationMedicine, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 201) {
                    fetchContraindicationMedicines(medicine);
                    setShowContraindicationSelect(false);
                    setNotification({ message: 'Added successfully', type: 'success' });
                }
                else {
                    setNotification({ message: response.data, type: 'error' });
                }
            } catch (error) {
                if (error.response) {
                    setNotification({ message: error.response.data, type: 'error' });
                } else {
                    setNotification({ message: 'Error adding contraindication medicine', type: 'error' });
                }
                console.error('Error adding contraindication medicine:', error);
            }
        }
    };

    const handleDeleteEffect = async (effectId, medicineId) => {
        try {
            await axios.delete(`http://localhost:8080/api/effect-medicine/${effectId}/${medicineId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setEffectMedicines(prev => prev.filter(cm => cm.effect.id !== effectId));
            setNotification({ message: 'Deleted successfully', type: 'success' });
        } catch (error) {
            console.error('Error deleting effect:', error);
            setNotification({ message: 'Error deleting effect', type: 'error' });
        }
    };

    const handleSelectEffect = async (e) => {
        const selectedValue = e.target.value;
        if (selectedValue !== '') {
            try {
                const newEffectMedicine = {
                    id: {
                        effectId: selectedValue,
                        medicineId: medicine.id
                    },
                    effect: { id: selectedValue },
                    medicine: { id: medicine.id }
                };
                const response = await axios.post('http://localhost:8080/api/effect-medicine', newEffectMedicine, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 201) {
                    fetchEffectMedicines(medicine);
                    setShowEffectSelect(false);
                    setNotification({ message: 'Added successfully', type: 'success' });
                }
                else {
                    setNotification({ message: response.data, type: 'error' });
                }
            } catch (error) {
                if (error.response) {
                    setNotification({ message: error.response.data, type: 'error' });
                } else {
                    setNotification({ message: 'Error adding effect medicine', type: 'error' });
                }
                console.error('Error adding effect medicine:', error);
            }
        }
    };

    const handleChange = (field, value) => {
        if (value !== '') {
            console.log(value);
            setMedicineToUpdate((prevMedicine) => {
                if (value !== '') {
                    const updatedMedicine = {
                        ...prevMedicine,
                        [field]: value
                    };
                    return updatedMedicine;
                }
            });
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            // console.log(file.name);
            setSelectedImage(file);
            setImageUrl(URL.createObjectURL(file));
            setImageChoosed(true);
        }
    };

    const handleImageUpload = async () => {
        if (selectedImage) {
            console.log(selectedImage.name);
            const formData = new FormData();
            formData.append('file', selectedImage);

            try {
                const response = await axios.post('http://localhost:8080/api/medicine/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                // console.log('Image uploaded successfully:', response.data);
                // setNotification({ message: 'Upload successfully', type: 'success' });
            } catch (error) {
                console.error('Error uploading image:', error);
                // setNotification({ message: 'Error upload image', type: 'error' });
            }

            setMedicineToUpdate((prevMedicine) => {
                const updatedMedicine = {
                    ...prevMedicine,
                    image: selectedImage.name
                };
                return updatedMedicine;
            });

            setImageChoosed(false);

        }
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <SideBar />
                <Notification message={notification.message} type={notification.type} />

                <div className="layout-page">

                    <div className="content-wrapper">
                        {/* <!-- Content --> */}

                        <div className="container-xxl flex-grow-1 container-p-y">

                            {/* <!-- Basic Layout --> */}
                            <div className="row">
                                <div className="col-xl">
                                    <div className="card mb-4">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">Medicine Details</h5>
                                            <small className="text-muted float-end">Detailed view</small>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-image">Image</label>
                                                    <input type="file" className="form-control" id="medicine-image"
                                                        onChange={handleImageChange}
                                                        readOnly
                                                    />
                                                </div>
                                                {imageUrl && <img src={imageUrl} alt="Selected" style={{ width: '100px', height: 'auto' }} />}
                                                {imageChoosed && <button type="button" className="btn btn-primary"
                                                    onClick={handleImageUpload}
                                                    style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }}>Upload Image</button>}

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-name">Name</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="medicine-name"
                                                            defaultValue={medicine?.name || ''}
                                                            onChange={(e) => handleChange('name', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-type">Type</label>
                                                    <div className="input-group input-group-merge">
                                                        <select
                                                            id="medicine-type"
                                                            className="form-control"
                                                            value={medicine?.medicineType?.id || ''}
                                                            onChange={(e) => handleChange('medicineType', { id: e.target.value })}
                                                        >
                                                            <option value="">Select Type</option>
                                                            {medicineTypes.map((type) => (
                                                                <option key={type.id} value={type.id}>
                                                                    {type.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-brand">Brand</label>
                                                    <div className="input-group input-group-merge">
                                                        <select
                                                            id="medicine-brand"
                                                            className="form-control"
                                                            value={medicine?.brand?.id || ''}
                                                            onChange={(e) => handleChange('brand', { id: e.target.value })}
                                                        >
                                                            <option value="">Select Brand</option>
                                                            {brands.map((brand) => (
                                                                <option key={brand.id} value={brand.id}>
                                                                    {brand.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-dosage-form">Dosage form</label>
                                                    <div className="input-group input-group-merge">
                                                        <select
                                                            id="medicine-dosage-form"
                                                            className="form-control"
                                                            value={medicine?.dosageForm?.id || ''}
                                                            onChange={(e) => handleChange('dosageForm', { id: e.target.value })}
                                                        >
                                                            <option value="">Select Dosage Form</option>
                                                            {dosageForms.map((form) => (
                                                                <option key={form.id} value={form.id}>
                                                                    {form.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-manufacturer">Manufacturer</label>
                                                    <div className="input-group input-group-merge">
                                                        <select
                                                            id="medicine-manufacturer"
                                                            className="form-control"
                                                            value={medicine?.manufacturer?.id || ''}
                                                            onChange={(e) => handleChange('manufacturer', { id: e.target.value })}
                                                        >
                                                            <option value="">Select Manufacturer</option>
                                                            {manufacturers.map((manufacturer) => (
                                                                <option key={manufacturer.id} value={manufacturer.id}>
                                                                    {manufacturer.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>


                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-price">Price</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            id="medicine-price"
                                                            className="form-control"
                                                            defaultValue={medicine?.price || ''}
                                                            onChange={(e) => handleChange('price', e.target.value)}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-description">Description</label>
                                                    <div className="input-group input-group-merge">
                                                        <textarea
                                                            id="medicine-description"
                                                            className="form-control"
                                                            defaultValue={medicine?.description || ''}
                                                            onChange={(e) => handleChange('description', e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-manufacturer">Status</label>
                                                    <div className="input-group input-group-merge">
                                                        <select
                                                            id="medicine-manufacturer"
                                                            className="form-control"
                                                            value={medicine?.status}
                                                            onChange={(e) => handleChange('status', e.target.value)}
                                                        >
                                                            <option key={'stop'} value={'stop'}>
                                                                Stop
                                                            </option>
                                                            <option key={'selling'} value={'selling'}>
                                                                Selling
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-ingredient">Ingredient</label>
                                                    <div className=""
                                                        style={{
                                                            display: 'block',
                                                            marginBottom: '10px',
                                                            width: '100%'
                                                        }}>
                                                        {ingredientMedicines.map((ingredientMedicine, index) => (
                                                            <div key={index} style={{
                                                                display: 'flex', alignItems: 'center', marginBottom: '10px'
                                                            }}>
                                                                <input
                                                                    className="form-control"
                                                                    id="medicine-ingredient"
                                                                    value={ingredientMedicine.ingredient.name || ''}
                                                                    readOnly
                                                                >
                                                                </input>
                                                                <button type="button" className="btn btn-danger ml-2"
                                                                    onClick={() => handleDeleteIngredientMedicine(
                                                                        ingredientMedicine.ingredient.id, medicine.id)}
                                                                    style={{ margin: '10px' }}
                                                                >
                                                                    <i class="bi bi-file-earmark-x"></i>
                                                                </button>
                                                                <br />
                                                            </div>
                                                        ))}

                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                            {showSelectIngredient && (
                                                                <select
                                                                    className="form-control"
                                                                    id="medicine-ingredient"
                                                                    onChange={handleSelectIngredient}
                                                                >
                                                                    <option value="">Select ingredient</option>
                                                                    {ingredients.map((ingredient, idx) => (
                                                                        <option key={idx} value={ingredient.id}>
                                                                            {ingredient.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}

                                                            <button type="button" className="btn btn-primary"
                                                                style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                                onMouseEnter={(e) => {
                                                                    e.target.style.backgroundColor = 'white';
                                                                    e.target.style.color = 'gray';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.target.style.backgroundColor = '#6f42c1';
                                                                    e.target.style.color = 'white';
                                                                }}
                                                                onClick={() => setShowIngredientSelect(!showSelectIngredient)}
                                                            >
                                                                <i class="bi bi-file-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-contraindication">Contraindication</label>
                                                    <div className=""
                                                        style={{
                                                            display: 'block',
                                                            marginBottom: '10px',
                                                            width: '100%'
                                                        }}>
                                                        {contraindicationMedicines.map((contraindicationMedicine, index) => (
                                                            <div key={index} style={{
                                                                display: 'flex', alignItems: 'center', marginBottom: '10px'
                                                            }}>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="medicine-ingredient"
                                                                    value={contraindicationMedicine.contraindicated.name || ''}
                                                                    readOnly
                                                                >
                                                                </textarea>
                                                                <button type="button" className="btn btn-danger ml-2"
                                                                    onClick={() => handleDeleteContraindication(
                                                                        contraindicationMedicine.contraindicated.id, medicine.id)}
                                                                    style={{ margin: '10px' }}
                                                                >
                                                                    <i class="bi bi-file-earmark-x"></i>
                                                                </button>
                                                                <br />
                                                            </div>
                                                        ))}

                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                            {showSelectContraindication && (
                                                                <select
                                                                    className="form-control"
                                                                    id="medicine-contraindication"
                                                                    onChange={handleSelectContraindication}
                                                                >
                                                                    <option value="">Select contraindication</option>
                                                                    {contraindications.map((contraindication, idx) => (
                                                                        <option key={idx} value={contraindication.id}>
                                                                            {contraindication.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}

                                                            <button type="button" className="btn btn-primary"
                                                                style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                                onMouseEnter={(e) => {
                                                                    e.target.style.backgroundColor = 'white';
                                                                    e.target.style.color = 'gray';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.target.style.backgroundColor = '#6f42c1';
                                                                    e.target.style.color = 'white';
                                                                }}
                                                                onClick={() => setShowContraindicationSelect(!showSelectContraindication)}
                                                            >
                                                                <i class="bi bi-file-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-effect">Effect</label>
                                                    <div className=""
                                                        style={{
                                                            display: 'block',
                                                            marginBottom: '10px',
                                                            width: '100%'
                                                        }}>
                                                        {effectMedicines.map((effectMedicine, index) => (
                                                            <div key={index} style={{
                                                                display: 'flex', alignItems: 'center', marginBottom: '10px'
                                                            }}>
                                                                <input
                                                                    className="form-control"
                                                                    id="medicine-ingredient"
                                                                    value={effectMedicine.effect.name || ''}
                                                                    readOnly
                                                                >
                                                                </input>
                                                                <button type="button" className="btn btn-danger ml-2"
                                                                    onClick={() => handleDeleteEffect(
                                                                        effectMedicine.effect.id, medicine.id)}
                                                                    style={{ margin: '10px' }}
                                                                >
                                                                    <i class="bi bi-file-earmark-x"></i>
                                                                </button>
                                                                <br />
                                                            </div>
                                                        ))}

                                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                                            {showSelectEffect && (
                                                                <select
                                                                    className="form-control"
                                                                    id="medicine-contraindication"
                                                                    onChange={handleSelectEffect}
                                                                >
                                                                    <option value="">Select effect</option>
                                                                    {effects.map((effect, idx) => (
                                                                        <option key={idx} value={effect.id}>
                                                                            {effect.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            )}

                                                            <button type="button" className="btn btn-primary"
                                                                style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                                onMouseEnter={(e) => {
                                                                    e.target.style.backgroundColor = 'white';
                                                                    e.target.style.color = 'gray';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.target.style.backgroundColor = '#6f42c1';
                                                                    e.target.style.color = 'white';
                                                                }}
                                                                onClick={() => setShowEffectSelect(!showSelectEffect)}
                                                            >
                                                                <i class="bi bi-file-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <!-- / Content --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListDetailMedicineAdmin;
