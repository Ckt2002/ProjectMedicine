import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Notification from './Notification';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';

function ProductDetail() {
    const [ingredientMedicine, setIngredientMedicines] = useState([]);
    const [countNumber, setCountNumber] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [discount, setDiscount] = useState(null);
    const location = useLocation();
    const { product } = location.state || {}; // Lấy sản phẩm từ state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [effectNames, setEffectNames] = useState([]);
    const [contraindicatedNames, setContraindicatedNames] = useState([]);
    const navigate = useNavigate();

    let order = null;

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        const fetchEffectAndContraindicatedData = async () => {
            const effectNames = await getEffectMedicines(product.id);
            setEffectNames(effectNames);

            const contraindicatedNames = await getContraindicatedMedicines(product.id);
            setContraindicatedNames(contraindicatedNames);
        };

        getDetailMedicine();
        getCountNumber();
        fetchDetailDiscount();
        fetchEffectAndContraindicatedData();

        // Kiểm tra xem người dùng đã đăng nhập chưa
        const token = localStorage.getItem('accountId');
        setIsLoggedIn(!!token);
    }, [product]);

    const getDetailMedicine = async () => {
        await axios.get(`http://localhost:8080/api/ingredient_medicine/medicine/${product.id}`)
            .then(response => {
                setIngredientMedicines(response.data);
            })
            .catch(error => {
                setNotification({ message: 'There was an error fetching the data!', type: 'error' });
            });
    };

    const getCountNumber = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/seri/count/${product.id}/new`);
            setCountNumber(response.data);
        } catch (error) {
            setNotification({ message: 'There was an error fetching the data!', type: 'error' });
        }
    };

    const getEffectMedicines = async (medicineId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/effect-medicine/medicine/${medicineId}`);
            return response.data.map(item => item.effect.name);
        } catch (error) {
            setNotification({ message: 'There was an error fetching the effect data!', type: 'error' });
            return [];
        }
    };

    const getContraindicatedMedicines = async (medicineId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/contraindicated_medicine/${medicineId}`);
            return response.data.map(item => item.contraindicated.name);
        } catch (error) {
            setNotification({ message: 'There was an error fetching the contraindicated data!', type: 'error' });
            return [];
        }
    };

    const fetchDetailDiscount = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/detail-discount/medicine/${product.id}`);
            const currentDiscount = response.data.find(discount => {
                const now = new Date();
                return new Date(discount.fromDate) <= now && new Date(discount.toDate) >= now;
            });
            setDiscount(currentDiscount);
        } catch (error) {
            setNotification({ message: 'There was an error fetching the discount data!', type: 'error' });
        }
    };

    const fetchRandomSeri = async (medicineId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/seri/random-seri/${medicineId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            setNotification({ message: 'There was an error fetching the random seri!', type: 'error' });
            return null;
        }
    };

    const handleAddToCart = async (product) => {
        if (!isLoggedIn) {
            // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
            navigate('/login');
        } else {
            if (selectedQuantity === 0) {
                setNotification({ message: 'Quantity must be greater than 0', type: 'error' });
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8080/api/order/account/${localStorage.getItem('accountId')}/status/creating`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                setNotification({ message: 'Ok', type: 'success' });
                console.log(response.data.length);
                if (response.data.length === 0) {
                    const newOrder = {
                        totalPrice: 0.0,
                        orderDate: new Date().toISOString(),
                        updatedDate: new Date().toISOString(),
                        status: 'creating',
                        accountUser: { id: localStorage.getItem('accountId') } // Lấy accountId từ localStorage
                    };
                    const orderResponse = await axios.post('http://localhost:8080/api/order', newOrder, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    order = orderResponse.data;
                } else {
                    order = response.data[0];
                }

                const discountedPrice = calculateDiscountedPrice();
                console.log(discountedPrice);

                for (let i = 0; i < selectedQuantity; i++) {
                    try {
                        const seriData = await fetchRandomSeri(product.id);
                        if (seriData) {
                            const newDetailOrder = {
                                id: {
                                    idOrder: order.id,
                                    idSeri: seriData.id
                                },
                                order: {
                                    id: order.id
                                },
                                seri: {
                                    id: seriData.id
                                },
                                price: discountedPrice
                            };

                            const detailOrderResponse = await axios.post(
                                'http://localhost:8080/api/detail-order', newDetailOrder, {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                }
                            });
                            if (detailOrderResponse.status === 201) {
                                console.log('DetailOrder created successfully');
                            }

                            const updatedSeri = { ...seriData, status: 'sold' };
                            const updateSeriResponse = await axios.put(`http://localhost:8080/api/seri/${seriData.id}`, updatedSeri, {
                                headers: {
                                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                                }
                            });
                            if (updateSeriResponse.status === 200) {
                                console.log('Seri updated successfully');
                            }
                        }
                    } catch (error) {
                        console.error(error);
                        setNotification({ message: 'There was an error processing the seri!', type: 'error' });
                    }
                }
                getDetailMedicine();
                getCountNumber();
                setNotification({ message: 'Added to cart successfully!', type: 'success' });
            } catch (error) {
                setNotification({ message: 'There was an error handling the order!', type: 'error' });
            }
        }
    };

    const handleInputChange = (event) => {
        setSelectedQuantity(parseInt(event.target.value, 10));
    };

    const calculateDiscountedPrice = () => {
        if (discount) {
            const discountAmount = product.price * (discount.discount.percentage / 100);
            return product.price - discountAmount;
        }
        return product.price;
    };

    return (
        <div>
            <Head />
            <Notification message={notification.message} type={notification.type} />
            {/* Breadcrumb Section */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <p>See more Details</p>
                                <h1>Single Product</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Breadcrumb Section */}

            {/* Single Product */}
            <div className="single-product mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="single-product-img">
                                <img src={`/images/products/${product.image}`} alt={product.name} />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="single-product-content">
                                <h3>{product.name}</h3>
                                <p className="single-product-pricing">
                                    <span>Quantity: {countNumber}</span>
                                    {calculateDiscountedPrice()} VND
                                    {discount && (
                                        <span style={{ textDecoration: 'line-through', marginLeft: '10px' }}>
                                            {product.price} VND
                                        </span>
                                    )}
                                </p>
                                <p><strong>Description: </strong>{product.description}</p>
                                <p><strong>Effect: </strong><br />
                                    {effectNames.map((name, index) => (
                                        <span key={index}>{name}<br /></span>
                                    ))}</p>
                                {/* <p><strong>Contraindication: </strong>{contraindicatedNames.join('. ')}</p> */}
                                <p><strong>Contraindication: </strong><br />
                                    {contraindicatedNames.map((name, index) => (
                                        <span key={index}>{name}<br /></span>
                                    ))}</p>

                                <div className="single-product-form">
                                    <form action="index.html">
                                        <input type="number" placeholder="0" min={0} max={countNumber}
                                            value={selectedQuantity}
                                            onChange={handleInputChange}
                                            onKeyDown={(e) => e.preventDefault()} />
                                    </form>
                                    <button onClick={() => handleAddToCart(product)} style={{
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
                                        <i className="fas fa-shopping-cart"></i> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-">
                    <div className="col-md-11">
                        <h3 style={{ marginTop: '70px', textAlign: 'center' }}><strong>Detail</strong></h3>
                        <table className="table table-bordered" style={{
                            justifyContent: 'center', alignItems: 'center', marginLeft: '70px', marginRight: '70px'
                        }}>
                            <tbody>
                                <tr>
                                    <th>Brand</th>
                                    <td>
                                        {product.brand.name}
                                    </td>
                                </tr>
                                <tr>
                                    <th>Dosage form</th>
                                    <td>{product.dosageForm.name}</td>
                                </tr>
                                <tr>
                                    <th>Medicine type</th>
                                    <td>{product.medicineType.name}</td>
                                </tr>
                                <tr>
                                    <th>Manufacturer</th>
                                    <td>{product.manufacturer.name}</td>
                                </tr>
                                <tr>
                                    <th>Ingredients</th>
                                    <td>
                                        {ingredientMedicine.map((ingredient, index) => (
                                            <div key={index}>
                                                <strong>.</strong> {ingredient.ingredient.name}
                                            </div>
                                        ))}
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* End Single Product */}

            <Footer />
        </div >
    );
}

export default ProductDetail;
