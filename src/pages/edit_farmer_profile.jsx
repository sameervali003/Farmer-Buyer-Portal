import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../usercontent';

function EditFarmerProfile() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    farmType: '',
    farmSize: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the existing profile data
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProfileData(response.data);
      } catch (error) {
        console.error('Failed to fetch profile data', error);
      }
    };

    if (user) {
      fetchProfileData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/update-profile', profileData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/profile'); // Redirect after successful update
    } catch (error) {
      console.error('Failed to update profile', error);
    }
  };

  return (
    <div className="edit-farmer-profile-container">
      <div className="overlay">
        <div className="inner-container">
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
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
                value={profileData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                name="address"
                value={profileData.address}
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
                value={profileData.farmType}
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
                value={profileData.farmSize}
                onChange={handleChange}
                placeholder="Enter farm size in acres"
                required
              />
            </div>

            <button type="submit" className="submit-button">Save Changes</button>
          </form>
        </div>
      </div>

      {/* Inline CSS with Transparent Background */}
      <style jsx="true">{`
        .edit-farmer-profile-container {
          position: relative;
          width: 100%;
          height: 100vh;
          background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20190223/ourmid/pngtree-farmer-harvest-festival-wheat-field-hand-drawn-fresh-background-backgroundfresh-backgroundhand-image_72066.jpg'); /* Replace with your image URL */
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5); /* Adjust opacity here */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .inner-container {
          max-width: 600px;
          width: 100%;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.6); /* Semi-transparent white background */
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .inner-container h1 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
          text-align: center;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          font-size: 16px;
          margin-bottom: 5px;
          color: #333;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
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
}

export default EditFarmerProfile;