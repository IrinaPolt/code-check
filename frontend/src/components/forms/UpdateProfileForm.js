import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Forms.css';


const UpdateProfileForm = ({ userData }) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      username: userData.username,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
    }));
  }, [userData]);


  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData)
      await axios.patch(
        `${backendUrl}/api/users/me/`,
        formData,
        {
          headers: {
            'Authorization': Cookies.get('Authorization'),
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      console.log('Profile updated successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('An error occurred', { position: toast.POSITION.TOP_CENTER });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit profile</h2>
      <div id="update">
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} />
        <label htmlFor="first_name">First Name:</label>
        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} />
        <label htmlFor="last_name">Last Name:</label>
        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} />
      </div>
      <br></br>
      <button>Update profile info</button>
    </form>
  );
};

export default UpdateProfileForm;