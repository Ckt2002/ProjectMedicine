import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';
import { toast, ToastContainer } from 'react-toastify';

function Cart() {
    const [order, setOrder] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [initialQuantities, setInitialQuantities] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    // const [quantityChanges, setQuantityChanges] = useState({});

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/status/creating`);
            setOrder(response.data[0]);
        } catch (error) {
            console.error('Error fetching order:', error);
        }
    };

    const fetchDetailOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/detail-order/order/${order.id}`);

            const medicineDetails = response.data.map(detail => ({
                id: detail.seri.medicine.id,
                name: detail.seri.medicine.name,
                price: detail.seri.medicine.price,
                image: detail.seri.medicine.image
            }));

            const uniqueDetailsMap = new Map();
            medicineDetails.forEach(medicine => {
                if (!uniqueDetailsMap.has(medicine.id)) {
                    uniqueDetailsMap.set(medicine.id, { ...medicine, quantity: 0 });
                }
            });

            const quantitiesMap = {};
            const initialQuantitiesMap = {};
            let total = 0;
            for (let [medicineId, medicine] of uniqueDetailsMap) {
                const response2 = await axios.get(`http://localhost:8080/api/detail-order/count-by-medicine/${medicineId}`);
                const quantity = response2.data;
                quantitiesMap[medicineId] = { ...medicine, quantity };
                initialQuantitiesMap[medicineId] = quantity; // Lưu trữ số lượng ban đầu
                total += medicine.price * quantity;
            }

            setQuantities(quantitiesMap);
            setInitialQuantities(initialQuantitiesMap); // Cập nhật số lượng ban đầu
            setTotalPrice(total);

        } catch (error) {
            console.error('Error fetching detail order:', error);
        }
    };

    const updateSeri = async (seri, statusToUpdate) => {
        const updatedSeri = { ...seri, status: statusToUpdate };
        const updateSeriResponse = await axios.put(`http://localhost:8080/api/seri/${seri.id}`, updatedSeri);
        if (updateSeriResponse.status === 200) {
            console.log('Seri updated successfully');
        }
    };

    const fetchRandomSeri = async (medicineId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/seri/random-seri/${medicineId}`);
            return response.data;
        } catch (error) {
            toast.error('There was an error fetching the random seri!', error);
            return null;
        }
    };

    // Update cart
    const handleQuantityChange = async (medicineId, newQuantity) => {
        const medicine = quantities[medicineId];
        if (!medicine) return; // Nếu không tìm thấy sản phẩm, không làm gì cả

        // Cập nhật số lượng sản phẩm trong state
        setQuantities(prevQuantities => {
            const updatedQuantities = {
                ...prevQuantities,
                [medicineId]: {
                    ...prevQuantities[medicineId],
                    quantity: newQuantity
                }
            };

            // Tính tổng giá mới
            let newTotalPrice = 0;
            Object.values(updatedQuantities).forEach(med => {
                newTotalPrice += med.price * med.quantity;
            });

            setTotalPrice(newTotalPrice);

            return updatedQuantities;
        });

        // Xử lý thay đổi số lượng
        const quantityChange = newQuantity - initialQuantities[medicineId];
        console.log(`Quantity change for medicine ID ${medicineId}: ${quantityChange}`);

        try {
            if (quantityChange < 0) {
                // Số lượng giảm, gọi API xóa DetailOrder
                const response = await axios.delete(`http://localhost:8080/api/detail-order/order/${order.id}/medicine/${medicineId}`);
                const seri = response.data.seri;
                console.log("seri removed: ", seri);
                updateSeri(seri, "new");
            } else if (quantityChange > 0) {
                // Số lượng tăng, gọi API thêm DetailOrder
                const seriData = await fetchRandomSeri(medicine.id);
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
                    price: medicine.price
                };

                const detailOrderResponse = await axios.post(`http://localhost:8080/api/detail-order`, newDetailOrder);
                if (detailOrderResponse.status === 201) {
                    console.log('DetailOrder created successfully');
                }

                console.log('Seri added: ', seriData);

                updateSeri(seriData, "sold");
            }

            // Cập nhật số lượng ban đầu
            setInitialQuantities(prevQuantities => ({
                ...prevQuantities,
                [medicineId]: newQuantity
            }));
        } catch (error) {
            toast.error('Error updating detail order:', error);
        }
    };

    const deleteDetailOrder = async (order, medicine) => {
        try {
            console.log("order: ", order.id, " medicine: ", medicine);
            const response = await axios.delete(`http://localhost:8080/api/detail-order/${order.id}/medicine/${medicine.id}`);
            toast.success(`Removed successful!`);
        } catch (error) {
            toast.error(`Error deleting detail order: ${error.response?.data || error.message}`);
        }
    };


    useEffect(() => {
        fetchOrder();
    }, []);

    useEffect(() => {
        if (order) {
            fetchDetailOrder(order.id);
        }
    }, [order]);

    return (
        <div>
            <Head />
            <ToastContainer />

            {/* breadcrumb-section  */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>CART</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section  */}

            {/* cart  */}
            <div className="cart-section mt-80 mb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="cart-table-wrap">
                                <table className="cart-table">
                                    <thead className="cart-table-head">
                                        <tr className="table-head-row">
                                            <th className="product-remove"></th>
                                            <th className="product-image">Product Image</th>
                                            <th className="product-name">Name</th>
                                            <th className="product-price">Price</th>
                                            <th className="product-quantity">Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.values(quantities).map((medicine) => (
                                            <tr className="table-body-row" key={medicine.id}>
                                                <td className="product-remove">
                                                    <button style={{ border: 'none', background: 'transparent' }}
                                                        onClick={() => deleteDetailOrder(order, medicine)}>
                                                        <i className="far fa-window-close"></i>
                                                    </button>
                                                </td>
                                                <td className="product-image"><img
                                                    src={`assets/img/products/Lecifex 500mg Abbott.webp`} alt={medicine.name} /></td>
                                                <td className="product-name">{medicine.name}</td>
                                                <td className="product-price">${medicine.price}</td>
                                                <td className="product-quantity"><input
                                                    type="number"
                                                    value={medicine.quantity}
                                                    min={1}

                                                    onChange={(e) => handleQuantityChange(medicine.id, parseInt(e.target.value))}
                                                    onKeyDown={(e) => e.preventDefault()} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="total-section">
                                <table className="total-table">
                                    <thead className="total-table-head">
                                        <tr className="table-total-row">
                                            <th>Total</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="total-data">
                                            <td><strong>Total: </strong></td>
                                            <td>${totalPrice}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    {/* <button onClick={handleUpdateCart} className="boxed-btn">Update Cart</button> */}
                                    <a href="checkout.html" className="boxed-btn black">Check Out</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end cart  */}

            <Footer />
        </div>
    )
}

export default Cart;
