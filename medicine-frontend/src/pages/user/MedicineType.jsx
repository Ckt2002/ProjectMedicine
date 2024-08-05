import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Head from '../../components/user/Head';
import Footer from '../../components/user/Footer';

function MedicineType() {
    const [medicineTypes, setMedicineTypes] = useState([]);
    const navigate = useNavigate();
    const columns = 5; // Số lượng cột bạn muốn chia

    useEffect(() => {
        // Fetch medicine types from Spring Boot API
        axios.get('http://localhost:8080/api/medicine_type')
            .then(response => {
                setMedicineTypes(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the medicine types!', error);
            });
    }, []);

    const handleMedicineTypeClick = (type) => {
        navigate('/product', { state: { selectedMedicineType: type.id } });
    };

    // Tính toán số lượng hàng cần thiết
    const rows = Math.ceil(medicineTypes.length / columns);

    return (
        <div>
            <Head />
            {/*  hero area  */}
            <div className="breadcrumb-section breadcrumb-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 text-center">
                            <div className="breadcrumb-text">
                                <h1>MEDICINE TYPES</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  end hero area  */}

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto', margin: '50px' }}>
                <table style={{ width: '100%', maxWidth: '1000px', borderCollapse: 'collapse' }}>
                    <tbody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: columns }).map((_, colIndex) => {
                                    const typeIndex = rowIndex * columns + colIndex;
                                    const type = medicineTypes[typeIndex];
                                    return (
                                        <td key={colIndex}
                                            onClick={() => type && handleMedicineTypeClick(type)}
                                            style={{
                                                padding: '10px',
                                                border: 'none',
                                                color: 'blue',
                                                cursor: type ? 'pointer' : 'default',
                                                fontSize: '20px'
                                            }}>
                                            {type ? type.name : ''}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </div>
    );
}


export default MedicineType;