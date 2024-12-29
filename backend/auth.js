// const bcrypt = require('bcrypt');
// const db = require('./db');
// const jwt = require('jsonwebtoken');

// const saltRounds = 10;

// // Signup function to register a new user
// const signup = (req, res) => {
//   const { username, email, password } = req.body;

//   // Check if the user already exists
//   db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
//     if (err) return res.status(500).send('Database error');
//     if (result.length > 0) return res.status(400).send('User already exists');

//     // Hash the password before saving it
//     bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
//       if (err) return res.status(500).send('Error hashing password');
      
//       // Save the new user to the database
//       const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
//       db.query(query, [username, email, hashedPassword], (err, result) => {
//         if (err) return res.status(500).send('Error saving user');
//         res.status(200).send('User registered successfully');
//       });
//     });
//   });
// };

// // Login function to authenticate an existing user
// const login = (req, res) => {
//   const { email, password } = req.body;

//   // Check if the user exists in the database
//   db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
//     if (err) return res.status(500).send('Database error');
//     if (result.length === 0) return res.status(400).send('User does not exist');

//     // Compare the entered password with the stored hashed password
//     bcrypt.compare(password, result[0].password, (err, match) => {
//       if (err) return res.status(500).send('Error comparing password');
//       if (!match) return res.status(400).send('Invalid credentials');

//       // Create a JWT token
//       const token = jwt.sign({ id: result[0].id }, 'your_jwt_secret', { expiresIn: '1h' });

//       // Send response with the token
//       res.status(200).json({ message: 'Login successful', token });
//     });
//   });
// };

// // Export functions
// module.exports = { signup, login };
