const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/student');

const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  const { name, age, grade, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // print password
    console.log('Password before saving:', password);
    console.log('Hashed password before saving:', hashedPassword);
    const newStudent = new Student({ name, age, grade, password: hashedPassword });
    // print the hashed password
    console.log('Hashed password:', hashedPassword);
    await newStudent.save();
    //retrieving the hashed password from the database using the name
    const student = await Student.findOne({ name });
    // also print the name
    console.log('Retrieved name:', student.name);
    console.log('Retrieved hashed password:', student.password);
    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Error signing up user' });
  }
});

// Log-in route
router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  console.log('User logging in:', name, password);
  try {
    const student = await Student.findOne({ name });
    if (!student) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    console.log('Password provided:', password);
    console.log('Password stored in DB:', student.password);

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    console.error('Error logging in user:', error); // Log the error details
    res.status(500).json({ error: 'Error logging in user' });
  }
});

module.exports = router;