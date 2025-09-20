const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'lamp_db',
  user: process.env.DB_USER || 'user',
  password: process.env.DB_PASSWORD || 'userpassword',
  database: process.env.DB_NAME || 'school_db',
  port: process.env.DB_PORT || 13306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Serve HTML page
app.get('/', (req, res) => {
  const sql = `SELECT first_name, last_name, email, city, program, gpa, enrolled_date FROM students`;

  pool.query(sql, (err, results) => {
    if (err) {
        console.error('❌ Query error:', err);
        return res.status(500).send(`<h3>Database query failed: ${err.message}</h3>`);
    }

    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Students</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    </head>
    <body class="container">
      <h2 class="mb-4">Student List</h2>
      <table class="table table-striped table-bordered">
        <thead class="table-dark">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Program</th>
            <th>GPA</th>
            <th>Enrolled Date</th>
          </tr>
        </thead>
        <tbody>`;

    if (results.length > 0) {
      results.forEach(row => {
        html += `
          <tr>
            <td>${row.first_name}</td>
            <td>${row.last_name}</td>
            <td>${row.email}</td>
            <td>${row.city}</td>
            <td>${row.program}</td>
            <td>${row.gpa}</td>
            <td>${row.enrolled_date}</td>
          </tr>`;
      });
    } else {
      html += `<tr><td colspan="7" class="text-center">No students found.</td></tr>`;
    }

    html += `
        </tbody>
      </table>
    </body>
    </html>`;

    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
