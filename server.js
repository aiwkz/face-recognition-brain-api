const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageUrl = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: process.env.DB_URL,
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

app.post('/imageUrl', (req, res) => imageUrl.clarifaiApiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT || '3000'}`);
})