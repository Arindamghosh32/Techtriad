import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../Styles/Home.css';

export default function Registrationform() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        role: '',
        contact: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [step, setStep] = useState(1);

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setMessage(response.data.message);
        } catch (err) {
            console.error('Error:', err);
            setMessage(err.response?.data || 'An error occurred');
        }
    };

    return (
        <>
            <div className="registration-input">
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <>
                            <div className="input-title">Enter your name</div>
                            <div className="registration-input1">
                                <div className="registration-input1-content">
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="input-title">Enter your email</div>
                            <div className="registration-input1">
                                <div className="registration-input1-content">
                                    <input type="text" name="email" value={formData.email} onChange={handleChange} />
                                </div>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className="input-title">Enter your Organization</div>
                            <div className="registration-input1">
                                <div className="registration-input1-content">
                                    <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="input-title">Enter your role</div>
                            <div className="registration-role">
                                <div className="registration-role-content">
                                    <select 
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select your role</option>
                                        <option value="buyer">Buyer</option>
                                        <option value="vendor">Vendor</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <div className="input-title">Enter your mobile number</div>
                            <div className="registration-input1">
                                <div className="registration-input1-content">+91
                                    <input type="number" name="contact" value={formData.contact} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="input-title">Enter your password</div>
                            <div className="registration-password">
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    placeholder="Enter your password" 
                                    required 
                                />
                            </div>
                        </>
                    )}

                    <div className="registration-button-group">
                        {step > 1 && (
                            <button type="button" className="registration-prev-btn" onClick={prevStep}>
                                Previous
                            </button>
                        )}
                        {step < 3 ? (
                            <button type="button" className="registration-next-btn" onClick={nextStep}>
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="registration-submit-btn">
                                Register
                            </button>
                        )}
                    </div>
                </form>

                <div className="question">
                    <div className="question1">You have an account?</div>
                    <div className="question2" onClick={() => navigate('/home')}>Sign In</div>
                </div>

                <div className="or">or</div>

                <div className="google-all">
                    <div className="google">
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                            <path d="M25.8666 14.1115C25.8666 13.2619 25.7993 12.4076 25.6557 11.5718H14.1333V16.3849H20.7316C20.4578 17.9372 19.578 19.3104 18.2898 20.183V23.3061H22.2263C24.538 21.1291 25.8666 17.9143 25.8666 14.1115Z" fill="#4285F4" />
                            <path d="M14.1825 25.9138C17.3451 25.9138 20.0122 24.914 21.9555 23.1882L18.1767 20.3673C17.1254 21.0559 15.7681 21.4459 14.1868 21.4459C11.1276 21.4459 8.53372 19.4587 7.60303 16.7871H3.70361V19.6952C5.69425 23.5077 9.74879 25.9138 14.1825 25.9138Z" fill="#34A853" />
                            <path d="M7.61472 16.4031C7.11661 14.9606 7.11661 13.3986 7.61472 11.9561V8.96436H3.66483C1.97826 12.2463 1.97826 16.1129 3.66483 19.3948L7.61472 16.4031Z" fill="#FBBC04" />
                            <path d="M14.1406 6.91159C15.8057 6.88671 17.415 7.49206 18.6209 8.60326L21.9555 5.38162C19.844 3.46605 17.0417 2.4129 14.1406 2.44607C9.72462 2.44607 5.6863 4.8509 3.70361 8.66545L7.58315 11.572C8.50583 8.89764 11.0936 6.91159 14.1406 6.91159Z" fill="#EA4335" />
                        </svg>
                    </div>
                    <div className="input-title">Continue with Google</div>
                </div>

                <div className="google-all">
                    <div className="google">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <g clipPath="url(#clip0_157_1355)">
                                <path d="M16.4424 0.61377C16.497 0.61377 16.5516 0.61377 16.6093 0.61377C16.7433 2.26892 16.1116 3.50565 15.3438 4.40125C14.5904 5.29066 13.5587 6.15328 11.8902 6.02239C11.7789 4.39094 12.4117 3.24594 13.1785 2.3524C13.8896 1.51967 15.1933 0.778667 16.4424 0.61377Z" fill="black" />
                                <path d="M21.4936 17.8415C21.4936 17.858 21.4936 17.8724 21.4936 17.8879C21.0247 19.308 20.3558 20.5252 19.5396 21.6547C18.7945 22.6802 17.8813 24.0602 16.2509 24.0602C14.8421 24.0602 13.9063 23.1543 12.4624 23.1295C10.9351 23.1048 10.0951 23.887 8.69864 24.0839C8.53889 24.0839 8.37915 24.0839 8.2225 24.0839C7.19704 23.9355 6.36946 23.1233 5.76656 22.3916C3.98876 20.2294 2.61497 17.4365 2.35938 13.8623C2.35938 13.5119 2.35938 13.1625 2.35938 12.8121C2.46759 10.2542 3.7105 8.17439 5.36256 7.16646C6.23446 6.63054 7.43305 6.17399 8.76768 6.37805C9.33967 6.46668 9.92403 6.66249 10.4362 6.85625C10.9217 7.04279 11.5287 7.37361 12.1038 7.35609C12.4933 7.34476 12.8808 7.14173 13.2735 6.99847C14.4237 6.58314 15.5511 6.107 17.0373 6.33064C18.8233 6.60066 20.091 7.39422 20.8742 8.61858C19.3633 9.58014 18.1689 11.0292 18.3729 13.5037C18.5543 15.7514 19.8611 17.0665 21.4936 17.8415Z" fill="black" />
                            </g>
                            <defs>
                                <clipPath id="clip0_157_1355">
                                    <rect width="23.47" height="23.47" fill="white" transform="translate(0.190918 0.61377)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>
                    <div className="input-title">Continue with Apple</div>
                </div>

                <div className="or">or</div>

                <div className="guest">Continue as a Guest</div>
            </div>
        </>
    );
}
