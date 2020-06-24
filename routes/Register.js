const express = require('express'),
    register = express.Router(),
    bcryptjs = require('bcryptjs'),
    { regisValidation, loginValidation } = require('../validator/Valid_user')

const list_user = []

register.route('/register')
    .post((req, res) => {

        const { error } = regisValidation(req.body)

        if (error) return res.status(400).send(error.details[0].message)

        const user = {}
        user.username = req.body.username
        user.password = bcryptjs.hashSync(req.body.password)
        user.email = req.body.email
        user.name = req.body.name
        list_user.push(user)

        res.json({
            register: "true"
        })
        console.log(list_user);


    })

register.route('/login')
    .post((req, res) => {
        const user = req.body.username
        const pass = req.body.password

        const index = list_user.find(element => {
            if (element.username === user) return element

        })

        const result = bcryptjs.compareSync(pass, index.password);
        console.log(result);

        if (!result) return res.status(401).send('Password not valid!');

        res.json({ login: true, user: { name: index.name, email: index.email, user: index.username } })

    })

module.exports = register