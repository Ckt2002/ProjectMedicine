import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AdminHeader() {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Admin</title>
                <link rel="icon" type="image/x-icon" href="../assetsAdmin/img/favicon/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link
                    href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
                    rel="stylesheet" />

                <link rel="stylesheet" href="../assetsAdmin/vendor/fonts/boxicons.css" />
                <link rel="stylesheet" href="../assetsAdmin/vendor/css/core.css" class="template-customizer-core-css" />
                <link rel="stylesheet" href="../assets/css/demo.css" />
                <link rel="stylesheet" href="../assetsAdmin/vendor/css/theme-default.css" class="template-customizer-theme-css" />
                <link rel="stylesheet" href="../assetsAdmin/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />

                <link rel="stylesheet" href="../assetsAdmin/vendor/libs/apex-charts/apex-charts.css" />
                <link rel="stylesheet" href="../assetsAdmin/vendor/css/core.css" class="template-customizer-core-css" />
            </Helmet>
        </HelmetProvider>
    )
}

export default AdminHeader