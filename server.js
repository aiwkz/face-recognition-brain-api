const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'pat',
      password : '',
      database : 'face-recognition-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success')
})

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))

app.post('/signin', (req, res) => signin.handleSignin(req, res, bcrypt, db))

app.post('/register', (req, res) => register.handleRegister(req, res, bcrypt, db))

app.listen(3000, () => {
	console.log('app is running on port 3000');
})