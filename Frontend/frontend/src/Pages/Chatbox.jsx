import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { ChatEncryption } from '../utils/encryption';
import './../Styles/Home.css';

export default function Chatbox() {
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const encryptionRef = useRef(new ChatEncryption());

    // Fetch user and socket setup
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/check-auth', { withCredentials: true });
                if (!response.data.isAuthenticated) {
                    navigate('/login');
                    return;
                }

                const newSocket = io('http://localhost:5000', { withCredentials: true });

                newSocket.on('connect', () => {
                    const publicKey = encryptionRef.current.getPublicKey();
                    if (publicKey) {
                        newSocket.emit('share-public-key', { publicKey });
                    } else {
                        console.error('Public key is not available!');
                    }
                });

                newSocket.on('receive-message', (data) => {
                    const decryptedMessage = encryptionRef.current.decryptMessage(data.encryptedData);
                    if (decryptedMessage) {
                        setMessages(prev => [...prev, {
                            senderId: data.senderId,
                            message: decryptedMessage,
                            timestamp: data.timestamp
                        }]);
                    }
                });

                setSocket(newSocket);

                // Fetch users based on role
                const usersResponse = await axios.get('/api/users', { withCredentials: true });
                setUsers(usersResponse.data);
                setFilteredUsers(usersResponse.data);

                // Set current user ID (this should ideally come from the backend)
                setCurrentUserId(response.data.userId);
            } catch (error) {
                console.error('Error during authentication:', error);
                navigate('/home');
            }
        };

        checkAuth();

        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [navigate]);

    // Send encrypted message to selected user
    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() && socket) {
            const recipient = users.find(u => u._id === selectedUserId);
            
            // Check if recipient exists and if the public key is available
            if (!recipient) {
                console.error("Recipient not found for ID:", selectedUserId);
                return;
            }
    
            const recipientPublicKey = recipient.publicKey;
            
            if (!recipientPublicKey) {
                console.error("Recipient public key not found for ID:", selectedUserId);
                return;
            }
            
            const encryptedData = encryptionRef.current.encryptMessage(message, recipientPublicKey);
            
            socket.emit('send-message', {
                recipientId: selectedUserId,
                encryptedData,
                timestamp: new Date()
            });
    
            setMessage('');
        }
    };
    

    // Filter users based on search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = users.filter(user => user.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilteredUsers(filtered);
    };

    // Handle user selection from the list
    const handleUserSelection = (userId) => {
        setSelectedUserId(userId);
        console.log("Selected User ID:", userId); // Log for debugging
    };

    return (
        <div className="chat-container">
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={searchTerm} 
                    onChange={handleSearch} 
                />
            </div>

            {/* User List with Clickable Selection */}
            <div className="user-list">
                {filteredUsers.map(user => (
                    <div 
                        key={user._id} 
                        className="user-item" 
                        onClick={() => handleUserSelection(user._id)} 
                    >
                        {user.name}
                    </div>
                ))}
            </div>

            {/* Display Messages */}
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.senderId === currentUserId ? 'sent' : 'received'}`}>
                        <p>{msg.message}</p>
                        <span>{new Date(msg.timestamp).toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {/* Message Input Form */}
            <form onSubmit={sendMessage}>
                <input 
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}
