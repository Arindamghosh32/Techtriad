const express = require('express');
const http = require('http');//change
const { Server } = require('socket.io');//change
const app = express();
const expressSession = require("express-session");
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');//change
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const Authrouter = require('./Routes/Authrouter');
const { timeStamp } = require('console');
require('./config/mongoose-connection');

const server = http.createServer(app);//change
const io = new Server(server,{//change
    cors:{//change
        origin: 'http://localhost:3000',//change
        methods:['GET','POST'],//change
        credentials: true//change
    }//change
});//change

// Add debugging logs
console.log('Current working directory:', process.cwd());
const envPath = path.join(__dirname, '../.env');
console.log('Looking for .env at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

// Try reading the file contents directly
try {
    const envContents = fs.readFileSync(envPath, 'utf8');
    console.log('.env file contents:', envContents);
} catch (err) {
    console.error('Error reading .env file:', err);
}

require('dotenv').config({ path: envPath });

// Log all environment variables
console.log('All environment variables:', process.env);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Express session configuration
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,  // Ensure you have this in your environment variables
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Make sure this is false in dev, true in production if using https
}));

// CORS setup (including preflight requests)
app.use(cors({
    origin: 'http://localhost:3000',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Explicitly handle OPTIONS requests for preflight
app.options('*', cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

io.use((socket,next)=>{//change
const token = socket.handshake.auth.token || socket.handshake.headers.cookie?.split('token=')[1];





if(!token){//change
   return next(new Error('Authentication Error'));//change
}//change

try{//change
    const decoded = jwt.verify(token, process.env.JWT_KEY);//change
    socket.user = decoded;//change
    next();//change
}catch(err){//change
    next(new Error('Authentication error'));//change
}

});//change

io.on('connection',(socket) =>{//change
    console.log(`User Connected: ${socket.user.email}`);//change
    socket.on('share-public-key',({ publicKey })=>{//change
        socket.publicKey = publicKey;//change
        socket.broadcast.emit('user-joined',{//change
            userId: socket.user.id,//cange
            publicKey//change
        });//change
    });//change

    socket.on('send-message',(data)=>{//change
        io.to(data.recipientId).emit('receive-message',{//change
            senderId:socket.user.id,//change
            encryptedData: data.encryptedData,//change
            timeStamp: data.timeStamp//change

        });//change
    });//change
    socket.on('disconnect',()=>{//change
        io.emit('user-left',socket.user.id);//change
    });//change
});//change

// Routes setup
app.use("/", Authrouter);

// Start server
const PORT = 5000;
server.listen(PORT, () => {//change
    console.log(`The backend is running on port ${PORT}`);
});
