import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideBar from '../../components/admin/SideBar';
import { Link } from 'react-router-dom';

function ListUserAccount() {
    const [accounts, setAccounts] = useState([]);
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });
    const [filterRole, setFilterRole] = useState('');
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/account', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleFilterRoleChange = (e) => {
        setFilterRole(e.target.value);
    };

    const handleFilterStatusChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleRoleChange = async (account, newRole) => {
        const updatedAccount = { ...account, role: newRole };
        try {
            const response = await axios.put('http://localhost:8080/api/account', updatedAccount, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAccounts((prevAccounts) =>
                prevAccounts.map((acc) => (acc.id === account.id ? response.data : acc))
            );
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    const handleStatusChange = async (account, newStatus) => {
        const updatedAccount = { ...account, status: newStatus };
        try {
            const response = await axios.put('http://localhost:8080/api/account', updatedAccount, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setAccounts((prevAccounts) =>
                prevAccounts.map((acc) => (acc.id === account.id ? response.data : acc))
            );
        } catch (error) {
            console.error('Error updating account:', error);
        }
    };

    const sortedAccounts = React.useMemo(() => {
        let sortableAccounts = [...accounts];
        if (sortConfig !== null) {
            sortableAccounts.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableAccounts;
    }, [accounts, sortConfig]);

    const filteredAccounts = sortedAccounts.filter((account) =>
        account.email.toLowerCase().includes(search.toLowerCase()) ||
        account.username.toLowerCase().includes(search.toLowerCase()) ||
        account.first_name.toLowerCase().includes(search.toLowerCase()) ||
        account.last_name.toLowerCase().includes(search.toLowerCase()) ||
        account.address.toLowerCase().includes(search.toLowerCase()) ||
        account.role.toLowerCase().includes(search.toLowerCase()) ||
        account.status.toLowerCase().includes(search.toLowerCase())
    ).filter((account) => {
        return (
            (filterRole === '' || account.role === filterRole) &&
            (filterStatus === '' || account.status === filterStatus)
        );
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        // Layout wrapper
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <SideBar />

                <div className="layout-page">
                    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                        id="layout-navbar">

                        {/* Searching */}
                        <div className="nav-item d-flex align-items-center" style={{ width: '100%' }}>
                            <i className="bx bx-search fs-10 lh-100"></i>
                            <input
                                type="text"
                                className="form-control border-0 shadow-none"
                                placeholder="Search..."
                                aria-label="Search..."
                                style={{ width: '100%' }}
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </nav>

                    <div className="content-wrapper">
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div className="row">
                                <div className="col-lg-12 mb-4 order-0">
                                    <div className="card">
                                        <div className="card-body">
                                            <table className="table">
                                                <thead className="table-dark">
                                                    <tr>
                                                        <th scope="col" style={{ color: 'white' }}></th>
                                                        <th scope="col" onClick={() => requestSort('email')}>
                                                            <Link style={{ color: 'white' }}>Email</Link></th>
                                                        <th scope="col" onClick={() => requestSort('username')}>
                                                            <Link style={{ color: 'white' }}>Username</Link></th>
                                                        <th scope="col" onClick={() => requestSort('first_name')}>
                                                            <Link style={{ color: 'white' }}>First name</Link></th>
                                                        <th scope="col" onClick={() => requestSort('last_name')}>
                                                            <Link style={{ color: 'white' }}>Last name</Link></th>
                                                        <th scope="col" onClick={() => requestSort('address')}>
                                                            <Link style={{ color: 'white' }}>Address</Link></th>
                                                        <th scope="col" onClick={() => requestSort('role')}>
                                                            <Link style={{ color: 'white' }}>Role</Link></th>
                                                        <th scope="col" onClick={() => requestSort('status')}>
                                                            <Link style={{ color: 'white' }}>Status</Link></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredAccounts.map((account, index) => (
                                                        <tr key={account.id}>
                                                            <th scope="row">{index + 1}</th>
                                                            <td>{account.email}</td>
                                                            <td>{account.username}</td>
                                                            <td>{account.first_name}</td>
                                                            <td>{account.last_name}</td>
                                                            <td>{account.address}</td>
                                                            <td>
                                                                <select value={account.role} className="form-select" aria-label="Default select example"
                                                                    onChange={(e) => handleRoleChange(account, e.target.value)}>
                                                                    <option value="admin">Admin</option>
                                                                    <option value="user">User</option>
                                                                </select>
                                                            </td>
                                                            <td>
                                                                <select value={account.status} className="form-select" aria-label="Default select example"
                                                                    onChange={(e) => handleStatusChange(account, e.target.value)}>
                                                                    <option value="active" style={{ color: 'green' }}>Active</option>
                                                                    <option value="inactive" style={{ color: 'red' }}>Inactive</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListUserAccount