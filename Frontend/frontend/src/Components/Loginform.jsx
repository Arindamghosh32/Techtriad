import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../Styles/Home.css';

export default function Loginform() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (response.data.message === "User Logged in successfully") {
                navigate(formData.role === 'vendor' ? '/vendor-dashboard' : '/buyer-dashboard');
            }
            setMessage(response.data.message);
        } catch (err) {
            console.error('Error:', err);
            setMessage(err.response?.data || 'An error occurred');
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            const result = await axios.post('/auth/google', {
                token: response.credential,
            });
            if (result.data.success) {
                const role = result.data.userRole; // Assume backend sends the role.
                navigate(role === 'vendor' ? '/vendor-dashboard' : '/buyer-dashboard');
            } else {
                setMessage('Google Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred during Google Login');
        }
    };

    const initializeGoogleLogin = () => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: '1086789625522-fn4npbf8qr99ggilrgikol4f5sukno94.apps.googleusercontent.com',
                callback: handleGoogleSuccess,
            });
            window.google.accounts.id.renderButton(
                document.getElementById('google-signin'),
                { theme: 'outline', size: 'large' }
            );
        }
    };

    useEffect(() => {
        initializeGoogleLogin();
    }, []);

    const handleSignup = () => {
        navigate('/register');
    };

    return (
        <>
            <div className="input">
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="input-title">Enter your email</div>
                    <div className="input1">
                        <div className="input1-content">
                            <input 
                                type="email" 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="input-title">Enter your password</div>
                    <div className="password">
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="input-title">Enter your role</div>
                    <div className="registration-role">
                        <div className="registration-role-content">
                            <select 
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select your role</option>
                                <option value="buyer">Buyer</option>
                                <option value="vendor">Vendor</option>
                            </select>
                        </div>
                    </div>

                    

                    <button type="submit" className="Login">
                        Login
                    </button>
                </form>

                <div className="question">
                    <div className="question1">Don't have an account?</div>
                    <div className="question2" onClick={handleSignup}>Sign Up</div>
                </div>

                <div className="or">or</div>

                <div id="google-signin" className="google-signin"></div>
            </div>
        </>
    );
}
