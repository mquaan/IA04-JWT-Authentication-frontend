import LoginForm from '../components/LoginForm';
import { useEffect } from 'react';
import '../styles/Back.css';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      {/* <Link to="/" className="home-button">
        <FaHome className='icon'/>
        <p>Home</p>
      </Link> */}
      <LoginForm />
    </div>
  );
}

export default Login;
