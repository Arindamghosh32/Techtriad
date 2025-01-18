import React from 'react'
import './../Styles/Buyer.css';
import  workwiselogo  from './../image/workwiselogo.png'
export default function Buyerdash() {
  return (
    <>
     <aside class="sidebar">
    <div class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span><img src={workwiselogo} alt="" /></span>
    </div>
    <nav class="sidebar-nav">
        <a href="#" class="nav-item active">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Overview
        </a>
        <a href="#" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            Your Orders
        </a>
        <a href="#" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            Vendor
        </a>
        <a href="#" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            Customers
        </a>
        <a href="#" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
            Invoices
        </a>
        <a href="#" class="nav-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            Chat with Vendor
        </a>
    </nav>
</aside>


<div class="content">
     
    <header class="header">
        <nav class="nav">
            <a href="#" class="nav-link active">Home</a>
            <a href="#" class="nav-link">Overview</a>
        </nav>
        <div class="notifications">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
        </div>
    </header>

    <main class="main">
        
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span>Views</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                </div>
                <div class="stat-value">7,265</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span>Visits</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                </div>
                <div class="stat-value">3,671</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span>New Users</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div class="stat-value">256</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span>Active Users</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <div class="stat-value">2,318</div>
            </div>
        </div>

       
        <section class="vendor-section">
            <div class="vendor-header">
                <div>
                    <h2>Best Buyer</h2>
                    <span class="badge-active">Active Vendor</span>
                </div>
                <div class="vendor-actions">
                    <div class="search-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input type="text" placeholder="Search"/>
                    </div>
                    <button class="sort-button">
                        Newest
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                </div>
            </div>

            <table class="vendor-table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Company</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Rajesh Sharma</td>
                        <td>Global Tech Solutions Pvt. Ltd.</td>
                        <td>9876543220</td>
                        <td>rajesh@globotech.com</td>
                        <td>Gujarat</td>
                        <td><span class="badge-active">Active</span></td>
                    </tr>
                    <tr>
                        <td>Sneha Patel</td>
                        <td>Future Innovations</td>
                        <td>8798543221</td>
                        <td>sneha@future.com</td>
                        <td>Delhi</td>
                        <td><span class="badge-inactive">Inactive</span></td>
                    </tr>
                    <tr>
                        <td>Arjun Mehta</td>
                        <td>Zenith Industries</td>
                        <td>9765432109</td>
                        <td>priya@zenith.com</td>
                        <td>Kerala</td>
                        <td><span class="badge-inactive">Inactive</span></td>
                    </tr>
                </tbody>
            </table>
        </section>

        
        <div class="grid-2-cols">
            
            <section class="card">
                <div class="card-header">
                    <h3>Activities Buyer</h3>
                    <button class="icon-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                </div>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        </div>
                        <div class="activity-content">
                            <p>Changed the style</p>
                            <span class="activity-time">2 minutes ago</span>
                        </div>
                    </div>
                    <div class="activity-item">
                        <div class="activity-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </div>
                        <div class="activity-content">
                            <p>Released a new version</p>
                            <span class="activity-time">5 hours ago</span>
                        </div>
                    </div>
                </div>
            </section>

            
            <section class="card">
                <div class="card-header">
                    <h3>Location Traffic</h3>
                    <button class="icon-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                    </button>
                </div>
                <div class="location-stats">
                    <div class="location-item">
                        <span class="location-name">Rajasthan</span>
                        <div class="location-bar">
                            <div class="location-progress" style={{width: '52%'}}></div>
                        </div>
                        <span class="location-percentage">52%</span>
                    </div>
                    <div class="location-item">
                        <span class="location-name">Delhi</span>
                        <div class="location-bar">
                            <div class="location-progress" style={{width: '28%'}}></div>
                        </div>
                        <span class="location-percentage">28%</span>
                    </div>
                    <div class="location-item">
                        <span class="location-name">Gujarat</span>
                        <div class="location-bar">
                            <div class="location-progress" style={{width: '13%'}}></div>
                        </div>
                        <span class="location-percentage">13%</span>
                    </div>
                </div>
            </section>
        </div>

       
        <section class="card">
            <div class="card-header">
                <h3>Your Transactions</h3>
                <button class="icon-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                </button>
            </div>
            <div class="transactions-list">
                <div class="transaction-item">
                    <div class="transaction-info">
                        <span class="transaction-name">Netflix</span>
                        <span class="transaction-date">27 March 2020 at 12:30 PM</span>
                    </div>
                    <span class="transaction-amount negative">-2500</span>
                </div>
                <div class="transaction-item">
                    <div class="transaction-info">
                        <span class="transaction-name">Apple</span>
                        <span class="transaction-date">27 March 2020 at 12:30 PM</span>
                    </div>
                    <span class="transaction-amount positive">+2500</span>
                </div>
            </div>
        </section>

        
        
    </main>

    
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                <span>WorkWise</span>
            </div>
            <div class="footer-links">
                <div class="footer-section">
                    <h4>Explore</h4>
                    <a href="#">Home</a>
                    <a href="#">Features</a>
                    <a href="#">Find vendor</a>
                </div>
                <div class="footer-section">
                    <h4>Support & Resources</h4>
                    <a href="#">Help</a>
                    <a href="#">Contact Us</a>
                </div>
            </div>
            <div class="footer-social">
                <a href="#" class="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </a>
                <a href="#" class="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a href="#" class="social-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>© Copyright 2024 workwise | All rights reserved | Digital Partner: India Net Technologies</p>
        </div>
    </footer>
</div>
    </>
  )
}
