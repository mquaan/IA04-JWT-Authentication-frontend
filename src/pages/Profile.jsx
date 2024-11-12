import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const url = 'http://localhost:3000/profile';
  const { isLoggedIn } = useAuth();
  const [userData, setUserData] = useState(null);  // Use context user data if available
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (!userData) {
      // Fetch user data if not already available in context
      fetchUserData();
    }
  }, [isLoggedIn, navigate, userData]);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUserData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch profile data');
    }
  };

  if (error) return <p>{error}</p>;
  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <Link to="/" className="home-button">
        <FaHome className='icon'/>
        <p>Home</p>
      </Link>
      <div className="profile-container">
        <h1>Profile</h1>
        <div className='info'>
          <p><strong>Username:</strong> <span className="username-highlight">{userData.username}</span></p>
          <p><strong>Email:</strong> <span className="username-highlight">{userData.email}</span></p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
