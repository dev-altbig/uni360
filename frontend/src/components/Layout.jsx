import React, { useState } from 'react'

import { Outlet } from 'react-router-dom'
import Header from './includes/Header'
import Footer from './includes/Footer'
import Sidebar from './includes/Sidebar'

const Layout = () => {

    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    }


    return (
        <>
            <div className="app-container">
                <Sidebar isCollapsed={isSidebarCollapsed} />

                <div className="page-content-wrapper d-flex flex-column">
                    <Header toggleSidebar={toggleSidebar}/>
                    <main className="main-area flex-grow-1 p-4">
                        <Outlet />
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    )
}


export default Layout;