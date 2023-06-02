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
      host : 'dpg-chrl8g0rddlba9p2som0-a.frankfurt-postgres.render.com',
      port : 5432,
      user : 'aiwkz',
      password : 'aTNLhaAl4pkElko5mp1s94b4zqaViJpM',
      database : 'db_face_recognition_brain_wuum',
      ssl: {
        rejectUnauthorized: false
      }
    }
});

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

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