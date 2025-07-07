import React from "react";
import Dropdown from "react-bootstrap/Dropdown"; // FIX: Use the main import, not /esm
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth'


const SidebarContent = () => {

    const navigate = useNavigate();
    const { user } = useAuth(); // Get the current user's data

    const handleLogout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/Login');
    };
    return (
        <>

            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="bi bi-mortarboard fs-4 me-3"></i>
                <span className="fs-4 sidebar-text">Uni360.ai</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="mb-1">
                    <NavLink to="/" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-speedometer2 me-2"></i>
                        <span className="sidebar-text">Dashboard</span>
                    </NavLink>
                </li>
                
                {/* --- Admin-Only Links --- */}
                {/* These links will only render if the user's role is 'admin' */}
                {user && user.role === 'admin' && (
                    <>
                        <li className="mb-1">
                            <NavLink to="/Add_department" className="nav-link text-white d-flex align-items-center">
                                <i className="bi bi-building-add me-2"></i>
                                <span className="sidebar-text">Manage Department</span>
                            </NavLink>
                        </li>
                        <li className="mb-1">
                            <NavLink to="/DepartmentList" className="nav-link text-white d-flex align-items-center">
                                <i className="bi bi-list-ul me-2"></i>
                                <span className="sidebar-text">All Departments</span>
                            </NavLink>
                        </li>
                        <li className="mb-1">
                            <NavLink to="/Add_professor" className="nav-link text-white d-flex align-items-center">
                                <i className="bi bi-person-plus me-2"></i>
                                <span className="sidebar-text">Add Professor</span>
                            </NavLink>
                        </li>
                        <li className="mb-1">
                            <NavLink to="/ProfessorList" className="nav-link text-white d-flex align-items-center">
                                <i className="bi bi-people me-2" ></i>
                                <span className="sidebar-text">All Professors</span>
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
            <hr />
            <Dropdown>
                <Dropdown.Toggle as="a" href="#" className="d-flex align-items-center text-white text-decoration-none">
                    <img
                        src="https://github.com/mdo.png"
                        alt="profile"
                        width="32"
                        height="32"
                        className="rounded-circle me-2"
                    />
                    {/* Display the username from the token */}
                    <strong className="sidebar-text">{user ? user.username || user.role : 'User'}</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-dark text-small shadow">
                    <Dropdown.Item href="#">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>

    );
};

// The rest of your Sidebar.jsx component is fine
const Sidebar = ({ isCollapsed }) => {
    return (
      <>
        <div className={`sidebar d-none d-md-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${isCollapsed ? 'collapsed' : ''}`}>
            <SidebarContent />
        </div>
        <div className="offcanvas offcanvas-start bg-dark text-white d-md-none" tabIndex="-1" id="mobile-sidebar" aria-labelledby="mobile-sidebar-label">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="mobile-sidebar-label">Menu</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body d-flex flex-column p-3">
                <SidebarContent />
            </div>
        </div>
      </>
    );
};

export default Sidebar;