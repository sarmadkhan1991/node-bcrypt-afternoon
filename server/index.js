require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const ac = require('./controllers/authControllers');
const tc = require('./controllers/treasureController');
const auth = require('./middleware/authMiddleware');

const app = express();

app.use(express.json());

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
});

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false
    })
);

app.post('/auth/register', ac.register);

app.post('/auth/login', ac.login);

app.get('/auth/logout', ac.logout);

app.get('/api/treasure/dragon', tc.dragonTreasure);

app.get('/api/treasure/user', auth.usersOnly, tc.getUserTreasure);

app.post('/api/treasure/user', auth.usersOnly, tc.addUserTreasure);

app.get('/api/treasure/all', auth.usersOnly, auth.adminsOnly, tc.getAllTreasure);


const port = 4000
app.listen(port, () => console.log(`Server listening on port: ${port}`));