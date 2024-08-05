import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHeader from '../../components/admin/AdminHeader';
import SideBar from '../../components/admin/SideBar';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

// Đăng ký các thành phần của Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Statistical() {
    const [data, setData] = useState({ labels: [], datasets: [] });
    const [detailOrders, setDetailOrders] = useState([]);
    const [mode, setMode] = useState('daily'); // Trạng thái để theo dõi chế độ (ngày, tháng, năm)
    const [startDate, setStartDate] = useState(''); // Ngày bắt đầu
    const [endDate, setEndDate] = useState(''); // Ngày kết thúc

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseRecieved = await axios.get('http://localhost:8080/api/order/status/recieved', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const receivedOrders = responseRecieved.data;
                const orders = Array.isArray(receivedOrders) ? receivedOrders : [receivedOrders];

                // Lấy chi tiết đơn hàng cho từng order
                const detailedOrders = await Promise.all(orders.map(async (order) => {
                    const responseDetail = await axios.get(`http://localhost:8080/api/detail-order/order/${order.id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    return { ...order, details: responseDetail.data };
                }));

                // Store the detailedOrders in the component state
                setDetailOrders(detailedOrders);

                // Lọc đơn hàng theo khoảng thời gian
                const filteredOrders = orders.filter(order => {
                    if (!order.updatedDate) {
                        console.warn('Missing updatedDate for order:', order);
                        return false;
                    }
                    const orderDate = new Date(order.updatedDate);
                    if (isNaN(orderDate)) {
                        console.warn('Invalid date for order:', order);
                        return false;
                    }
                    return (!startDate || orderDate >= new Date(startDate)) && (!endDate || orderDate <= new Date(endDate));
                });

                if (mode === 'daily') {
                    // Tính toán doanh thu theo ngày
                    const revenueByDay = {};
                    filteredOrders.forEach(order => {
                        const date = new Date(order.updatedDate);
                        const day = date.toISOString().split('T')[0]; // Lấy ngày theo định dạng YYYY-MM-DD
                        if (!revenueByDay[day]) {
                            revenueByDay[day] = 0; // Khởi tạo nếu chưa có
                        }
                        revenueByDay[day] += order.totalPrice; // Cộng dồn doanh thu theo ngày
                    });

                    // Chuyển đổi dữ liệu thành định dạng cho biểu đồ
                    const labels = Object.keys(revenueByDay);
                    const revenueData = Object.values(revenueByDay);

                    setData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Daily Revenue',
                                data: revenueData,
                                backgroundColor: 'rgba(111, 66, 193, 0.6)',
                                borderColor: 'rgba(111, 66, 193, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                } else if (mode === 'monthly') {
                    // Tính toán doanh thu theo tháng
                    const revenueByMonth = new Array(12).fill(0);
                    filteredOrders.forEach(order => {
                        const month = new Date(order.updatedDate).getMonth();
                        revenueByMonth[month] += order.totalPrice; // Cộng dồn doanh thu theo tháng
                    });

                    // Chuyển đổi dữ liệu thành định dạng cho biểu đồ
                    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    setData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Monthly Revenue',
                                data: revenueByMonth,
                                backgroundColor: 'rgba(111, 66, 193, 0.6)',
                                borderColor: 'rgba(111, 66, 193, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                } else if (mode === 'yearly') {
                    // Tính toán doanh thu theo năm
                    const revenueByYear = {};
                    filteredOrders.forEach(order => {
                        const year = new Date(order.updatedDate).getFullYear(); // Lấy năm từ ngày
                        if (!revenueByYear[year]) {
                            revenueByYear[year] = 0; // Khởi tạo nếu chưa có
                        }
                        revenueByYear[year] += order.totalPrice; // Cộng dồn doanh thu theo năm
                    });

                    // Chuyển đổi dữ liệu thành định dạng cho biểu đồ
                    const labels = Object.keys(revenueByYear);
                    const revenueData = Object.values(revenueByYear);

                    setData({
                        labels: labels,
                        datasets: [
                            {
                                label: 'Yearly Revenue',
                                data: revenueData,
                                backgroundColor: 'rgba(111, 66, 193, 0.6)',
                                borderColor: 'rgba(111, 66, 193, 1)',
                                borderWidth: 1,
                            },
                        ],
                    });
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [mode, startDate, endDate]); // Thêm startDate và endDate vào dependency array

    // Hàm để chuyển đổi giữa chế độ
    const toggleMode = () => {
        setMode(prev => {
            if (prev === 'daily') return 'monthly';
            if (prev === 'monthly') return 'yearly';
            return 'daily'; // Quay lại chế độ ngày
        });
    };

    // Tùy chọn cho biểu đồ
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: mode === 'daily' ? 'Daily Revenue Chart' : mode === 'monthly' ? 'Monthly Revenue Chart' : 'Yearly Revenue Chart',
            },
        },
    };

    const renderOrderDetails = (details) => {
        const medicineCounts = details.reduce((acc, detail) => {
            const medicineName = detail.seri.medicine.name;
            if (!acc[medicineName]) {
                acc[medicineName] = { price: detail.price, count: 0 };
            }
            acc[medicineName].count += 1;
            return acc;
        }, {});

        return Object.entries(medicineCounts).map(([name, { price, count }]) => (
            <tr key={name}>
                <td>{name}</td>
                <td>{price} VND</td>
                <td>{count}</td>
            </tr>
        ));
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const isOrderInRange = (orderDate, startDate, endDate) => {
        const orderDateObj = new Date(orderDate);
        const startDateObj = startDate ? new Date(startDate) : null;
        const endDateObj = endDate ? new Date(endDate) : null;

        if (startDateObj && orderDateObj < startDateObj) {
            return false;
        }

        if (endDateObj && orderDateObj > endDateObj) {
            return false;
        }

        return true;
    };

    const exportToPdf = async () => {
        const doc = new jsPDF('p', 'pt', 'a4');
        // Add title
        doc.setFontSize(18);
        const title = 'Revenue statistics';
        const pageWidth = doc.internal.pageSize.getWidth();
        const titleX = pageWidth / 2;
        doc.text(title, titleX, 22, { align: 'center' });

        const content = document.getElementById('exportContent');
        const canvas = await html2canvas(content);
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        const yOffset = 40; // Adjust this value as needed to leave space for the title
        doc.addImage(imgData, 'PNG', 0, yOffset, pdfWidth, pdfHeight);
        doc.save('statistical_report.pdf');
    };

    const exportToExcel = () => {
        const wb = XLSX.utils.book_new();
        detailOrders.filter(order => isOrderInRange(order.updatedDate, startDate, endDate)).forEach(order => {
            const wsData = [
                ['Order ID', 'User Name', 'Order Date', 'Updated Date', 'Total Price'],
                [order.id, `${order.accountUser.first_name} ${order.accountUser.last_name}`, formatDate(order.orderDate), formatDate(order.updatedDate), order.totalPrice]
            ];

            wsData.push([]);
            wsData.push(['Medicine Name', 'Price', 'Quantity']);
            renderOrderDetails(order.details).forEach(detail => {
                const name = detail.props.children[0].props.children;
                const price = detail.props.children[1].props.children.toString().replace(/,/g, '');
                const quantity = detail.props.children[2].props.children;
                // wsData.push([name, price, quantity]);
                wsData.push([name, `${price}`, quantity]);
            });

            const ws = XLSX.utils.aoa_to_sheet(wsData);
            XLSX.utils.book_append_sheet(wb, ws, `Order_${order.id}`);
        });

        XLSX.writeFile(wb, 'orders.xlsx');
    };

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <AdminHeader />
                <SideBar />
                <div className="layout-page">
                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-lg-12 mb-4 order-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="content-wrapper">
                                                <button
                                                    onClick={toggleMode}
                                                    className="btn btn-primarys"
                                                    style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }}>
                                                    Switch to {mode === 'daily' ? 'monthly statistics' : mode === 'monthly' ? 'yearly statistics' : 'daily statistics'}
                                                </button>



                                                <div style={{ display: 'flex' }}>
                                                    <label style={{ margin: '10px' }}>From: </label>
                                                    <input
                                                        style={{ marginLeft: '10px' }}
                                                        className="form-control"
                                                        type="date"
                                                        value={startDate}
                                                        onChange={(e) => setStartDate(e.target.value)}
                                                        placeholder="Ngày bắt đầu"
                                                    />
                                                    <label style={{ margin: '10px' }}>to: </label>
                                                    <input
                                                        style={{ marginLeft: '10px' }}
                                                        className="form-control"
                                                        type="date"
                                                        value={endDate}
                                                        onChange={(e) => setEndDate(e.target.value)}
                                                        placeholder="Ngày kết thúc"
                                                    />
                                                </div>
                                                <Bar data={data} options={options} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12 mb-4 order-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                                                <button
                                                    onClick={exportToPdf}
                                                    className="btn btn-primarys"
                                                    style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }}>
                                                    Export to PDF
                                                </button>
                                                <button
                                                    onClick={exportToExcel}
                                                    className="btn btn-primarys"
                                                    style={{ backgroundColor: '#6f42c1', color: 'white', margin: '10px' }}
                                                    onMouseEnter={(e) => {
                                                        e.target.style.backgroundColor = 'white';
                                                        e.target.style.color = 'gray';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.target.style.backgroundColor = '#6f42c1';
                                                        e.target.style.color = 'white';
                                                    }}>
                                                    Export to Excel
                                                </button>
                                            </div>
                                            <div className="content-wrapper" id="exportContent">

                                                {detailOrders.filter(order => isOrderInRange(order.updatedDate, startDate, endDate)).map((order) => (
                                                    <div key={order.id} className="col-lg-12 mb-4">
                                                        <h3>Order {order.id}</h3>
                                                        <table className="table">
                                                            <thead className="table-dark">
                                                                <tr>
                                                                    <th style={{ color: 'white' }}>Order ID</th>
                                                                    <th style={{ color: 'white' }}>User Name</th>
                                                                    <th style={{ color: 'white' }}>Order Date</th>
                                                                    <th style={{ color: 'white' }}>Updated Date</th>
                                                                    <th style={{ color: 'white' }}>Total Price</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{order.id}</td>
                                                                    <td>{order.accountUser.first_name} {order.accountUser.last_name}</td>
                                                                    <td>{formatDate(order.orderDate)}</td>
                                                                    <td>{formatDate(order.updatedDate)}</td>
                                                                    <td>{order.totalPrice} VND</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <h3 style={{ marginTop: '30px' }}>Details {order.id}</h3>
                                                        <table className="table">
                                                            <thead className="table-dark">
                                                                <tr>
                                                                    <th style={{ color: 'white' }}>Medicine Name</th>
                                                                    <th style={{ color: 'white' }}>Price</th>
                                                                    <th style={{ color: 'white' }}>Quantity</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {renderOrderDetails(order.details)}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                ))}
                                            </div>
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

export default Statistical;
