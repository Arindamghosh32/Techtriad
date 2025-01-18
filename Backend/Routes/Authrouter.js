const express = require('express');
const userModel = require('./../Models/user');
const bcrypt = require('bcrypt');
const {generatewebtoken} = require('./../utils/generateToken');
const router = express.Router();
const { isLoggedin } = require('../middleware/isLoggedin');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
        res.cookie("token", token);

        // Return success response
        return res.status(201).send({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                organization: user.organization,
                role: user.role,
                contact: user.contact
            }
        });

    } catch(err) {
        console.error("Error:", err.message);
        return res.status(500).send("Internal Server Error");
    }
});

router.post('/login',async(req,res)=>{
    try{
        const{email,password} = req.body;
        
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).send("The user is available, register first");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            const token = generatewebtoken(user);
            res.cookie('token',token);
            return res.status(201).send({
                message:"User Logged in successfully"
            }); 
        }
        else{
            return res.status(400).send("Incorrect Password");
        }

    }catch(err){
        console.error("Error:",err.message)
    }
})

router.post('/auth/google', async (req, res) => {
    try {
        const { token } = req.body;
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const { name, email } = ticket.getPayload();
 
        // Check if user exists
        let user = await userModel.findOne({ email });
        if (!user) {
            // User doesn't exist, send a response to prompt registration
            return res.status(404).send({
                success: false,
                message: "User not found. Please register first."
            });
        }
 
        // Generate token
        const jwtToken = generatewebtoken(user);
        res.cookie("token", jwtToken);
 
        // Send response with userRole
        return res.status(200).send({
            message: "Google login successful",
            success: true,
            userRole: user.role // Sending `role` as `userRole` for frontend compatibility
        });
    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).send({
            success: false,
            message: "Internal Server Error"
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
 
module.exports = router;

