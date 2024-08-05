import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';
import Notification from './Notification';
import moment from 'moment';

function Product() {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [detailDiscounts, setDetailDiscounts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [sortType, setSortType] = useState('name');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [medicineTypes, setMedicineTypes] = useState([]);
    const [selectedMedicineType, setSelectedMedicineType] = useState('All');
    const [searchType, setSearchType] = useState('name');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/api/medicine/status/selling')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                setNotification({ message: 'There was an error fetching the data!', type: 'error' });
            });

        axios.get('http://localhost:8080/api/detail-discount')
            .then(response => {
                setDetailDiscounts(response.data);
            })
            .catch(error => {
                setNotification({ message: 'There was an error fetching the detail discounts!', type: 'error' });
            });

        axios.get('http://localhost:8080/api/medicine_type')
            .then(response => {
                setMedicineTypes(response.data);
            })
            .catch(error => {
                setNotification({ message: 'There was an error fetching the medicine types!', type: 'error' });
            });

        const token = localStorage.getItem('accountId');
        setIsLoggedIn(!!token);

        if (location.state && location.state.selectedMedicineType) {
            setSelectedMedicineType(location.state.selectedMedicineType);
        }
    }, [location.state]);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    const sortAndFilterProducts = (products) => {
        let filteredProducts = products;

        if (selectedMedicineType !== 'All') {
            const selectedTypeId = parseInt(selectedMedicineType, 10);
            filteredProducts = products.filter(product => product.medicineType && product.medicineType.id === selectedTypeId);
        }

        return filteredProducts.sort((a, b) => {
            if (sortType === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortType === 'price') {
                return a.price - b.price;
            }
            return 0;
        });
    };

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = sortAndFilterProducts(products).slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleProductDetail = (product) => {
        navigate('/productDetail', { state: { product } });
    };

    const handleMedicineTypeChange = (e) => {
        setSelectedMedicineType(e.target.value);
        setCurrentPage(1);
    };

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setSearchTerm('');  // Reset search term when search type changes
    };

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchType === 'name') {
            setProducts(prevProducts =>
                prevProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else if (searchType === 'ingredient') {
            axios.get(`http://localhost:8080/api/ingredient_medicine/searchByIngredient/${searchTerm}`)
                .then(response => {
                    const ingredientMedicines = response.data;
                    const medicines = ingredientMedicines.map(im => im.medicine);
                    setProducts(medicines);
                })
                .catch(error => {
                    setNotification({ message: 'There was an error fetching the data!', type: 'error' });
                });
        }
    };

    const getDiscountedPrice = (product) => {
        const discountDetail = detailDiscounts.find(detail => detail.medicine.id === product.id);
        if (discountDetail) {
            const today = moment().startOf('day');
            console.log(today);
            const startDate = moment(discountDetail.fromDate).startOf('day');
            console.log('startDate: ', discountDetail.startDate);
            const endDate = moment(discountDetail.toDate).endOf('day');
            console.log('endDate: ', endDate);

            if (today.isBetween(startDate, endDate, null, '[]')) {
                const discountPercentage = discountDetail.discount.percentage; // Assuming discount has a percentage field
                return product.price * (1 - discountPercentage / 100);
            }
        }
        return null;
    };

    return (
        <div>
            <Head />
            <Notification message={notification.message} type={notification.type} />
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>SHOP</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="search-bar-tablecell">
                <h3>Search
                    <select value={searchType} onChange={handleSearchTypeChange} style={{ marginLeft: '10px', marginRight: '10px' }}>
                        <option value="name">Name</option>
                        <option value="ingredient">Ingredient</option>
                    </select> :
                    <input type="text" placeholder="" onChange={handleSearchTermChange} />
                    <button type="submit"
                        style={{ color: 'white' }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'black';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#F28123';
                            e.target.style.color = 'white';
                        }}
                        onClick={handleSearch}>
                        Search<i className="fas fa-search"></i></button>
                </h3>
            </div>

            <div className="centered-select" style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0'
            }}>
                <select className="styled-select" value={sortType} onChange={(e) => setSortType(e.target.value)} style={{
                    border: '2px solid #F28123',
                    borderRadius: '50px',
                    padding: '5px',
                    outline: 'none',
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'center',
                    background: '#F28123',
                    margin: '10px'
                }}>
                    <option value="name" style={{ color: 'orange', background: 'white' }}>Sort by Name</option>
                    <option value="price" style={{ color: 'orange', background: 'white' }}>Sort by Price</option>
                </select>

                <select className="" value={selectedMedicineType} onChange={handleMedicineTypeChange} style={{
                    border: '2px solid #F28123',
                    borderRadius: '50px',
                    padding: '5px',
                    outline: 'none',
                    color: 'white',
                    fontSize: '20px',
                    textAlign: 'center',
                    background: '#F28123',
                    margin: '10px'
                }}>
                    <option value="All" style={{ color: 'orange', background: 'white' }}>All types</option>
                    {medicineTypes.map(type => (
                        <option key={type.id} value={type.id} style={{ color: 'orange', background: 'white' }}>{type.name}</option>
                    ))}
                </select>
            </div>

            <div className="product-section mt-80 mb-80">
                <div className="container">
                    <div className="row product-lists">
                        {currentProducts.map((product) => {
                            const discountedPrice = getDiscountedPrice(product);
                            return (
                                <div key={product.id} className="col-lg-4 col-md-6 text-center" style={{ marginBottom: '40px' }}>
                                    <div className="single-product-item" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}>
                                        <div className="product-image">
                                            <button onClick={() => handleProductDetail(product)} style={{ border: 'none', background: 'none' }}>
                                                <img src={`/images/products/${product.image}`}
                                                    alt={product.name} style={{ height: '250px', width: 'auto' }} />
                                            </button>
                                        </div>
                                        <h3><>{product.name}</></h3>
                                        <p className="product-price" style={{ marginTop: 'auto' }}>
                                            {discountedPrice !== null ? (
                                                <>
                                                    <span className="original-price"><s>{product.price} VND</s></span>
                                                    {discountedPrice} VND
                                                </>
                                            ) : (
                                                `${product.price} VND`
                                            )}
                                        </p>
                                        <button onClick={() => handleProductDetail(product)} style={{
                                            backgroundColor: '#F28123',
                                            color: 'white',
                                            borderRadius: '50px',
                                            padding: '10px 20px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'background-color 0.3s, color 0.3s'
                                        }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = 'white';
                                                e.target.style.color = 'black';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = '#F28123';
                                                e.target.style.color = 'white';
                                            }}>
                                            Detail
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="pagination-wrap">
                                <ul>
                                    <li onClick={() => paginate(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}><a href="#">Prev</a></li>
                                    {pageNumbers.map(number => (
                                        <li key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
                                            <a href="#">{number}</a>
                                        </li>
                                    ))}
                                    <li onClick={() => paginate(currentPage + 1)} className={currentPage === pageNumbers.length ? 'disabled' : ''}><a href="#">Next</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Product;
