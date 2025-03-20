import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../usercontent';
import { FaBell, FaSearch, FaPhone } from 'react-icons/fa';

function BuyerDashboard() {
  const { user } = useUser();
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-data', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const data = response.data.data;
        const farmersArray = Object.keys(data).map(key => data[key]);
        const filteredFarmersArray = farmersArray.filter(farmer => farmer.type === 'Farmer');
        setFarmers(filteredFarmersArray);
        setFilteredFarmers(filteredFarmersArray);

        // Fetch notifications
        const notificationsResponse = await axios.get('http://localhost:5000/api/get-notifications', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setNotifications(notificationsResponse.data.notifications);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filter farmers based on search query
    const filtered = farmers.filter(farmer =>
      farmer.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFarmers(filtered);
  };

  const handleCropClick = (cropName) => {
    // Handle crop click (e.g., navigate to a detailed page or trigger an action)
    console.log(`Clicked on ${cropName}`);
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.navbar}>
        <div style={styles.welcomeContainer}>
          <h1 style={styles.welcome}>Hello, {user?.name}</h1>
        </div>
        <div style={styles.navLinksContainer}>
          <Link to="/edit_buyer_profile" style={styles.navLink}>Edit Profile</Link>
          <Link to="/view_buyer_trans" style={styles.navLink}>View Recent Transactions</Link>
          <button style={styles.notificationButton}>
            <FaBell />
            {notifications.length > 0 && <span style={styles.notificationCount}>{notifications.length}</span>}
          </button>
        </div>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Farmers..."
          value={searchQuery}
          onChange={handleSearch}
          style={styles.searchInput}
        />
        <FaSearch style={styles.searchIcon} />
      </div>

      <div style={styles.cropsSection}>
        <h2 style={styles.cropsHeading}>Crops</h2>
        <div style={styles.cropsContainer}>
          {/* Example crop images as clickable buttons */}
          <button onClick={() => handleCropClick('Paddy')} style={styles.cropButton}>
            <img src="https://static.vecteezy.com/system/resources/previews/010/413/589/large_2x/paddy-icon-illustration-template-design-vector.jpg" alt="Paddy" style={styles.cropImage} />
            <div style={styles.cropName}>Paddy</div>
          </button>
          <button onClick={() => handleCropClick('Cotton')} style={styles.cropButton}>
            <img src="https://cdn-icons-png.flaticon.com/512/3175/3175108.png" alt="Cotton" style={styles.cropImage} />
            <div style={styles.cropName}>Cotton</div>
          </button>
          <button onClick={() => handleCropClick('Groundnut')} style={styles.cropButton}>
            <img src="https://icon-library.com/images/2018/4878951_groundnuts-dried-peanut-png-download.png" alt="Groundnut" style={styles.cropImage} />
            <div style={styles.cropName}>Groundnut</div>
          </button>
          <button onClick={() => handleCropClick('Tea/Coffee')} style={styles.cropButton}>
            <img src="https://static.vecteezy.com/system/resources/previews/000/354/274/original/vector-tea-icon.jpg" alt="Tea/Coffee" style={styles.cropImage} />
            <div style={styles.cropName}>Tea/Coffee</div>
          </button>
          <button onClick={() => handleCropClick('Chilli')} style={styles.cropButton}>
            <img src="https://tse4.mm.bing.net/th?id=OIP.xlMocMWHIs4yQutmAbwNUAHaHa&pid=Api&P=0&h=180" alt="Chilli" style={styles.cropImage} />
            <div style={styles.cropName}>Chilli</div>
          </button>
        </div>
      </div>

      <div style={styles.farmerDirectory}>
        <h2 style={styles.directoryHeading}>Farmer Directory</h2>
        <div style={styles.farmerList}>
          {filteredFarmers.length > 0 ? (
            filteredFarmers.map(farmer => (
              <div key={farmer.email} style={styles.farmerItem}>
                <h3 style={styles.farmerName}>{farmer.name}</h3>
                <button style={styles.communicationButton}>
                  <FaPhone /> Contact
                </button>
              </div>
            ))
          ) : (
            <div style={styles.noResults}>No farmers found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  dashboard: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f0f0',
    color: '#000'
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#25D366',
    borderBottom: '1px solid #ddd'
  },
  welcomeContainer: {
    flex: 1
  },
  welcome: {
    color: '#fff'
  },
  navLinksContainer: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none'
  },
  notificationButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '20px',
    color: '#fff',
    position: 'relative'
  },
  notificationCount: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: 'red',
    color: '#fff',
    borderRadius: '50%',
    padding: '2px 5px',
    fontSize: '12px'
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px'
  },
  searchInput: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    flex: '1'
  },
  searchIcon: {
    marginLeft: '10px',
    fontSize: '18px',
    color: '#25D366'
  },
  cropsSection: {
    marginTop: '10px',
    marginBottom: '20px'
  },
  cropsHeading: {
    marginBottom: '10px',
    fontSize: '20px',
    color: '#000'
  },
  cropsContainer: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  cropButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  cropImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  cropName: {
    marginTop: '5px',
    fontSize: '14px',
    color: '#000'
  },
  farmerDirectory: {
    marginTop: '20px'
  },
  directoryHeading: {
    marginBottom: '10px',
    fontSize: '24px',
    color: '#000'
  },
  farmerList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  farmerItem: {
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  farmerName: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  communicationButton: {
    background: '#25D366',
    border: 'none',
    color: '#fff',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px'
  },
  noResults: {
    textAlign: 'center',
    color: '#666'
  }
};

export default BuyerDashboard;
