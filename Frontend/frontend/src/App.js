import React from "react";
import { Route, Routes } from 'react-router-dom'; // No need to import BrowserRouter here
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard'
import Register from './Pages/Register';
import Buyerdash from "./Pages/Buyerdash";
import Vendordash from "./Pages/Vendordash";
import Chatbox from "./Pages/Chatbox";

function App() {
  return (
    <Routes>
      
      <Route path='/' element={<Dashboard />}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/vendor-dashboard' element={<Vendordash/>}/>
      <Route path='/buyer-dashboard' element={<Buyerdash/>}/>
      <Route path='/Chatbox' element={<Chatbox/>}/>
      
    </Routes>
  );
}

export default App; 
