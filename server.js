const express = require ('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Import cors
const app = express();

// Middleware to parse JSON
app.use(express.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Allow only this origin
    methods: ['GET', 'POST'],       // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Database Configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '01225637241',
    database: 'university_data',
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Add Student API
app.post('/add-student', (req, res) => {
    const { firstName, lastName, email, enrollmentYear, collegeId } = req.body;
    const query = 'INSERT INTO students (first_name, last_name, email, enrollment_year, college_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, enrollmentYear, collegeId], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Student added successfully' });
        }
    });
});

// Get College Name by Student ID API
app.get('/get-college-name/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const query = `SELECT colleges.name FROM students JOIN colleges ON students.college_id = colleges.id WHERE students.id = ?`;
    db.query(query, [studentId], (err, result) => {
        if (err || result.length === 0) {
            res.status(500).json({ error: 'Student not found or database error' });
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// Get Courses by Student ID API
app.get('/get-courses/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const query = `
        SELECT courses.name, courses.code FROM registrations
        JOIN courses ON registrations.course_id = courses.id
        WHERE registrations.student_id = ?`;
    db.query(query, [studentId], (err, result) => {
        if (err || result.length === 0) {
            res.status(500).json({ error: 'Courses not found or database error' });
        } else {
            res.status(200).json({ courses: result });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});