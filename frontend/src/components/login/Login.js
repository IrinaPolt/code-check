import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import SignInForm from '../forms/SignInForm';
import './login.css';

const Login = () => {
  return (
    <div className="container">
      <div className="description">
        <p> A coder-friendly web application with frontend and backend components </p>
        <p> Here you can store your code files and receive their brief pep8 checkup</p>
      </div>
      <div className="forms">
        <RegisterForm />
        <SignInForm />
      </div>
    </div>
  );
};

export default Login;