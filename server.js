const express = require ('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); 
const app = express();


app.use(express.json());
const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST'],       
    allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions));


app.use(bodyParser.json());


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '01225637241',
    database: 'university_data',
});


db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});


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
