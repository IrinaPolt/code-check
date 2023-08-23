import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css';
import FileList from './FileList';

const Dashboard = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/users/me/`,
        {
          headers: {
            'Authorization': Cookies.get('Authorization'),
          }
        });
      setUser(response.data);     
      
    } catch (error) {
      console.error('Error fetching user:', error);
      if (error.response && error.response.status === 404) {
        toast.error('Not Found', { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error('An error occurred', { position: toast.POSITION.TOP_CENTER });
      }
      navigate('/');
    }
  };


  const handleLogoutButtonClick = () => {
    Cookies.remove('Authorization');
    navigate('/');
  };

  const handleProfileUpdateButtonClick = () => {
    navigate('/editprofile/');
  };


  return (
    <div>
      <div className="buttons-section">
        <button className="updateprofile-button" onClick={handleProfileUpdateButtonClick}>
          Update profile
        </button>
        <button className="logout-button" onClick={handleLogoutButtonClick}>
          Logout
        </button>
      </div>
      <div className="dashboard-container">
        <FileList />
      </div>
    </div>
  );
};

export default Dashboard;