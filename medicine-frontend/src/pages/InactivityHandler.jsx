import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityHandler = () => {
    const navigate = useNavigate();
    let inactivityTimeout;

    // Reset Time
    const resetInactivityTimeout = () => {
        clearTimeout(inactivityTimeout);
        inactivityTimeout = setTimeout(() => {
            const roleTemp = localStorage.getItem('accountRole');
            localStorage.removeItem('accountId');
            localStorage.removeItem('accountRole');

            if (roleTemp === 'admin') {
                navigate('/admin/login');
            } else if (roleTemp === 'user') {
                navigate('/login');
            }
        }, 30 * 60 * 1000); // 30 minutes
    };

    // Check mouse movement
    useEffect(() => {
        const handleActivity = () => resetInactivityTimeout();

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        resetInactivityTimeout();

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
            clearTimeout(inactivityTimeout);
        };
    }, []);
    return null;
};


export default InactivityHandler;
