import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Notification from './Notification';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';

function Cart() {
    const [order, setOrder] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [initialQuantities, setInitialQuantities] = useState({});
    const [totalPriceCal, setTotalPriceCal] = useState(0);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const hasFetchedOrder = useRef(false);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [notification]);

    useEffect(() => {
        const accountId = localStorage.getItem('accountId');
        if (accountId && !hasFetchedOrder.current) {
            fetchOrder(accountId);
            hasFetchedOrder.current = true;
        }
    }, []);

    const fetchOrder = async (accountId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/order/account/${accountId}/status/creating`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.data.length === 1 && !order) {
                setOrder(response.data[0]);
                console.log(response.data[0].totalPrice);
            } else {
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
                setOrder(orderResponse.data);
            }
        } catch (error) {
            setNotification({ message: 'Error fetching order:' + error, type: 'error' });
        }
    };

    const fetchDetailOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/detail-order/order/${order.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(response.data);
            const medicineDetails = response.data.map(detail => ({
                id: detail.seri.medicine.id,
                name: detail.seri.medicine.name,
                price: detail.price,
                image: detail.seri.medicine.image,
                status: detail.seri.medicine.status
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
                const response2 = await axios.get(`http://localhost:8080/api/detail-order/count-order-medicine/${order.id}/${medicineId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const quantity = response2.data;
                quantitiesMap[medicineId] = { ...medicine, quantity };
                initialQuantitiesMap[medicineId] = quantity; // Lưu trữ số lượng ban đầu
                total += medicine.price * quantity;
            }

            setQuantities(quantitiesMap);
            setInitialQuantities(initialQuantitiesMap); // Cập nhật số lượng ban đầu
            setTotalPriceCal(total);

        } catch (error) {
            // console.error('Error fetching detail order:', error);
            setNotification({ message: 'Error fetching detail order: ' + error, type: 'error' });
        }
    };

    const updateSeri = async (seri, statusToUpdate) => {
        const updatedSeri = { ...seri, status: statusToUpdate };
        const updateSeriResponse = await axios.put(`http://localhost:8080/api/seri/${seri.id}`, updatedSeri, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (updateSeriResponse.status === 200) {
            console.log('Seri updated successfully');
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

            setTotalPriceCal(newTotalPrice);

            return updatedQuantities;
        });

        // Xử lý thay đổi số lượng
        const quantityChange = newQuantity - initialQuantities[medicineId];
        // console.log(`Quantity change for medicine ID ${medicineId}: ${quantityChange}`);

        try {
            if (quantityChange < 0) {
                // Số lượng giảm, gọi API xóa DetailOrder
                const response = await axios.delete(
                    `http://localhost:8080/api/detail-order/order/${order.id}/medicine/${medicineId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const seri = response.data.seri;
                // console.log("seri removed: ", seri);
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

                const detailOrderResponse = await axios.post(`http://localhost:8080/api/detail-order`, newDetailOrder, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (detailOrderResponse.status === 201) {
                    // console.log('DetailOrder created successfully');
                }

                // console.log('Seri added: ', seriData);

                updateSeri(seriData, "sold");
            }

            // Cập nhật số lượng ban đầu
            setInitialQuantities(prevQuantities => ({
                ...prevQuantities,
                [medicineId]: newQuantity
            }));
        } catch (error) {
            setNotification({ message: 'Error updating detail order', type: 'error' });
        }
    };

    const deleteDetailOrder = async (order, medicine) => {
        try {
            console.log("order: ", order.id, " medicine: ", medicine);
            const response = await axios.delete(
                `http://localhost:8080/api/detail-order/${order.id}/medicine/${medicine.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setNotification({ message: 'Removed successfully!', type: 'success' });
        } catch (error) {
            setNotification({ message: `Error deleting detail order: ${error.response?.data || error.message}`, type: 'error' });
        }
    };

    useEffect(() => {
        if (order) {
            fetchDetailOrder(order.id);
        }
    }, [order]);

    useEffect(() => {
        if (order && totalPriceCal !== order.totalPrice) {
            const updatedOrder = { ...order, totalPrice: totalPriceCal };
            setOrder(updatedOrder);
            updateOrder(updatedOrder);
        }
    }, [totalPriceCal]);

    const updateOrder = async (updatedOrder) => {
        try {
            const response = await axios.put('http://localhost:8080/api/order', updatedOrder, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setNotification({ message: 'Order updated successfully', type: 'success' });
            }
        } catch (error) {
            setNotification({ message: 'Error updating order: ' + error, type: 'error' });
        }
    };

    const handleOrder = async () => {
        if (!order) return;

        const updatedOrder = { ...order, status: 'ordered' };
        try {
            if (totalPriceCal === 0) {
                setNotification({ message: `Please select medicine before order!`, type: 'error' });
                return;
            }

            // Fetch detail orders for the current order
            const responseDetail = await axios.get(`http://localhost:8080/api/detail-order/order/${order.id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const detailOrders = responseDetail.data;

            // Lấy danh sách các medicine có status là "stop"
            const stoppedMedicines = detailOrders
                .filter(detail => detail.seri.medicine.status === 'stop')
                .map(detail => detail.seri.medicine.name); // Giả sử tên medicine nằm trong thuộc tính 'name'

            // Sử dụng Set để loại bỏ tên trùng lặp
            const uniqueStoppedMedicines = [...new Set(stoppedMedicines)];

            // Kiểm tra nếu có medicine nào bị dừng
            if (uniqueStoppedMedicines.length > 0) {
                const medicineNames = uniqueStoppedMedicines.join(', '); // Chuyển danh sách tên thành chuỗi
                setNotification({ message: `Unable to order. The following medicine has been discontinued: ${medicineNames}.`, type: 'error' });
                return;
            }

            const response = await axios.put('http://localhost:8080/api/order', updatedOrder, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                setNotification({ message: 'Order checked out successfully', type: 'success' });
                fetchOrder(localStorage.getItem('accountId'));
            }
        } catch (error) {
            setNotification({ message: 'Error checking out: ' + error, type: 'error' });
        }
    };

    return (
        <div>
            <Head />
            <Notification message={notification.message} type={notification.type} />

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
                                                <td className="product-image" style={{ maxWidth: '10px' }}><img
                                                    src={`/images/products/${medicine.image}`} alt={medicine.name} /></td>
                                                <td className="product-name" style={{ maxWidth: '300px' }}>{medicine.name}</td>
                                                <td className="product-price">{medicine.price} VND</td>
                                                <td className="product-quantity"><input
                                                    type="number"
                                                    value={medicine.quantity}
                                                    min={1}
                                                    style={{ maxWidth: '60px' }}
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
                                            <td>{totalPriceCal} VND</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="cart-buttons">
                                    <button onClick={handleOrder} className="boxed-btn black"
                                        style={{
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
                                        }}>Order</button>
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
