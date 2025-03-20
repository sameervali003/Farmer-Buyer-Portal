import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterFarmer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    farmType: '',
    farmSize: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send formData to your backend to handle registration
    console.log('Farmer Registration Data:', formData);
  };
  const navigate = useNavigate();

  function loginBuyer() {
    navigate("/login");
  }
  return (
    <div className="register-farmer-container">
      <h2>Farmer Registration</h2>
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
          <label htmlFor="farmType">Farm Type</label>
          <input
            type="text"
            name="farmType"
            value={formData.farmType}
            onChange={handleChange}
            placeholder="Type of farm (e.g., dairy, vegetable)"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="farmSize">Farm Size (in acres)</label>
          <input
            type="number"
            name="farmSize"
            value={formData.farmSize}
            onChange={handleChange}
            placeholder="Enter farm size in acres"
            required
          />
        </div>

        <button type="submit" className="submit-button" onClick={loginBuyer()} >Register</button>
      </form>

      {/* Inline CSS with Transparent Background */}
      <style jsx="true">{`
        .register-farmer-container {
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

        .register-farmer-container h2 {
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

export default RegisterFarmer;
