import { useState, useEffect } from 'react';
import '../styles/Home.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import StatusMessage from '../components/StatusMessage';
import { useAuth } from '../context/AuthContext';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isLoggedIn } = useAuth();
  const { message, type } = location.state || {};
  const [status, setStatus] = useState({ message: message || '', type: type || '' });
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // Check if the user is authenticated
  //   const token = localStorage.getItem('authToken'); // replace with your actual auth token key
  //   setIsLoggedIn(!!token);
  // }, []);

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ message: '', type: '' }), 3000); // Clear after 3 seconds
      navigate(location.pathname, { replace: true });
      return () => clearTimeout(timer);
    }
  }, [status, navigate, location.pathname]);
  
  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      logout(); // Call logout from your AuthContext
      setStatus({ message: 'You have logged out successfully.', type: 'success' });
    }
  };

  return (
    <>
      <StatusMessage message={status.message} type={status.type} />
      <div className="home-container">
        <h1>Welcome to IA04 System - 21127143</h1>
        {isLoggedIn ? (
          <>
            <p>You are logged in as  <span className="username-highlight">{user}</span></p>
            <div className='page-container'>
              <Link to="/profile" className="button profile-button">View Profile</Link>
              <div onClick={handleLogout} className="button logout-button">Log Out</div>
            </div>
          </>
        ) : (
          <>
            <p>Already have an account? Log in below.</p>
            <Link to="/login" className="button login-button">Log In</Link>
            
            <p>Don&apos;t have an account? Register now.</p>
            <Link to="/register" className="button register-button">Register</Link>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
