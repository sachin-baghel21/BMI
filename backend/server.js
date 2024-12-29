// backend/server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const color = require('color')
const con = require('./db'); // Import database connection

const app = express();
const port = 5000;

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files like images, CSS, JavaScript, etc.
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Serve signup.html when accessing the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html')); // Adjust path(signup page) to point to the root folder
});
//
// Serve login.html
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});
//logout route here
app.get('/logout', (req, res) => {
  res.redirect('/login'); // Redirect to login form
});

// Serve index.html
app.get('/Home.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Home.html'));
});

// Serve article.html
app.get('/artical.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../artical.html'));  // Article page
});

// Serve calories.html
app.get('/Calories.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Calories.html'));  // Calories page
});
// Updated route for the renamed file 'DietPlan.html'
app.get('/DietPlan.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../DietPlan.html'));  // Corrected path to the renamed file
});

// Serve nutrition.html
app.get('/Nutrition.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Nutrition.html'));  // Nutrition page
});

// Serve BMI Calculator page
app.get('/BMI-Calculator.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../BMI-Calculator.html'));  // BMI Calculator page
});
app.get('/BMRCal.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../BMRCal.html'));  // BMI Calculator page
});
//body fat calculator
app.get('/Bodyfat.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../Bodyfat.html'));  // BMI Calculator page
});

// Handle signup form submission and insert data into the database
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  // Check if any field is empty
  if (!name || !email || !password) {
    return res.status(400).send('All fields are required.');
  }

  // Step 1: Check if the email already exists
  const checkEmailQuery = 'SELECT * FROM usersign WHERE email = ?';
  con.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      return res.status(500).send('An error occurred while checking email.');
    }

    // If the email already exists, return an error message
    if (results.length > 0) {
      return res.status(400).send('Email is already registered.');
    }

    // Step 2: If email is unique, insert the new user into the database
    const insertUserQuery = 'INSERT INTO usersign (name, email, password) VALUES (?, ?, ?)';
    con.query(insertUserQuery, [name, email, password], (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        return res.status(500).send('An error occurred while signing up.');
      }

      console.log('Record added successfully with ID:', result.insertId);

      // Send success response and redirect after success
      return res.redirect('/login');
    });
  });
});

// Handle login form submission and validate user credentials
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if any field is empty
  if (!email || !password) {
    return res.status(400).send('Email and password are required.');
  }

  // Prepare SQL query to check user credentials
  const sql = 'SELECT * FROM usersign WHERE email = ? AND password = ?';

  // Execute the query
  con.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying the database:', err);
      return res.status(500).send('An error occurred while logging in.');
    }

    // Check if user exists
    if (results.length === 0) {
      // return res.status(401).send('Invalid email or password.');
      console.log("Invalid details!".red.bold);
      return res.status(200).send({ success: false, message: 'Invalid email or password.' });
    }

    // Successful login
    console.log('Login successful for user:'.yellow.bgBlack, results[0].name);
    // Redirect to index.html upon successful login
    //  return res.status(200).redirect('/Home.html');
    return res.status(200).send({ success: true, message:'login successfully!', redirectUrl: '/Home.html' });
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
