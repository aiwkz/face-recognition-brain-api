const handleRegister = (req, res, bcrypt, db) => {
    const { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json('Complete all the fields before submitting');
    }
    const hash =bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                .returning('*')
                .insert({
                    name: name,
                    email: loginEmail[0].email,
                    joined: new Date()
                })
                .then(user => {
                    res.json(user[0]);
                })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => {
            console.log(err)
            res.status(400).json('Unable to register')
        })
};

module.exports = {
    handleRegister
};
