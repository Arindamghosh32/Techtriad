require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Added jwt module
const Authrouter = require('./Routes/Authrouter');
const userRouter = require('./Routes/userRouter');
require('./config/mongoose-connection');

const app = express();
const server = http.createServer(app);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Session setup
app.use(expressSession({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/auth', Authrouter);
app.use('/api/users', userRouter);

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
    });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Socket.IO middleware for JWT authentication
io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        if (!token || !token.startsWith('Bearer ')) {
            throw new Error('Authentication error');
        }
        const jwtToken = token.split(' ')[1];
        const decoded = jwt.verify(jwtToken, process.env.JWT_KEY);
        socket.userId = decoded.id; // Store userId in socket
        next();
    } catch (error) {
        next(new Error('Authentication error'));
    }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Store user's public key when shared
    socket.on('share-public-key', async ({ publicKey, userId }) => {
        try {
            const User = require('./Models/user');
            await User.findByIdAndUpdate(userId, { publicKey }, { new: true });
            console.log('Public key stored for user:', userId);
        } catch (error) {
            console.error('Error updating public key:', error);
        }
    });

    socket.on('send-message', async (data) => {
        try {
            const { recipientId, encryptedData, timestamp } = data;
            const senderId = socket.userId;
            
            // Find recipient's socket and send the message
            const recipientSocket = Array.from(io.sockets.sockets.values())
                .find(s => s.userId === recipientId);
            
            if (recipientSocket) {
                recipientSocket.emit('receive-message', {
                    senderId,
                    encryptedData,
                    timestamp
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});
