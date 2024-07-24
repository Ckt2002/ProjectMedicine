import React from 'react'
import Footer from '../../components/user/Footer';
import Head from '../../components/user/Head';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
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

            {/*  hero area  */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>HOME</h1>
                                <div className="hero-btns">
                                    <Link to="/product" className="boxed-btn">Go To Shop</Link>
                                    <Link href="" className="bordered-btn">Contact Us</Link>
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

                    <div className="row">
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
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
                        <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
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
                        <div className="col-lg-4 col-md-6">
                            <div className="list-box d-flex justify-content-start align-items-center">
                                <div className="list-icon">
                                    <i className="fas fa-sync"></i>
                                </div>
                                <div className="content">
                                    <h3>Refund</h3>
                                    <p>Get refund within 3 days!</p>
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
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-1.jpg" alt="" /></a>
                                </div>
                                <h3>Strawberry</h3>
                                <p className="product-price"><span>Per Kg</span> 85$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-2.jpg" alt="" /></a>
                                </div>
                                <h3>Berry</h3>
                                <p className="product-price"><span>Per Kg</span> 70$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0 text-center">
                            <div className="single-product-item">
                                <div className="product-image">
                                    <a href="single-product.html"><img src="assets/img/products/product-img-3.jpg" alt="" /></a>
                                </div>
                                <h3>Lemon</h3>
                                <p className="product-price"><span>Per Kg</span> 35$ </p>
                                <a href="cart.html" className="cart-btn"><i className="fas fa-shopping-cart"></i> Add to Cart</a>
                            </div>
                        </div>
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
                                        <h3>Saira Hakim <span>Local shop owner</span></h3>
                                        <p className="testimonial-body">
                                            " Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto
                                            beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis
                                            iste natus error sit voluptatem accusantium "
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
                                        <h3>David Niph <span>Local shop owner</span></h3>
                                        <p className="testimonial-body">
                                            " Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto
                                            beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis
                                            iste natus error sit voluptatem accusantium "
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
                                        <h3>Jacob Sikim <span>Local shop owner</span></h3>
                                        <p className="testimonial-body">
                                            " Sed ut perspiciatis unde omnis iste natus error veritatis et quasi architecto
                                            beatae vitae dict eaque ipsa quae ab illo inventore Sed ut perspiciatis unde omnis
                                            iste natus error sit voluptatem accusantium "
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
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, fuga quas itaque eveniet
                                    beatae optio.</p>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-latest-news">
                                <a href="single-news.html">
                                    <div className="latest-news-bg news-bg-1"></div>
                                </a>
                                <div className="news-text-box">
                                    <h3><a href="single-news.html">You will vainly look for fruit on it in autumn.</a></h3>
                                    <p className="blog-meta">
                                        <span className="author"><i className="fas fa-user"></i> Admin</span>
                                        <span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
                                    </p>
                                    <p className="excerpt">Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi.
                                        Praesent vitae mattis nunc, egestas viverra eros.</p>
                                    <a href="single-news.html" className="read-more-btn">read more <i
                                        className="fas fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-latest-news">
                                <a href="single-news.html">
                                    <div className="latest-news-bg news-bg-2"></div>
                                </a>
                                <div className="news-text-box">
                                    <h3><a href="single-news.html">A man's worth has its season, like tomato.</a></h3>
                                    <p className="blog-meta">
                                        <span className="author"><i className="fas fa-user"></i> Admin</span>
                                        <span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
                                    </p>
                                    <p className="excerpt">Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi.
                                        Praesent vitae mattis nunc, egestas viverra eros.</p>
                                    <a href="single-news.html" className="read-more-btn">read more <i
                                        className="fas fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                            <div className="single-latest-news">
                                <a href="single-news.html">
                                    <div className="latest-news-bg news-bg-3"></div>
                                </a>
                                <div className="news-text-box">
                                    <h3><a href="single-news.html">Good thoughts bear good fresh juicy fruit.</a></h3>
                                    <p className="blog-meta">
                                        <span className="author"><i className="fas fa-user"></i> Admin</span>
                                        <span className="date"><i className="fas fa-calendar"></i> 27 December, 2019</span>
                                    </p>
                                    <p className="excerpt">Vivamus lacus enim, pulvinar vel nulla sed, scelerisque rhoncus nisi.
                                        Praesent vitae mattis nunc, egestas viverra eros.</p>
                                    <a href="single-news.html" className="read-more-btn">read more <i
                                        className="fas fa-angle-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <a href="news.html" className="boxed-btn">More News</a>
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