const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const port = 5001;

app.use(cors());
app.use(bodyParser.json());

// Подключение к базе данных
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234qw', // ЗДЕСЬ СТАВЬТЕ СВОЙ ПАРОЛЬ
    database: 'practice_system'
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Создание заявки на практику
app.post('/api/create-practice-offer', (req, res) => {
    const { practice_id, student_id, status } = req.body;

    console.log('Received data:', req.body); // Логируем полученные данные

    const sql = 'INSERT INTO practice_offer (practice_id, student_id, status) VALUES (?, ?, ?)';
    db.query(sql, [practice_id, student_id, status], (err, result) => {
        if (err) {
            console.error('Ошибка при создании заявки:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ id: result.insertId, message: 'Заявка на практику успешно создана' });
    });
});

// Удаление заявки
app.delete('/api/practice_offer/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM practice_offer WHERE offer_id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    });
});

// Получение заявок студента
app.get('/api/practice_offer', (req, res) => {
    const studentId = req.query.student_id;
    const sql = `
        SELECT po.*, p.name
        FROM practice_offer po
        JOIN practice p ON po.practice_id = p.id
        WHERE po.student_id = ?
    `;
    db.query(sql, [studentId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Маршрут для получения данных из таблицы practice
app.get('/api/practice', (req, res) => {
    const sql = 'SELECT * FROM practice';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(results);
    });
});

// Маршрут для регистрации
app.post('/api/register', async (req, res) => {
    const { email, password, login, userCategory } = req.body;
    let tableName;

    console.log('Received registration request:', req.body);

    switch (userCategory) {
        case 'student':
            tableName = 'students';
            break;
        case 'teacher':
            tableName = 'universities';
            break;

        default:
            return res.status(400).json({ error: 'Invalid user category' });
    }

    const checkEmailSql = `SELECT * FROM ${tableName} WHERE email = ?`;
    db.query(checkEmailSql, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertSql = `INSERT INTO ${tableName} (email, password_hash, login) VALUES (?, ?, ?)`;
        db.query(insertSql, [email, hashedPassword, login], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json({ message: 'User registered successfully', userCategory });
        });
    });
});

app.post('/api/create-practice', (req, res) => {
    const { name, description, start_date, end_date, places, industry } = req.body;

    const sql = 'INSERT INTO practice (name, description, start_date, end_date, places, industry) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, description, start_date, end_date, places, industry], (err, result) => {
        if (err) {
            console.error('Error inserting practice:', err);
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ id: result.insertId, message: 'Practice created successfully' });
    });
});

// Маршрут для входа
app.post('/api/login', async (req, res) => {
    const { login, password } = req.body;

    console.log('Received login request:', req.body);

    const sql = `
        SELECT 'student' AS userCategory, id, email, login, password_hash FROM students WHERE login = ?
        UNION ALL
        SELECT 'teacher' AS userCategory, id, email, login, password_hash FROM universities WHERE login = ?
        UNION ALL
        SELECT 'enterprise' AS userCategory, id, email, login, password_hash FROM companies WHERE login = ?
        UNION ALL
        SELECT 'admin' AS userCategory, id, email, login, password_hash FROM admins WHERE login = ?
    `;

    db.query(sql, [login, login, login, login], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        console.log('Query results:', results);

        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid login or password' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (isPasswordValid) {
            // Сохраняем studentId и userCategory в localStorage на клиенте
            res.status(200).json({
                message: 'Login successful',
                user: user,
                userCategory: user.userCategory,
                studentId: user.id
            });
        } else {
            res.status(401).json({ message: 'Invalid login or password' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});