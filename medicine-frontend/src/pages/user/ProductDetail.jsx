import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Head from '../../components/user/Head'
import Footer from '../../components/user/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetail() {
    const [ingredientMedicine, setIngredientMedicines] = useState([]);
    const [countNumber, setCountNumber] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const location = useLocation();
    const { product } = location.state || {}; // Lấy sản phẩm từ state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    let order = null;

    const getDetailMedicine = async () => {
        await axios.get(`http://localhost:8080/api/ingredient_medicine/medicine/${product.id}`)
            .then(response => {
                setIngredientMedicines(response.data);
            })
            .catch(error => {
                toast.error('There was an error fetching the data!', error);
            });
    };

    const getCountNumber = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/seri/count/${product.id}/new`);
            setCountNumber(response.data);
        } catch (error) {
            toast.error('There was an error fetching the data!', error);
        }
    };

    useEffect(() => {

        getDetailMedicine();

        getCountNumber();

        // Kiểm tra xem người dùng đã đăng nhập chưa
        const token = localStorage.getItem('accountId');
        setIsLoggedIn(!!token);
    }, [product]);

    const fetchRandomSeri = async (medicineId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/seri/random-seri/${medicineId}`);
            return response.data;
        } catch (error) {
            toast.error('There was an error fetching the random seri!', error);
            return null;
        }
    };

    const handleAddToCart = async (product) => {
        if (!isLoggedIn) {
            // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
            navigate('/login');
        } else {
            console.log(selectedQuantity);
            if (selectedQuantity === 0) {
                toast.error('Quantity must be greater than 0');
                return;
            }
            try {
                const response = await axios.get(`http://localhost:8080/api/order/status/creating`);
                if (response.data.length === 0) {
                    const newOrder = {
                        totalPrice: 0.0,
                        orderDate: new Date().toISOString(),
                        updatedDate: new Date().toISOString(),
                        status: 'creating',
                        accountUser: { id: localStorage.getItem('accountId') } // Lấy accountId từ localStorage
                    };
                    const orderResponse = await axios.post('http://localhost:8080/api/order', newOrder);

                    order = orderResponse.data;
                    // console.log('Order:', order);
                } else {
                    // Xử lý logic giỏ hàng nếu tìm thấy Order với status 'creating'
                    order = response.data[0];
                    // console.log('Order:', order);
                }

                for (let i = 0; i < selectedQuantity; i++) {
                    try {
                        const seriData = await fetchRandomSeri(product.id);
                        if (seriData) {
                            // console.log('Seri Data:', seriData);

                            // Tạo DetailOrder mới
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
                                price: product.price
                            };

                            // Gọi API thêm DetailOrder
                            const detailOrderResponse = await axios.post('http://localhost:8080/api/detail-order', newDetailOrder);
                            if (detailOrderResponse.status === 201) {
                                console.log('DetailOrder created successfully');
                            }

                            // Cập nhật trạng thái của Seri thành "sold"
                            const updatedSeri = { ...seriData, status: 'sold' };
                            const updateSeriResponse = await axios.put(`http://localhost:8080/api/seri/${seriData.id}`, updatedSeri);
                            if (updateSeriResponse.status === 200) {
                                console.log('Seri updated successfully');
                            }
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error('There was an error processing the seri!', error);
                    }
                }
                getDetailMedicine();
                getCountNumber();
            } catch (error) {
                toast.error('There was an error handling the order!', error);
            }

        }
    };

    const handleInputChange = (event) => {
        setSelectedQuantity(parseInt(event.target.value, 10));
        console.log(event.target.value);
    };

    return (
        <div>
            <Head />
            <ToastContainer />
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
                                <img src={`assets/img/products/Lecifex 500mg Abbott.webp`} alt={product.name} />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="single-product-content">
                                <h3>{product.name}</h3>
                                <p className="single-product-pricing"><span>Quantity: {countNumber}</span> ${product.price}</p>
                                <p><strong>Description: </strong>{product.description}</p>
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
        </div>
    )
}

export default ProductDetail