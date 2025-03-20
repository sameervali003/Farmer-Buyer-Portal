import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../usercontent';
import { FaPlus } from 'react-icons/fa';

const styles = {
    dashboard: {
      padding: '20px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundImage: 'url("https://www.example.com/your-background-image.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: '#333',
      minHeight: '100vh',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      borderBottom: '2px solid #444',
      borderRadius: '8px',
    },
    welcomeContainer: {
      flex: 1,
    },
    welcome: {
      color: '#00CED1',
      fontSize: '24px',
      fontWeight: 'bold',
    },
    navLinksContainer: {
      display: 'flex',
      gap: '25px',
    },
    navLink: {
      color: '#f0f0f0',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: '500',
      transition: 'color 0.3s ease',
    },
    navLinkHover: {
      color: '#00CED1',
    },
    detailsContainer: {
      marginTop: '30px',
      padding: '25px',
      backgroundColor: '#ffffffaa',
      borderRadius: '12px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      backdropFilter: 'blur(5px)',
    },
    actionItem: {
      marginBottom: '15px',
      padding: '10px',
      backgroundColor: '#f7f7f7',
      borderRadius: '8px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease-in-out',
    },
    actionItemHover: {
      transform: 'scale(1.02)',
    },
    addActionContainer: {
      marginTop: '30px',
      position: 'relative',
    },
    addIcon: {
      fontSize: '28px',
      cursor: 'pointer',
      color: '#4CAF50',
      transition: 'color 0.3s ease',
    },
    addIconHover: {
      color: '#388E3C',
    },
    addActionForm: {
      marginTop: '20px',
      padding: '25px',
      backgroundColor: '#f9f9f9',
      borderRadius: '12px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
      position: 'absolute',
      top: '40px',
      right: '0',
      zIndex: '10',
      width: '300px',
    },
    input: {
      display: 'block',
      width: '100%',
      padding: '12px',
      margin: '12px 0',
      border: '2px solid #ccc',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#4CAF50',
    },
    submitButton: {
      padding: '12px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
    },
    submitButtonHover: {
      backgroundColor: '#388E3C',
    },
    cancelButton: {
      padding: '12px 20px',
      backgroundColor: '#f44336',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      marginLeft: '10px',
      transition: 'background-color 0.3s ease',
    },
    cancelButtonHover: {
      backgroundColor: '#d32f2f',
    }
  };
  

function FarmerPortal() {
  const { user } = useUser();
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [isAddingAction, setIsAddingAction] = useState(false);
  const [newAction, setNewAction] = useState({
    crop: '',
    date: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/farmer/${user?.email}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setFarmerDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch farmer details', error);
      }
    };

    if (user) {
      fetchFarmerDetails();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAction(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAction = async () => {
    try {
      await axios.post(`http://localhost:5000/api/farmer/add-action/${user?.email}`, newAction, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Fetch updated farmer details after adding the new action
      const response = await axios.get(`http://localhost:5000/api/farmer/${user?.email}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFarmerDetails(response.data);
      setNewAction({ crop: '', date: '', price: '', quantity: '' });
      setIsAddingAction(false);
    } catch (error) {
      console.error('Failed to add action', error);
    }
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.navbar}>
        <div style={styles.welcomeContainer}>
          <h1 style={styles.welcome}>Welcome, {user?.name}</h1>
        </div>
        <div style={styles.navLinksContainer}>
          <Link to="/profile" style={styles.navLink}>Edit Profile</Link>
          <Link to="/transactions" style={styles.navLink}>View Transactions</Link>
          <Link to="/feedback" style={styles.navLink}>Logout</Link>
        </div>
      </div>

      <div style={styles.detailsContainer}>
        <h2>Details</h2>
        {farmerDetails ? (
          <div>
            <h3>Actions:</h3>
            {farmerDetails.actions && Object.keys(farmerDetails.actions).length > 0 ? (
              Object.keys(farmerDetails.actions).map(actionKey => {
                const action = farmerDetails.actions[actionKey];
                return (
                  <div key={actionKey} style={styles.actionItem}>
                    <p><strong>Crop:</strong> {action.crop}</p>
                    <p><strong>Date:</strong> {action.date}</p>
                    <p><strong>Price:</strong> {action.price}</p>
                    <p><strong>Quantity:</strong> {action.quantity}</p>
                    <hr />
                  </div>
                );
              })
            ) : (
              <p>No actions available</p>
            )}
          </div>
        ) : (
          <p>Loading farmer details...</p>
        )}

        <div style={styles.addActionContainer}>
          <FaPlus
            style={styles.addIcon}
            onClick={() => setIsAddingAction(true)}
          />
          {isAddingAction && (
            <div style={styles.addActionForm}>
              <h3>Add New Action</h3>
              <input
                type="text"
                name="crop"
                placeholder="Crop"
                value={newAction.crop}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="date"
                name="date"
                placeholder="Date"
                value={newAction.date}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={newAction.price}
                onChange={handleInputChange}
                style={styles.input}
              />
              <input
                type="text"
                name="quantity"
                placeholder="Quantity"
                value={newAction.quantity}
                onChange={handleInputChange}
                style={styles.input}
              />
              <button onClick={handleAddAction} style={styles.submitButton}>Submit</button>
              <button onClick={() => setIsAddingAction(false)} style={styles.cancelButton}>Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FarmerPortal;
