import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const loginURL = 'https://api.realworld.io/api/users/login';
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: 'dasdasd@gmail.com',
    password: 'dsfafsdfsd',
  });

  const handleChange = e => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const postLoginDetails = async (loginURL, email, password) => {
    try {
      const res = await axios.post(loginURL, {
        user: {
          email,
          password,
        },
      });
      console.log('RES-DATA', res.data);
      if (res.status !== 200) return;

      localStorage.setItem('token', res.data.user.token);
      navigate('/');
    } catch (err) {
      console.log(err);
      setMessage('Invalid Credentials. Please try again.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    postLoginDetails(loginURL, userData.email, userData.password);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='wrapper'>
        <h3>Login</h3>
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={userData.email}
          onChange={handleChange}
        />
        {!userData.email && 'Enter an email'}

        <input
          type='password'
          name='password'
          placeholder='Enter your password'
          value={userData.password}
          onChange={handleChange}
        />
        {!userData.password && 'Enter password'}

        <button type='submit'>LOGIN</button>
        <span className='error'>{message}</span>
      </form>
    </div>
  );
};

export default Login;
