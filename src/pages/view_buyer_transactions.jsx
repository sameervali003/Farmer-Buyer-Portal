import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCommentDots } from 'react-icons/fa';
import { useUser } from '../usercontent';
import { Link } from 'react-router-dom';

function RecentBuyerTransactions() {
  const { user } = useUser();
  const [farmers, setFarmers] = useState([]);
  const [filteredFarmers, setFilteredFarmers] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState(null); // Add state for selected farmer
  const [selectedAction, setSelectedAction] = useState(null);
  const [chatId, setChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [floatingChat, setFloatingChat] = useState(false);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/get-data', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const data = response.data.data;
        const farmersArray = Object.keys(data).map(key => data[key]);
        const filteredFarmersArray = farmersArray.filter(farmer => farmer.type === 'Farmer');
        setFarmers(filteredFarmersArray);
        setFilteredFarmers(filteredFarmersArray);
      } catch (error) {
        console.error('Failed to fetch farmers', error);
      }
    };

    fetchFarmers();
  }, []);

  const handleChatToggle = async (action, farmer) => {
    setSelectedAction(action);
    setSelectedFarmer(farmer); // Set the selected farmer
    setFloatingChat(!floatingChat);

    if (!chatId) {
      try {
        const { data } = await axios.post('http://localhost:5000/api/create-chat', {
          user1_id: user.email,
          user2_id: farmer.email // Use email or a unique identifier
        });
        setChatId(data.chat_id);

        const { data: messagesData } = await axios.get(`http://localhost:5000/api/get-messages/${data.chat_id}`);
        setMessages(messagesData.messages || []);
      } catch (error) {
        console.error('Failed to create or fetch chat', error);
      }
    } else {
      try {
        const { data: messagesData } = await axios.get(`http://localhost:5000/api/get-messages/${chatId}`);
        setMessages(messagesData.messages || []);
      } catch (error) {
        console.error('Failed to fetch messages', error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    try {
      await axios.post('http://localhost:5000/api/send-message', {
        chat_id: chatId,
        sender_id: user.email,
        message: messageInput
      });
      setMessages([...messages, { sender: user.id, message: messageInput }]);
      setMessageInput('');
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  const handleMessageInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.navbar}>
        <div style={styles.welcomeContainer}>
          <h1 style={styles.welcome}>Recent Transactions</h1>
        </div>
        <div style={styles.navLinksContainer}>
          <Link to="/buyer_dashboard" style={styles.navLink}>Back to Dashboard</Link>
        </div>
      </div>

      <div style={styles.recentTransactions}>
        <div style={styles.transactionsList}>
          {filteredFarmers.flatMap(farmer => 
            farmer.actions && typeof farmer.actions === 'object' 
              ? Object.keys(farmer.actions).map(actionKey => {
                const action = farmer.actions[actionKey];
                return (
                  <div key={actionKey} style={styles.transactionItem}>
                    <div><strong>Crop:</strong> {action.crop}</div>
                    <div><strong>Date:</strong> {action.date}</div>
                    <div><strong>Price:</strong> {action.price}</div>
                    <div><strong>Quantity:</strong> {action.quantity}</div>
                    <button
                      onClick={() => handleChatToggle(action, farmer)} // Pass farmer as well
                      style={styles.chatButton}
                    >
                      <FaCommentDots />
                    </button>
                  </div>
                );
              }) 
              : []
          )}
        </div>
      </div>

      {floatingChat && selectedAction && selectedFarmer && (
        <div style={styles.floatingChat}>
          <div style={styles.chatHeader}>
            <h3>Chat about Action</h3>
            <button onClick={() => setFloatingChat(false)} style={styles.closeChatButton}>X</button>
          </div>
          <div style={styles.chatContent}>
            <div style={styles.messagesContainer}>
              {messages.map((msg, index) => (
                <div key={index} style={msg.sender === user.id ? styles.userMessage : styles.farmerMessage}>
                  {msg.message}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={messageInput}
              onChange={handleMessageInputChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
              style={styles.messageInput}
            />
            <button onClick={handleSendMessage} style={styles.sendButton}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  dashboard: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    fontFamily: 'Arial, sans-serif',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#00796b',
    color: '#fff',
    padding: '10px',
  },
  welcomeContainer: {
    flex: 1,
  },
  welcome: {
    margin: 0,
  },
  navLinksContainer: {
    flex: 1,
    textAlign: 'right',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    padding: '10px 20px',
    backgroundColor: '#004d40',
    borderRadius: '5px',
  },
  recentTransactions: {
    display: 'flex',
    flexDirection: 'column',
  },
  transactionsList: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  transactionItem: {
    marginBottom: '15px',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  chatButton: {
    backgroundColor: '#00796b',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  floatingChat: {
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    width: '300px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  chatHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#004d40',
    color: '#fff',
  },
  closeChatButton: {
    backgroundColor: '#e53935',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
  },
  chatContent: {
    padding: '10px',
  },
  messagesContainer: {
    maxHeight: '200px',
    overflowY: 'scroll',
    marginBottom: '10px',
  },
  userMessage: {
    backgroundColor: '#c8e6c9',
    padding: '8px',
    borderRadius: '5px',
    marginBottom: '5px',
  },
  farmerMessage: {
    backgroundColor: '#f1f8e9',
    padding: '8px',
    borderRadius: '5px',
    marginBottom: '5px',
  },
  messageInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  sendButton: {
    backgroundColor: '#00796b',
    color: '#fff',
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    marginTop: '5px',
    width: '100%',
  },
};

export default RecentBuyerTransactions;
