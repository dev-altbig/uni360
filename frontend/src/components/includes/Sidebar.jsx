import React from "react";
import Dropdown from "react-bootstrap/Dropdown"; // FIX: Use the main import, not /esm
import { NavLink } from 'react-router-dom';

const SidebarContent = () => {
    return (
        <>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <i className="bi bi-bootstrap fs-4 me-3"></i>
                <span className="fs-4 sidebar-text">Uni360.ai</span>
            </a>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item mb-1">
                    {/* This link is already correct, pointing to the index route 
                    <NavLink to="/" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-house-door me-2"></i>
                        <span className="sidebar-text">Home</span>
                    </NavLink>
                    */}
                </li>
                <li className="mb-1">
                    {/* FIX: Changed to="/" to match the index route defined in App.jsx */}
                    <NavLink to="/" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-speedometer2 me-2"></i>
                        <span className="sidebar-text">Dashboard</span>
                    </NavLink>
                </li>
                <li className="mb-1">
                    <NavLink to="/Add_department" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-people me-2"></i>
                        <span className="sidebar-text">Manage Department</span>
                    </NavLink>
                </li>
                <li className="mb-1">
                    <NavLink to="/DepartmentList" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-people me-2"></i>
                        <span className="sidebar-text">All Department</span>
                    </NavLink>
                </li>
                <li className="mb-1">
                    <NavLink to="/Add_professor" className="nav-link text-white d-flex align-items-center">
                        <i className="bi bi-people me-2"></i>
                        <span className="sidebar-text">Add Professor</span>
                    </NavLink>
                </li>
                {/* These are fine as placeholders for now */}


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
                    <strong className="sidebar-text">mdo</strong>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-dark text-small shadow">
                    <Dropdown.Item href="#">New project...</Dropdown.Item>
                    <Dropdown.Item href="#">Settings</Dropdown.Item>
                    <Dropdown.Item href="#">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">Sign out</Dropdown.Item>
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