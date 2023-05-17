const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();

app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            joined: new Date(),
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.map(user => {
        if (user.id === id ) {
            found = true;
            return res.json(user);
        }
    });

    if (!found) res.status(400).json('User not found');
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json('success');
        } else {
            res.status(400).json('Wrong email or password');
        }
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    database.users.push(
        {
            id: '125',
            name: name,
            email: email,
            password: password,
            joined: new Date(),
        }
    )
    res.json(database.users[database.users.length - 1])
})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})