import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import Notification from '../user/Notification';

function AddMedicineAdmin() {
    const [medicineTypes, setMedicineTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [dosageForms, setDosageForms] = useState([]);
    const [manufacturers, setManufacturers] = useState([]);

    const [notification, setNotification] = useState({ message: '', type: '' });

    const [imageUrl, setImageUrl] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);

    const [newMedicine, setNewMedicine] = useState({
        id: '1',
        name: '',
        manufacturer: { id: '' },
        dosageForm: { id: '' },
        brand: { id: '' },
        medicineType: { id: '' },
        price: '',
        description: '',
        image: '',
        status: 'stop'
    });

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
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

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setImageUrl(URL.createObjectURL(file));
            setNewMedicine(prev => ({ ...prev, image: file.name }));
        }
    };

    const handleChange = (field, value) => {
        if (field === 'name' || field === 'description' || field === 'price') {
            setNewMedicine({
                ...newMedicine,
                [field]: value
            });
        } else {
            setNewMedicine({
                ...newMedicine,
                [field]: {
                    ...newMedicine[field],
                    id: value
                }
            });
        }
    };

    const validateForm = () => {
        const { name, medicineType, brand, dosageForm, manufacturer, price, description } = newMedicine;
        if (!name || !medicineType.id || !brand.id || !dosageForm.id || !manufacturer.id || !price || !description) {
            setNotification({ message: 'Please fill in all required fields', type: 'error' });
            return false;
        }
        return true;
    };

    const handleAddMedicine = async () => {
        if (!validateForm()) {
            setNotification({ message: 'Enter medicine', type: 'error' });
            return;
        }

        if (selectedImage) {
            const formData = new FormData();
            formData.append('file', selectedImage);

            try {
                await axios.post('http://localhost:8080/api/medicine/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
            } catch (error) {
                console.error('Image already exists in folder');
            }
        }

        try {
            const response = await axios.post('http://localhost:8080/api/medicine', newMedicine, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 201) {
                setNotification({ message: 'Medicine added successfully', type: 'success' });
            } else {
                setNotification({ message: response.data, type: 'error' });
            }
        } catch (error) {
            console.error('Error adding medicine:', error);
            setNotification({ message: 'Error adding medicine', type: 'error' });
        }
    };

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <SideBar />
                <Notification message={notification.message} type={notification.type} />
                <div className="layout-page">
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-xl">
                                    <div className="card mb-4">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">Add New Medicine</h5>
                                            <small className="text-muted float-end">Detailed view</small>
                                        </div>
                                        <div className="card-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-image">Image</label>
                                                    <input type="file" className="form-control" id="medicine-image"
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
                                                {imageUrl && <img src={imageUrl} alt="Selected" style={{ width: '100px', height: 'auto' }} />}

                                                <div className="mb-3">
                                                    <label className="form-label" htmlFor="medicine-name">Name</label>
                                                    <div className="input-group input-group-merge">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="medicine-name"
                                                            value={newMedicine.name}
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
                                                            value={newMedicine.medicineType.id}
                                                            onChange={(e) => handleChange('medicineType', e.target.value)}
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
                                                            value={newMedicine.brand.id}
                                                            onChange={(e) => handleChange('brand', e.target.value)}
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
                                                            value={newMedicine.dosageForm.id}
                                                            onChange={(e) => handleChange('dosageForm', e.target.value)}
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
                                                            value={newMedicine.manufacturer.id}
                                                            onChange={(e) => handleChange('manufacturer', e.target.value)}
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
                                                            value={newMedicine.price}
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
                                                            value={newMedicine.description}
                                                            onChange={(e) => handleChange('description', e.target.value)}
                                                        ></textarea>
                                                    </div>
                                                </div>

                                                <button type="button"
                                                    onClick={handleAddMedicine}
                                                    className="btn btn-primarys"
                                                    style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }}>Add Medicine</button>
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

export default AddMedicineAdmin;
