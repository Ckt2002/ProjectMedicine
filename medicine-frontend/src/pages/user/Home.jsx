import React, { useEffect, useState } from 'react';
import Footer from '../../components/user/Footer';
import Head from '../../components/user/Head';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import Notification from './Notification';
import moment from 'moment';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
    const [medicines, setMedicines] = useState([]);
    const [detailDiscounts, setDetailDiscounts] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // localStorage.removeItem('accountId');
        // localStorage.removeItem('token');
        // localStorage.removeItem('accountRole');
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/medicine/status/selling')
            .then(response => {
                setMedicines(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the medicines!', error);
                setNotification({ message: 'There was an error fetching medicines!', type: 'error' });
            });
        axios.get('http://localhost:8080/api/detail-discount')
            .then(response => {
                setDetailDiscounts(response.data);
            })
            .catch(error => {
                setNotification({ message: 'There was an error fetching the detail discounts!', type: 'error' });
            });
    }, []);

    const handleProductDetail = (product) => {
        navigate('/productDetail', { state: { product } });
    };

    const getDiscountedPrice = (product) => {
        const discountDetail = detailDiscounts.find(detail => detail.medicine.id === product.id);
        if (discountDetail) {
            const today = moment().startOf('day');
            // console.log(today);
            const startDate = moment(discountDetail.fromDate).startOf('day');
            // console.log('startDate: ', discountDetail.startDate);
            const endDate = moment(discountDetail.toDate).endOf('day');
            // console.log('endDate: ', endDate);

            if (today.isBetween(startDate, endDate, null, '[]')) {
                const discountPercentage = discountDetail.discount.percentage; // Assuming discount has a percentage field
                return product.price * (1 - discountPercentage / 100);
            }
        }
        return null;
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            <Head />
            <Notification message={notification.message} type={notification.type} />

            {/*  hero area  */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>HOME</h1>
                                <div className="hero-btns">
                                    <Link to="/product" className="boxed-btn">Go To Shop</Link>
                                    {/* <Link href="" className="bordered-btn">Contact Us</Link> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end hero area  */}

            {/*  features list section  */}
            <div className="list-section pt-80 pb-80">
                <div className="container">

                    <div className="row" style={{ justifyContent: 'center', margin: '20px 0' }}>
                        <div className="" style={{ marginRight: '150px' }}>
                            <div className="list-box d-flex align-items-center">
                                <div className="list-icon">
                                    <i className="fas fa-shipping-fast"></i>
                                </div>
                                <div className="content">
                                    <h3>Free Shipping</h3>
                                    <p>When order over $75</p>
                                </div>
                            </div>
                        </div>
                        <div className="" style={{ marginLeft: '150px' }}>
                            <div className="list-box d-flex align-items-center">
                                <div className="list-icon">
                                    <i className="fas fa-phone-volume"></i>
                                </div>
                                <div className="content">
                                    <h3>24/7 Support</h3>
                                    <p>Get support all day</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {/*  end features list section  */}

            {/*  product section  */}
            <div className="product-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="section-title">
                                <h3><span className="orange-text">Our</span> Products</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {medicines.slice(0, 3).map(medicine => {
                            const discountedPrice = getDiscountedPrice(medicine);
                            return (
                                <div className="col-lg-4 col-md-6 text-center" key={medicine.id} style={{ marginBottom: '40px' }}>
                                    <div className="single-product-item" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        alignItems: 'center',
                                        textAlign: 'center'
                                    }}>
                                        <div className="product-image">
                                            <img src={`/images/products/${medicine.image}`}
                                                alt={medicine.name} style={{ height: '250px', width: 'auto' }} />
                                        </div>
                                        <h3>{medicine.name}</h3>
                                        <p className="product-price" style={{ marginTop: 'auto' }}>
                                            {discountedPrice !== null ? (
                                                <>
                                                    {discountedPrice} VND
                                                    <span className="original-price">{medicine.price}$</span>
                                                </>
                                            ) : (
                                                `${medicine.price} VND`
                                            )}
                                        </p>
                                        <button onClick={() => handleProductDetail(medicine)} style={{
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
                </div>
            </div>
            {/*  end product section  */}

            {/*  testimonail-section  */}
            <div className="testimonail-section mt-150 mb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1 text-center">
                            <Slider {...settings} className="testimonial-sliders">
                                <div className="single-testimonial-slider">
                                    <div className="client-avater">
                                        <img src="assets/img/avaters/avatar1.png" alt="" />
                                    </div>
                                    <div className="client-meta">
                                        <h3>Saira Hakim <span>Doctor</span></h3>
                                        <p className="testimonial-body">
                                            "Dr. Saira Hakim is a highly qualified physician with over 10 years of experience in internal medicine.
                                            She is dedicated to providing exceptional patient care and has a strong background in diagnosing and treating complex medical conditions.
                                            Dr. Saira is committed to staying updated with the latest medical advancements and employs a patient-centered approach to ensure the best outcomes for his patients."
                                        </p>
                                        <div className="last-icon">
                                            <i className="fas fa-quote-right"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-testimonial-slider">
                                    <div className="client-avater">
                                        <img src="assets/img/avaters/avatar2.png" alt="" />
                                    </div>
                                    <div className="client-meta">
                                        <h3>David Niph <span>Doctor</span></h3>
                                        <p className="testimonial-body">
                                            "Dr. David Niph is a highly qualified physician with over 10 years of experience in internal medicine.
                                            He is dedicated to providing exceptional patient care and has a strong background in diagnosing and treating complex medical conditions.
                                            Dr. David is committed to staying updated with the latest medical advancements and employs a patient-centered approach to ensure the best outcomes for her patients."
                                        </p>
                                        <div className="last-icon">
                                            <i className="fas fa-quote-right"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="single-testimonial-slider">
                                    <div className="client-avater">
                                        <img src="assets/img/avaters/avatar3.png" alt="" />
                                    </div>
                                    <div className="client-meta">
                                        <h3>Jacob Sikim <span>Doctor</span></h3>
                                        <p className="testimonial-body">
                                            "Dr. Jacob Sikim is a highly qualified physician with over 10 years of experience in internal medicine.
                                            He is dedicated to providing exceptional patient care and has a strong background in diagnosing and treating complex medical conditions.
                                            Dr. Jacob is committed to staying updated with the latest medical advancements and employs a patient-centered approach to ensure the best outcomes for her patients."
                                        </p>
                                        <div className="last-icon">
                                            <i className="fas fa-quote-right"></i>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end testimonail-section  */}

            {/*  latest news  */}
            <div className="latest-news pt-150 pb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="section-title">
                                <h3><span className="orange-text">Our</span> News</h3>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-latest-news">
                                <p>
                                    <img src="assets/img/widescreen-inconvo-tattoos-2-1024x576.avif" alt="" />
                                </p>
                                <div className="news-text-box">
                                    <h3><p><strong>Can tattoos cause blood or skin cancer?</strong></p></h3>
                                    <p className="blog-meta">
                                        <span className="author"><i className="fas fa-user"></i> Admin</span>
                                        <span className="date"><i className="fas fa-calendar"></i> 27 July, 2024</span>
                                    </p>
                                    <p className="excerpt">
                                        Some research has found a link between tattoos and an increased risk of cancer, and recent evidence appears to suggest that tattoos could heighten the risk of blood cancer, in particular. What biological mechanisms might explain this link, and should people really worry about the health implications of getting a tattoo? This podcast episode takes a deep dive into the latest evidence.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-latest-news">
                                <p>
                                    <img src="assets/img/000695729fef6681d2dd14bf399dd1aa.jpg" alt="" />
                                </p>
                                <div className="news-text-box">
                                    <h3><p><strong>Common diabetes drug may desensitize people to dangerous drop in blood sugar</strong></p></h3>
                                    <p className="blog-meta">
                                        <span className="author"><i className="fas fa-user"></i> Admin</span>
                                        <span className="date"><i className="fas fa-calendar"></i> 27 July, 2024</span>
                                    </p>
                                    <p className="excerpt">Sulfonylureas are among the oldest diabetes medications in use, discovered in 1946 and introduced clinically in 1956. They work by stimulating beta cells in the pancreas, promoting insulin production.

                                        Sulfonylureas include drugs such as Glipizide, Glipizide ER, Glimepiride, and Glyburide, all of which are available in the United States.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                            <div className="single-latest-news">
                                <p>
                                    <img src="assets/img/IN_VITRO-1200x628-Facebook.avif" alt="" />
                                </p>
                                <div className="news-text-box">
                                    <h3><p><strong>IVF research: What are the latest advances, and what obstacles stand in the way?</strong></p></h3>
                                    <p className="blog-meta">
                                        <span className="author"><i className="fas fa-user"></i> Admin</span>
                                        <span className="date"><i className="fas fa-calendar"></i> 27 July, 2024</span>
                                    </p>
                                    <p className="excerpt">The past three decades have seen a steady increase in vitro fertilisation (IVF) success rates, and new research promises to push numbers even higher. But a surprising barrier stands in the way of innovation: legislation. What do the experts have to say about the obstacles, and what can individuals do to boost their chances of growing their families?</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end latest news  */}

            {/*  logo carousel  */}
            <div className="logo-carousel-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="logo-carousel-inner">
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/1.png" alt="" />
                                </div>
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/2.png" alt="" />
                                </div>
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/3.png" alt="" />
                                </div>
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/4.png" alt="" />
                                </div>
                                <div className="single-logo-item">
                                    <img src="assets/img/company-logos/5.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end logo carousel  */}

            <Footer />
        </div >
    )
}

export default Home