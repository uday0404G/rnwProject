import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaUsers, FaBook, FaSignOutAlt, FaBars, FaUserCircle } from 'react-icons/fa';

const TeacherLayout = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };

  const sidebarStyle = {
    width: isSidebarCollapsed ? '60px' : '250px',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    backgroundColor: '#2c3e50',
    color: 'white',
    transition: 'all 0.3s ease',
    zIndex: 1000
  };

  const contentStyle = {
    marginLeft: isSidebarCollapsed ? '60px' : '250px',
    transition: 'all 0.3s ease',
    width: `calc(100% - ${isSidebarCollapsed ? '60px' : '250px'})`,
    padding: '20px'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    padding: '15px 20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#34495e'
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={sidebarStyle}>
        <div style={{ padding: '20px', borderBottom: '1px solid #34495e' }}>
          {!isSidebarCollapsed && 'Teacher Dashboard'}
        </div>
        <button 
          style={{
            position: 'absolute',
            top: '20px',
            right: '-40px',
            backgroundColor: '#2c3e50',
            border: 'none',
            color: 'white',
            padding: '8px',
            cursor: 'pointer',
            borderRadius: '0 5px 5px 0'
          }}
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          <FaBars />
        </button>
        <div style={{ marginTop: '20px' }}>
          <Link to="/teacher-dashboard" style={linkStyle}>
            <FaChalkboardTeacher />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </Link>
          <Link to="/teacher-dashboard/students" style={linkStyle}>
            <FaUsers />
            {!isSidebarCollapsed && <span>Students</span>}
          </Link>
          <Link to="/teacher-dashboard/courses" style={linkStyle}>
            <FaBook />
            {!isSidebarCollapsed && <span>Courses</span>}
          </Link>
          <Link to="/teacher-dashboard/profile" style={linkStyle}>
            <FaUserCircle />
            {!isSidebarCollapsed && <span>Profile</span>}
          </Link>
          <div 
            onClick={handleLogout} 
            style={{...linkStyle, cursor: 'pointer', marginTop: 'auto'}}
          >
            <FaSignOutAlt />
            {!isSidebarCollapsed && <span>Logout</span>}
          </div>
        </div>
      </div>

      <div style={contentStyle}>
        <Container fluid>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default TeacherLayout; 