// // Add College
// document.getElementById('collegeForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const collegeName = document.getElementById('collegeName').value;
//     const collegeLocation = document.getElementById('collegeLocation').value;

//     fetch('http://localhost:3000/add-college', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: collegeName, location: collegeLocation })
//     })
//     .then(response => response.json())
//     .then(data => {
//         alert('College added successfully!');
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });

// Add Student
document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const enrollmentYear = document.getElementById('enrollmentYear').value;
    const collegeId = document.getElementById('collegeId').value;

    fetch('http://localhost:3000/add-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, enrollmentYear, collegeId })
    })
    .then(response => response.json())
    .then(data => {
        alert('Student added successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Add College
document.getElementById('collegeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const collegeName = document.getElementById('collegeName').value;
    const collegeLocation = document.getElementById('collegeLocation').value;

    fetch('http://localhost:3000/add-college', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: collegeName, location: collegeLocation })
    })
    .then(response => response.json())
    .then(data => {
        alert('College added successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Get College Name by Student ID
function getCollegeName() {
    const studentId = document.getElementById('studentIdForCollege').value;

    fetch(`http://localhost:3000/get-college-name/${studentId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('collegeNameResult').textContent = `College Name: ${data.name}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Get Courses by Student ID
function getCourses() {
    const studentId = document.getElementById('studentIdForCourses').value;

    fetch(`http://localhost:3000/get-courses/${studentId}`)
    .then(response => response.json())
    .then(data => {
        const coursesList = document.getElementById('coursesList');
        coursesList.innerHTML = '';
        data.courses.forEach(course => {
            const li = document.createElement('li');
            li.textContent = `${course.name} (${course.code})`;
            coursesList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
