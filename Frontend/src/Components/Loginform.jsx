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
            const response = await axios.post('/auth/login', formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            
            if (response.data.success) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                // Store user info
                localStorage.setItem('user', JSON.stringify(response.data.user));
                // Navigate based on role from server response
                navigate(response.data.user.role === 'vendor' ? '/vendor-dashboard' : '/buyer-dashboard');
            }
            setMessage(response.data.message);
        } catch (err) {
            console.error('Error:', err);
            setMessage(err.response?.data?.message || 'An error occurred');
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {
            if (!response.credential) {
                setMessage('Failed to get credentials from Google');
                return;
            }

            const result = await axios.post('/auth/google', {
                token: response.credential,
                role: formData.role // Send selected role with Google login
            }, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (result.data.success) {
                // Store token in localStorage
                localStorage.setItem('token', result.data.token);
                // Store user info
                localStorage.setItem('user', JSON.stringify(result.data.user));
                // Navigate based on role from server response
                navigate(result.data.user.role === 'vendor' ? '/vendor-dashboard' : '/buyer-dashboard');
            } else {
                setMessage(result.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            setMessage(error.response?.data?.message || 'An error occurred during login');
        }
    };

    const initializeGoogleLogin = () => {
        if (window.google) {
            window.google.accounts.id.initialize({
                client_id: '1086789625522-fn4npbf8qr99ggilrgikol4f5sukno94.apps.googleusercontent.com',
                callback: handleGoogleSuccess,
                auto_select: false,
                cancel_on_tap_outside: true,
                ux_mode: 'popup'
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
