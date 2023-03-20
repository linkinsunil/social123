import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: 'test@123.com',
    password: '12345',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  let login = false;

  const handleChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    formData.email === 'test@123.com' && formData.password === '12345'
      ? (login = true)
      : (login = false);
    login
      ? navigate('/')
      : setMessage('Invalid Credentials. Please try again.');
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className='wrapper'>
        <h3>Login</h3>
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Enter your password'
          value={formData.password}
          onChange={handleChange}
        />
        <button type='submit'>LOG IN</button>
        <span className='error'>{message}</span>
      </form>
    </div>
  );
};

export default Login;
