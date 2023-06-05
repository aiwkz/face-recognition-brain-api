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
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false
    }
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://face-recognition-brain-qmz5.onrender.com',
}));

app.get('/', (req, res) => {
    res.send('success')
})

app.get('/profile/:id', (req, res) => profile.handleProfileGet(req, res, db))

app.post('/signin', (req, res) => signin.handleSignin(req, res, bcrypt, db))

app.post('/register', (req, res) => register.handleRegister(req, res, bcrypt, db))

app.post('/imageurl', (req, res) => imageUrl.clarifaiApiCall(req, res))

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT || '3000'}`);
})