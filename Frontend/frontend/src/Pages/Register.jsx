import React from "react";
import './../Styles/Home.css'
import Login from  './../image/Login.png'
import Registrationform  from "../Components/Registrationform";
export default function Register() {
    
    return (
        <>
            <div className="nav">
                <div className="nav1">Home</div>
                <div className="nav1">/</div>
                <div className="nav2">Register</div>
            </div>


            <div className="title">Register</div>

         <div className="Login-form-body">
              <img src={Login} alt="" />
              <Registrationform/>
         </div>
            
            
            

           
            






        </>
    )
}
