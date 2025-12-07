import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user name from localStorage
    const user = localStorage.getItem('finscore_user');
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || 'User');
      } catch (e) {
        console.error('Error parsing user data');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('finscore_user');
    localStorage.removeItem('finscore_remember');
    navigate('/login');
  };

  const navItems = [
    { label: '📊 Dashboard', path: '/dashboard' },
    { label: '📋 Credit Report', path: '/credit-report' },
    { label: '📈 History', path: '/history' },
    { label: '🚀 Improve Score', path: '/improve-score' },
    { label: '👤 Profile', path: '/profile' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div 
          className="navbar-logo" 
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer' }}
        >
          <span className="navbar-logo-icon">💳</span>
          <span className="navbar-logo-text">FinScore</span>
        </div>
        <ul className="nav-menu">
          {navItems.map((item, index) => (
            <li key={index}>
              <button 
                className="nav-link-btn"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-actions">
          <div className="welcome-message">
            👋 Welcome back, <span className="user-name">{userName}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
