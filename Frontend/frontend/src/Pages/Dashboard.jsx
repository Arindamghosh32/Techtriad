import React from 'react'
import './../Styles/Dashboard.css'
import des from './../image/des.png'
import des1 from './../image/des1.png'
import Group from './../image/Group.png'
import feature1 from './../image/feature1.png'
import vendormanage from './../image/vendormanage.png'
import aisearch from './../image/aisearch.png'
import security from './../image/security.png'
import analytics from './../image/analytics.png'
import Oil from './../image/video/Oil.png'
import Oilvideo from './../image/Oilvideo.gif'
import {useNavigate} from 'react-router-dom';
import Company from './../image/Company.png';
export default function Dashboard() {
   const loginav = useNavigate();
   const reginav = useNavigate();
   const handleloginav = () =>{
      loginav('/home');
   }
   const handlereginav = () =>{
    reginav('/register');
   }
  return (
    <>
    


       <div className="navr">
           <img src={Company} alt="" />
           <div className="navigation">
             <div className="page">Home</div>
             <div className="page">Find Vendors</div>
             <div className="page">Features</div>
             <div className="page">Contact</div>
           </div>
           <div className="auth-button">
            <div className="login" onClick={handleloginav}>Log in</div>
            <div className="register" onClick={handlereginav}>Register</div>
           </div>
       </div>

       <div className="circle"></div>
       <div className="circle1"></div>

      <div className="header-capital-box">
      <div className="header-capital">
        Marketing Made Easy
       </div>
       <div className="header-capital">
        Revenue Made Real
       </div>
      </div>
       

       <div className="video">
        <img src={Oilvideo} alt="" style={{
          
          objectFit: 'contain', // Ensures it fits within the border properly
          transform: 'scale(1.2) translateX(-10px)', // Zooms in and moves left
          transition: 'transform 100s ease-in-out' // Adds smooth animation for better UX
        }}/>
       </div>

       <div className="cards">
        <div className="why">Why Choose Us</div>
        <div className="why1">Work smart with Workwise</div>
        
          <div className="card1">
            <div className="card1-content">
              <img src={des} alt="" />
              <div className="card1-content-title">Vendor Database</div>
              <div className="card1-content-para">Database of 10,000+ High-Quality Vendors. Access a vast network of top-tier vendors</div>
            </div>
          <div className="card1-content">
              <img src={des1} alt="" />
              <div className="card1-content-title">Compliant Datasheets</div>
              <div className="card1-content-para">Drawings of 1,000+ Products. 
              Ensure precision with industry-standard documentation</div>
            </div>
            <div className="card1-content">
              <div className="group-image"><img src={Group} alt="" /></div>
              
              <div className="card1-content-title">Ai-Driven Automated</div>
              <div className="card1-content-para">Quote Comparison Chart.
              Simplify decision-making with our advanced comparison tools</div>
            </div>
        </div>
       </div>

       <div className="contact-us">
        <div className="contact-us-title">Contact Us</div>
       </div>

       <div className="feature-title">Features</div>
       <div className="feature-title1">Workwise is built to redefine how you manage procurement</div>

       <div className="feature-content">
        <div className="feature-write">
          <div className="feature-write-title">Intuitive RFQ Creation</div>
          <div className="feature-write-para">Create detailed RFQs in minutes. Use predefined templates or customize your own to match your business needs.</div>
          <div className="feature-write-button">
            <div className="feature-write-button-title">Learn more</div>
          </div>
        </div>
        <img src={feature1} alt="" />
       </div>




         <div className="svg1">
         <svg xmlns="http://www.w3.org/2000/svg" width="640" height="309" viewBox="0 0 640 309" fill="none">
  <path d="M2 1.5C34.6667 61 109.5 187 288.5 204.5C453.375 220.619 560 214.5 638 307.5" stroke="#BABABA" stroke-width="4" stroke-dasharray="17 17"/>
</svg>


         </div>
       


         <div className="feature-content">
         <img src={vendormanage} alt="" />
        <div className="feature-write">
          <div className="feature-write-title">Vendor Management</div>
          <div className="feature-write-para">Maintain a centralized directory of trusted vendors, track their performance, and manage communications effortlessly</div>
          <div className="feature-write-button">
            <div className="feature-write-button-title">Learn more</div>
          </div>
        </div>
        
       </div>



       <div className="svg2">
       <svg xmlns="http://www.w3.org/2000/svg" width="616" height="260" viewBox="0 0 616 260" fill="none">
  <path d="M614 1C581.333 60.5 530.5 138 351.5 155.5C186.625 171.619 80 165.5 2 258.5" stroke="#BABABA" stroke-width="4" stroke-dasharray="17 17"/>
</svg>
  </div>

  



       <div className="feature-content">
        <div className="feature-write">
          <div className="feature-write-title">AI-Powered Search</div>
          <div className="feature-write-para">Find the right vendor, product, or RFQ details instantly with our Magic Search feature powered by advanced AI.</div>
          <div className="feature-write-button">
            <div className="feature-write-button-title">Learn more</div>
          </div>
        </div>
        <img src={aisearch} alt="" />
       </div>
       

       <div className="svg3">
       <svg xmlns="http://www.w3.org/2000/svg" width="606" height="238" viewBox="0 0 606 238" fill="none">
  <path d="M2 1.5C34.6667 61 75.5 116 254.5 133.5C419.375 149.619 526 143.5 604 236.5" stroke="#BABABA" stroke-width="4" stroke-dasharray="17 17"/>
</svg>

       </div>



       <div className="feature-content">
         <img src={security} alt="" />
        <div className="feature-write">
          <div className="feature-write-title">End-to-End Security</div>
          <div className="feature-write-para">Keep your data safe with enterprise-grade encryption and compliance with global data security standards.</div>
          <div className="feature-write-button">
            <div className="feature-write-button-title">Learn more</div>
          </div>
        </div>
        
       </div>


<div className="foot-bar">
  <div className="foot-bar-title">Comprehensive Analytics</div>
  <div className="foot-bar-para">Access real-time dashboards and reports to monitor procurement
  efficiency and uncover savings opportunities.</div>
  <img src={analytics} alt="" />
  



 






<div className="svg-container">
<svg xmlns="http://www.w3.org/2000/svg"  width="1310" height="738" viewBox="0 0 1440 738" fill="none">
  <path d="M0 11.4707L103.6 47.0938C152.867 64.0343 206.596 62.5976 254.887 43.0486L278.949 33.308C330.934 12.2636 389.066 12.2635 441.051 33.308L451.674 37.6084C507.649 60.268 570.791 56.9332 624.068 28.5036L630.766 24.9292C686.534 -4.82954 753.882 -4.60779 809.649 25.151C865.739 55.0817 933.582 54.826 989.241 24.1012C1045.73 -7.08174 1114.27 -7.08175 1170.76 24.1012L1179.77 29.0744C1230.85 57.274 1291.48 62.5381 1346.66 43.5644L1440 11.4707V738H0V11.4707Z" fill="url(#paint0_linear_29_7066)"/>
  <defs>
    <linearGradient id="paint0_linear_29_7066" x1="720" y1="-26" x2="720" y2="738" gradientUnits="userSpaceOnUse">
      <stop offset="0.346638" stop-color="#FFF8F5"/>
      <stop offset="1" stop-color="#FFF8F5" stop-opacity="0"/>
    </linearGradient>
  </defs>
</svg>
</div>

<div className="analytics-button">
  <div className="analytics-button-title">Find Vendors</div>
</div>


</div>






       


    </>
  )
}
