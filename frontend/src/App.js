import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import EditProfile from './components/dashboard/EditProfile';


function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard/" element={<Dashboard/>}/>
          <Route path="/editprofile/" element={<EditProfile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
