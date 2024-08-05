import React from 'react';

const Notification = ({ message, type }) => {
    if (!message) return null;

    const notificationStyle = {
        padding: '16px',
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        borderRadius: '4px',
        color: '#fff',
        opacity: 0.9,
        backgroundColor: type === 'success' ? '#4caf50' : '#f44336',
    };

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    );
};

export default Notification;