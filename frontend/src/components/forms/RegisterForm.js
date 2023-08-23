import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Forms.css';

const RegisterForm = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${backendUrl}/api/users/`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          axios.post(`${backendUrl}/api/auth/token/login/`, formData, {
              headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => {
            const accessToken = 'Token ' + response.data['auth_token']
            Cookies.set('Authorization', accessToken, {expires: 7});
            navigate('/dashboard/');
          })
          .catch((error) => {
            toast.error('An error occurred', { position: toast.POSITION.TOP_CENTER });
          });
        }
      })
      .catch((error) => {
        toast.error('An error occurred', { position: toast.POSITION.TOP_CENTER });
      });
  };
  

  return (
    <div className="form">
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;