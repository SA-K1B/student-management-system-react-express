import React, { useState } from 'react';
import axiosInstance from '../axiosInstance'; // Import the Axios instance

const SignUp = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/api/auth/signup', { name, age, grade, password });
      console.log('User signed up:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="form-input" />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required className="form-input" />
      <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} required className="form-input" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
      <button type="submit" className="form-button">Sign Up</button>
    </form>
  );
};

export default SignUp;