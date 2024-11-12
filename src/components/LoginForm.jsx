import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Form.css';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaUser, FaLock } from "react-icons/fa";
import StatusMessage from './StatusMessage';
import { useAuth } from '../context/AuthContext';

function LoginForm() {  
  const url = 'http://localhost:3000/login';
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const location = useLocation();
  const { message, type } = location.state || {};
  const [status, setStatus] = useState({ message: message || '', type: type || '' });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(url, data);
      login(response.data.access_token, response.data.username);
      navigate('/', { state: { message: response.data.message || 'Login successful!', type: 'success' } });
    } catch (error) {
      setStatus({ message: error.response?.data?.message || 'Login failed', type: 'error' });
    }
  };

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => setStatus({ message: '', type: '' }), 3000); // Clear after 3 seconds
      navigate(location.pathname, { replace: true });
      return () => clearTimeout(timer);
    }
  }, [status, navigate, location.pathname]);

  return (
    <>
      <StatusMessage message={status.message} type={status.type} />
      <div className="form-container">
        <h2>IA04 - Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="form">
          <div className='input-box'>
            <input type="text" placeholder='Email or username' {...register('identifier', { required: 'Email/usename is required' })} />
            <FaUser className='icon' />
            {errors.identifier && <p className="error-message">{errors.identifier.message}</p>}
          </div>

          <div className="input-box">
            <input type="password" placeholder='Password' {...register('password', { required: 'Password is required' })} />
            <FaLock className='icon' />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
          </div>
          
          <button type="submit" className="submit-button-login">Log In</button>
          <div className='register-link'>
            <p> Don&apos;t have an account?</p>
            <Link to="/register" className='link-login'>Register</Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginForm;
