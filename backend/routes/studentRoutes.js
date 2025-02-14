const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Create a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific student
router.get('/:id', getStudent, (req, res) => {
  res.json(res.student);
});

// Update a student
router.patch('/:id', getStudent, async (req, res) => {
  if (req.body.name != null) {
    res.student.name = req.body.name;
  }
  if (req.body.age != null) {
    res.student.age = req.body.age;
  }
  if (req.body.grade != null) {
    res.student.grade = req.body.grade;
  }
  try {
    const updatedStudent = await res.student.save();
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a student
router.delete('/:id', getStudent, async (req, res) => {
  try {
    await res.student.remove();
    res.json({ message: 'Student deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get a student by ID
async function getStudent(req, res, next) {
  let student;
  try {
    student = await Student.findById(req.params.id);
    if (student == null) {
      return res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.student = student;
  // why next is used here?
  // In Express, middleware functions are executed in the order they are defined. If a middleware function calls next(), it will continue to the next middleware function in line. If it doesn't call next(), the request will be stopped at the current middleware function and not processed by any subsequent middleware functions.
  // In this case, we want to continue processing the request to the next middleware function (getStudent) after getting the student by ID. So, we call next() here.
  // Without calling next(), the request will stop at this middleware function and not be processed by the next middleware function.
  // In a real-world application, you might want to add more functionality to this middleware function, such as checking if the user is authenticated before allowing access to certain routes. In that case, you would not want to call next() in this middleware function.

  next();
}
// purpose of module.exports?
// module.exports is a special object in Node.js that you use to expose functions, objects, or values from a given file to be imported and used in another file. In this case, we are exporting the router object so that it can be used in other files.
module.exports = router;