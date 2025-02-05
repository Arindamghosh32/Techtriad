import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { ChatEncryption } from '../utils/encryption';
import './../Styles/Chat.css';

export default function Chatbox() {
    const navigate = useNavigate();
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const encryptionRef = useRef(new ChatEncryption());

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                const userData = JSON.parse(localStorage.getItem('user'));
                
                if (!token || !userData) {
                    navigate('/home');
                    return;
                }

                setCurrentUser(userData);

                // Share public key with server
                const publicKeyPem = encryptionRef.current.getPublicKeyPem();
                try {
                    await axios.post('http://localhost:5000/api/users/update-public-key', 
                        { publicKey: publicKeyPem },
                        {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            withCredentials: true
                        }
                    );
                    console.log('Public key shared successfully');
                } catch (error) {
                    console.error('Error sharing public key:', error);
                }

                // Initialize Socket.IO connection with token in auth
                const newSocket = io('http://localhost:5000', {
                    auth: {
                        token: `Bearer ${token}`
                    }
                });

                // Socket connection event handlers
                newSocket.on('connect', () => {
                    console.log('Connected to socket server');
                });

                newSocket.on('connect_error', (error) => {
                    console.error('Socket connection error:', error);
                });

                // Handle incoming messages
                newSocket.on('receive-message', async (data) => {
                    try {
                        const decryptedMessage = encryptionRef.current.decryptMessage(data.encryptedData);
                        if (decryptedMessage) {
                            setMessages(prev => [...prev, {
                                senderId: data.senderId,
                                message: decryptedMessage,
                                timestamp: data.timestamp
                            }]);
                        }
                    } catch (error) {
                        console.error('Error decrypting message:', error);
                    }
                });

                setSocket(newSocket);

                // Fetch users based on role
                const fetchUsers = async () => {
                    try {
                        console.log('Current user role:', userData.role);
                        const response = await axios.get('http://localhost:5000/api/users', {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            },
                            withCredentials: true
                        });

                        console.log('All users from server:', response.data);

                        // Filter users based on role
                        const filteredUsersData = response.data.filter(user => {
                            // Skip the current user
                            if (user._id === userData._id) return false;
                            
                            // Vendors see buyers, buyers see vendors
                            if (userData.role === 'vendor') {
                                return user.role === 'buyer';
                            } else {
                                return user.role === 'vendor';
                            }
                        });

                        console.log('Filtered users:', filteredUsersData);

                        const usersWithKeys = filteredUsersData.map(user => ({
                            _id: user._id,
                            name: user.name || user.email.split('@')[0],
                            email: user.email,
                            role: user.role,
                            publicKey: user.publicKey || null
                        }));

                        console.log('Final users list:', usersWithKeys);
                        setUsers(usersWithKeys);
                        setFilteredUsers(usersWithKeys);
                    } catch (error) {
                        console.error('Error fetching users:', error.response?.data || error);
                        if (error.response?.status === 401) {
                            navigate('/home');
                        }
                    }
                };

                fetchUsers();
                const refreshInterval = setInterval(fetchUsers, 30000);

                return () => {
                    clearInterval(refreshInterval);
                    if (newSocket) {
                        newSocket.disconnect();
                    }
                };
            } catch (error) {
                console.error('Error during authentication:', error);
                navigate('/home');
            }
        };

        checkAuth();
    }, [navigate]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = users.filter(user => 
            user.name?.toLowerCase().includes(term) || 
            user.email?.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    };

    const handleUserSelection = (userId) => {
        setSelectedUserId(userId);
        setMessages([]); // Clear messages when selecting new user
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || !socket || !selectedUserId) return;

        try {
            const recipient = users.find(u => u._id === selectedUserId);
            if (!recipient) {
                console.error("Recipient not found");
                return;
            }

            if (!recipient.publicKey) {
                alert("Cannot send message: Recipient's public key is not available");
                return;
            }

            const encryptedData = encryptionRef.current.encryptMessage(message, recipient.publicKey);
            if (!encryptedData) {
                console.error("Message encryption failed");
                return;
            }

            socket.emit('send-message', {
                recipientId: selectedUserId,
                encryptedData,
                timestamp: new Date()
            });

            setMessages(prev => [...prev, {
                senderId: currentUser._id,
                message: message,
                timestamp: new Date()
            }]);

            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-sidebar">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder={`Search ${currentUser?.role === 'vendor' ? 'buyers' : 'vendors'}...`}
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-input"
                    />
                    <div className="current-user-info">
                        Logged in as: {currentUser?.name} ({currentUser?.role})
                    </div>
                </div>
                <div className="users-list">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <div
                                key={user._id}
                                className={`user-item ${selectedUserId === user._id ? 'selected' : ''}`}
                                onClick={() => handleUserSelection(user._id)}
                            >
                                <div className="user-info">
                                    <span className="user-name">{user.name}</span>
                                    <span className="user-email">{user.email}</span>
                                    <span className="user-role">{user.role}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-users-message">
                            No {currentUser?.role === 'vendor' ? 'buyers' : 'vendors'} available.
                            <br />
                            <small>Make sure users are registered and roles are set correctly.</small>
                        </div>
                    )}
                </div>
            </div>
            <div className="chat-main">
                {selectedUserId ? (
                    <>
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.senderId === currentUser._id ? 'sent' : 'received'}`}
                                >
                                    <div className="message-content">{msg.message}</div>
                                    <div className="message-timestamp">
                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
                            />
                            <button onClick={sendMessage}>Send</button>
                        </div>
                    </>
                ) : (
                    <div className="no-chat-selected">
                        Select a {currentUser?.role === 'vendor' ? 'buyer' : 'vendor'} to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
