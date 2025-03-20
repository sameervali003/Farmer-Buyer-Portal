import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../usercontent';
import './login.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      alert('Request in progress, please wait');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log(response);
      if (response.data.success) {
        setUser(response.data.user); // Store user data in context
        if (response.data.user.type === "Buyer") {
          navigate('/buyer_dashboard');
        } else {
          navigate('/farmer_dashboard');
        }
      } else {
        alert('Login Failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="login-input"
          />
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging In...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
