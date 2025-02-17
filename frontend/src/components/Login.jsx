import React, { useState } from 'react';
import axios from 'axios';
// import './Form.css';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { name, password });
      console.log('User logged in:', response.data);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Login</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
      <button type="submit" className="form-button">Login</button>
    </form>
  );
};

export default Login;