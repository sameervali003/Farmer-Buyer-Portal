import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterBuyer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    preferredProducts: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register-buyer', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate("/login"); // Redirect after successful registration
      } else {p670p
        console.error('Registration failed');
        // Handle registration error here
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network error here
    }
  };

  const navigate = useNavigate();

  return (
    <div className="register-buyer-container">
      <h2>Buyer Registration</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="preferredProducts">Preferred Products</label>
          <input
            type="text"
            name="preferredProducts"
            value={formData.preferredProducts}
            onChange={handleChange}
            placeholder="Paddy , Cotton ,........."
            required
          />
        </div>

        <button type="submit" className="submit-button">Register</button>
      </form>

      <style jsx="true">{`
        .register-buyer-container {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.6); /* Semi-transparent white background */
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(5px);
        }

        body {
          background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-farmer-harvest-festival-wheat-field-hand-drawn-fresh-background-backgroundfresh-backgroundhand-image_72066.jpg'); /* Replace with your image URL */
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
        }

        .register-buyer-container h2 {
          text-align: center;
          color: #2d3748;
          margin-bottom: 20px;
          font-size: 24px;
        }

        .register-form {
          display: flex;
          flex-direction: column;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          font-size: 16px;
          margin-bottom: 5px;
          color: #4a5568;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #cbd5e0;
          font-size: 16px;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .submit-button {
          background-color: #38a169;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
          transition: background-color 0.3s;
        }

        .submit-button:hover {
          background-color: #2f855a;
        }
      `}</style>
    </div>
  );
};

export default RegisterBuyer;
