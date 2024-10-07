// backend/server.js
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL připojení
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Změňte podle vaší konfigurace
    password: '', // Změňte podle vaší konfigurace
    database: 'grade_app'
});

// Připojení k databázi
db.connect((err) => {
    if (err) {
        console.error('Chyba při připojování k databázi:', err);
        process.exit(1);
    }
    console.log('Připojeno k databázi MySQL');
});

// Základní routa
app.get('/', (req, res) => {
    return res.json("From backend Side");
});

/* ROUTES */

// 1. Získat všechny třídy
app.get('/classes', (req, res) => {
    const sql = 'SELECT * FROM classes';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching classes:', err);
            res.status(500).json({ error: 'Chyba při získávání tříd' });
            return;
        }
        res.json(results);
    });
});

// 2. Získat všechny studenty v konkrétní třídě
app.get('/classes/:classId/students', (req, res) => {
    const classId = req.params.classId;
    const sql = 'SELECT * FROM students WHERE class_id = ?';
    db.query(sql, [classId], (err, results) => {
        if (err) {
            console.error('Error fetching students:', err);
            res.status(500).json({ error: 'Chyba při získávání studentů' });
            return;
        }
        res.json(results);
    });
});

// 3. Přidat nového studenta do třídy
app.post('/classes/:classId/students', (req, res) => {
    const classId = req.params.classId;
    const { name } = req.body;
    const sql = 'INSERT INTO students (name, class_id) VALUES (?, ?)';
    db.query(sql, [name, classId], (err, result) => {
        if (err) {
            console.error('Error adding student:', err);
            res.status(500).json({ error: 'Chyba při přidávání studenta' });
            return;
        }
        res.json({ id: result.insertId, name, class_id: classId });
    });
});

// 4. Přidat známku studentovi
app.post('/students/:studentId/grades', (req, res) => {
    const studentId = req.params.studentId;
    const { grade, weight, description } = req.body;
    const sql = 'INSERT INTO grades (student_id, grade, weight, description) VALUES (?, ?, ?, ?)';
    db.query(sql, [studentId, grade, weight, description], (err, result) => {
        if (err) {
            console.error('Error adding grade:', err);
            res.status(500).json({ error: 'Chyba při přidávání známky' });
            return;
        }
        res.json({ id: result.insertId, student_id: studentId, grade, weight, description });
    });
});

// 5. Získat průměr studenta
app.get('/students/:studentId/average', (req, res) => {
    const studentId = req.params.studentId;
    const sql = 'SELECT SUM(grade * weight) / SUM(weight) AS average FROM grades WHERE student_id = ?';
    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.error('Error fetching average:', err);
            res.status(500).json({ error: 'Chyba při výpočtu průměru' });
            return;
        }
        res.json(result[0]);
    });
});

// 6. Smazat známku
app.delete('/grades/:gradeId', (req, res) => {
    const gradeId = req.params.gradeId;
    const sql = 'DELETE FROM grades WHERE id = ?';
    db.query(sql, [gradeId], (err, result) => {
        if (err) {
            console.error('Error deleting grade:', err);
            res.status(500).json({ error: 'Chyba při mazání známky' });
            return;
        }
        res.json({ message: 'Známka smazána' });
    });
});

// 7. Smazat studenta
app.delete('/students/:studentId', (req, res) => {
    const studentId = req.params.studentId;
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [studentId], (err, result) => {
        if (err) {
            console.error('Error deleting student:', err);
            res.status(500).json({ error: 'Chyba při mazání studenta' });
            return;
        }
        res.json({ message: 'Student smazán' });
    });
});

const PORT = 8081;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
