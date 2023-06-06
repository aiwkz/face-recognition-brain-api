const handleSignin = (req, res, bcrypt, db) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json('Complete all the fields before submitting');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid) {
                req.session.user = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                return db.select('*').from('users')
                            .where('email', '=', email)
                            .then(user => {
                                res.json(user[0])
                            })
                            .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(401).send('Invalid username or password')
            }
        })
        .catch(err => res.status(400).json('Wrong credentials'))
};

module.exports = {
    handleSignin
};
