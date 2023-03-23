import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../features/user/userSlice';

const Login = () => {
  const loginURL = 'https://api.realworld.io/api/users/login';
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(getUser(res.data));
      if (res.status !== 200) return;

      user && localStorage.setItem('token', user.user.token);
      user && navigate('/');
    } catch (err) {
      console.log(err);
      setMessage('Invalid Credentials. Please try again.');
    }
  };

  const handleSubmit = e => {
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
