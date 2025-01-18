import React from "react";
import './../Styles/Home.css'
import Login from  './../image/Login.png'
import Loginform from "../Components/Loginform";
export default function Home() {
    
    return (
        <>
            <div className="nav">
                <div className="nav1">Home</div>
                <div className="nav1">/</div>
                <div className="nav2">Login</div>
            </div>


            <div className="title">Login</div>

         <div className="Login-form-body">
              <img src={Login} alt="" />
              <Loginform/>
         </div>
            
            
            

           
            






        </>
    )
}
