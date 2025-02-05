const express = require('express');
const userModel = require('./../models/user');
const bcrypt = require('bcrypt');
const {generatewebtoken} = require('./../utils/generateToken');
const router = express.Router();
const { isLoggedin } = require('../middleware/isLoggedin');
const session = require('express-session');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('1086789625522-fn4npbf8qr99ggilrgikol4f5sukno94.apps.googleusercontent.com');

router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

router.post('/register', async(req,res)=>{
    try{
        const {
            name,
            email,
            organization,
            role,
            contact,
            password
        } = req.body;

        // Check if user already exists (by email or contact)
        const existingUserByContact = await userModel.findOne({contact});
        const existingUserByEmail = await userModel.findOne({email});
        
        if(existingUserByContact || existingUserByEmail){
            return res.status(400).send("User already exists with this email or contact number");
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user with all fields
        const user = await userModel.create({
            name,
            email,
            organization,
            role,
            contact,
            password: hashedPassword
        });

        // Generate token and set cookie
        const token = generatewebtoken(user);
        
        // Set session
        req.session.userId = user._id;
        req.session.email = user.email;
        
        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Return success response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch(error){
        console.error('Registration error:', error);
        return res.status(500).json({
            message: "Error during registration",
            error: error.message
        });
    }
});

router.post('/login',async(req,res)=>{
    try{
        const { email, password, role } = req.body;
        
        const user = await userModel.findOne({ email });
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found, please register first"
            });
        }

        // Check if role matches
        if (role && user.role !== role) {
            return res.status(400).json({
                success: false,
                message: "Invalid role for this user"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate token and set cookie
        const token = generatewebtoken(user);
        
        // Set session
        req.session.userId = user._id;
        req.session.email = user.email;
        req.session.role = user.role;
        
        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        return res.status(200).json({
            success: true,
            message: "User Logged in successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        });

    } catch(error){
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: "Error during login",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Google authentication route
router.post('/google', async (req, res) => {
    try {
        const { token, role } = req.body;
        if (!token) {
            return res.status(400).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '1086789625522-fn4npbf8qr99ggilrgikol4f5sukno94.apps.googleusercontent.com'
        });
        
        const payload = ticket.getPayload();
        if (!payload.email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid Google account' 
            });
        }

        // Check if user exists
        let user = await userModel.findOne({ email: payload.email });
        
        if (user) {
            // If user exists, verify role
            if (role && user.role !== role) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid role for this user'
                });
            }
        } else {
            // Create new user with role
            user = await userModel.create({
                name: payload.name,
                email: payload.email,
                googleId: payload.sub,
                role: role || 'buyer' // Default to buyer if no role specified
            });
        }

        // Set session
        req.session.userId = user._id;
        req.session.email = user.email;
        req.session.role = user.role;

        // Generate and set JWT token
        const jwtToken = generatewebtoken(user);
        res.cookie('token', jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: 'Google login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token: jwtToken
        });
    } catch (error) {
        console.error('Google auth error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Authentication failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

router.get('/api/check-auth',isLoggedin,(req,res)=>{
    res.json({ isAuthenticated: true });
 }); 

 router.get('/api/users',isLoggedin,async(req,res)=>{
    try{
        const users = await userModel.find({role:req.user.role === 'vendor' ? 'buyer' : 'vendor' });
        res.json(users);
    }catch(error){
        res.status(500).json({ message: "Error fetching users"});
    }
 });

// Add endpoint to update user's public key
router.post('/update-public-key', isLoggedin, async (req, res) => {
    try {
        const { publicKey } = req.body;
        const userId = req.session.userId;

        if (!publicKey) {
            return res.status(400).json({ message: "Public key is required" });
        }

        const user = await userModel.findByIdAndUpdate(
            userId,
            { publicKey },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "Public key updated successfully",
            publicKey: user.publicKey
        });
    } catch (error) {
        console.error('Error updating public key:', error);
        return res.status(500).json({
            message: "Error updating public key",
            error: error.message
        });
    }
});

// Add endpoint to get user's public key
router.get('/users/:userId/public-key', isLoggedin, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId).select('publicKey');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            publicKey: user.publicKey
        });
    } catch (error) {
        console.error('Error fetching public key:', error);
        return res.status(500).json({
            message: "Error fetching public key",
            error: error.message
        });
    }
});

module.exports = router;
