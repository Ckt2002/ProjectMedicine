import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Product() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Set the number of items per page
    const [sortType, setSortType] = useState('name'); // State for sorting
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch data from Spring Boot API
        axios.get('http://localhost:8080/api/medicine')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                toast.error('There was an error fetching the data!', error);
            });
        // Kiểm tra xem người dùng đã đăng nhập chưa
        const token = localStorage.getItem('accountId');
        setIsLoggedIn(!!token);
    }, []);

    // Function to sort products based on sort type
    const sortProducts = (products) => {
        return [...products].sort((a, b) => {
            if (sortType === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortType === 'price') {
                return a.price - b.price;
            }
            return 0;
        });
    };

    // Calculate the current products to display
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = sortProducts(products).slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleAddToCart = (product) => {
        if (!isLoggedIn) {
            // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
            navigate('/login');
        } else {
            // Thêm sản phẩm vào giỏ hàng (có thể là gọi API để thêm vào giỏ hàng của người dùng)
            console.log('Thêm sản phẩm vào giỏ hàng:', product);
            // Ví dụ: axios.post('http://localhost:8080/api/cart', { productId: product.id, userId: localStorage.getItem('accountId') })
            // .then(response => console.log(response.data))
            // .catch(error => console.error(error));
        }
    };

    const handleProductDetail = (product) => {
        navigate('/productDetail', { state: { product } });
    };

    return (
        <div>
            <Head />
            <ToastContainer />
            {/* breadcrumb-section */}
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
            {/* end breadcrumb section */}

            <div className="search-bar-tablecell">
                <h3>Search:
                    <input type="text" placeholder="" />
                    <button type="submit"
                        style={{ color: 'white' }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.color = 'black';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#F28123';
                            e.target.style.color = 'white';
                        }}>
                        Search<i className="fas fa-search"></i></button>
                </h3>
            </div>

            {/* Sort Dropdown */}
            {/* Sort Dropdown */}
            <div className="centered-select" style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0'
            }}>
                <select className="styled-select" value={sortType} onChange={(e) => setSortType(e.target.value)} style={{
                    border: '2px solid #F28123',
                    borderRadius: '50px',
                    padding: '10px',
                    outline: 'none',
                    color: 'white',
                    fontSize: '25px',
                    textAlign: 'center',
                    background: '#F28123'
                }}>
                    <option value="name" style={{ color: 'orange', background: 'white' }}>Sort by Name</option>
                    <option value="price" style={{ color: 'orange', background: 'white' }}>Sort by Price</option>
                </select>
            </div>


            {/* products */}
            <div className="product-section mt-80 mb-80">
                <div className="container">
                    <div className="row product-lists">
                        {currentProducts.map((product) => {
                            console.log(product); // Kiểm tra dữ liệu product
                            return (
                                <div key={product.id} className="col-lg-4 col-md-6 text-center">
                                    <div className="single-product-item">
                                        <div className="product-image">
                                            <button onClick={() => handleProductDetail(product)} style={{ border: 'none', background: 'none' }}>
                                                <img src={`assets/img/products/Lecifex 500mg Abbott.webp`} alt={product.name} />
                                            </button>
                                        </div>
                                        <h3>{product.name}</h3>
                                        <p className="product-price">{product.price}$ </p>
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
            {/* end products */}

            <Footer />
        </div >
    );
}

export default Product;
