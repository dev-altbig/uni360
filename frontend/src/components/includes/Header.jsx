import React from 'react'; // <-- FIX: Capital 'R'
import Dropdown from 'react-bootstrap/Dropdown';
import useAuth from '../../hooks/useAuth'
// FIX: Accept toggleSidebar as a prop
const Header = ({ toggleSidebar }) => {

    const handleLogout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/Login');
    };
    const  {user} = useAuth()
    return (
        <header className="navbar navbar-light bg-light border-bottom shadow-sm">
          <div className="container-fluid">
            {/* This button is for the mobile offcanvas sidebar */}
            <button className="navbar-toggler d-md-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobile-sidebar" aria-controls="mobile-sidebar">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            {/* This button toggles the desktop sidebar */}
            <button className="btn d-none d-md-inline-block" type="button" onClick={toggleSidebar}> {/* <-- FIX: Use the prop */}
              <i className="bi bi-list fs-4"></i>
            </button>

            <a className="navbar-brand ms-2" href="#">Dashboard App</a>

            <div className="ms-auto">
              <ul className="navbar-nav flex-row">
                <li className="nav-item me-3">
                  <a className="nav-link" href="#">Reports</a>
                </li>
                <li className="nav-item me-3">
                  <a className="nav-link" href="#">Analytics</a>
                </li>
                <li className="nav-item dropdown">
                  <Dropdown as="li" className="nav-item">
                    <Dropdown.Toggle as="a" href="#" className="d-flex align-items-center text-dark text-decoration-none">
                      <img
                        src="https://github.com/mdo.png"
                        alt="profile"
                        width="32"
                        height="32"
                        className="rounded-circle me-2"
                      />
                      <strong>{user ? user.username || user.role : 'User'}</strong>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-end text-small shadow">
                      <Dropdown.Item href="#">View Profile</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </ul>
            </div>
          </div>
        </header>
    );
};

export default Header;