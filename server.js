const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');


const app = express();
const port = 3001;

// Set up MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Chicken',
    database: 'project_db'
});

// Connect to MySQL
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Set up Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up Handlebars
const hbs = exphbs.create();
app.engine(
    'handlebars',
    hbs.engine,
);
app.set('view engine', 'handlebars');

// Serve static files
app.use(express.static('public'));

app.use(require('./controllers'));
// Home route
// app.get('/', (req, res) => {
//     res.render('index');
// });

// // Login route (GET request)
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // Login route (POST request)
// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
//     const user = {
//         username: username,
//         password: password
//     };

//     // Save user data to the database
//     connection.query('INSERT INTO users SET ?', user, (err, result) => {
//         if (err) throw err;
//         console.log('User data saved to the database');
//         res.redirect('/dashboard');
//     });
// });

// // Dashboard route
// app.get('/dashboard', (req, res) => {
//     // Fetch user data from the database
//     connection.query('SELECT * FROM users', (err, results) => {
//         if (err) throw err;
//         res.render('dashboard', { users: results });
//     });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});