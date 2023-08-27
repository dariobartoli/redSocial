const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const fs = require('fs');
const data = fs.readFileSync('./src/users.txt', 'utf-8')
const users = JSON.parse(data)
const userMiddleware = require('../middlewares/userMiddleware')

router.use(userMiddleware.userLogger)


router.get('/', function(req, res) {
    try {
        const findUsers = userController.userShow()
        console.log(findUsers);
        res.status(200).json({
            message: "Usuarios: ",
            user: findUsers
        })
    } catch (error) {
        res.status(500).json({message: "error to get users"})
        console.log(error);
    }

})

router.get('/:id', userMiddleware.isNumber, function(req, res) {
    const indice = req.params.id
    res.status(200).json({
        message: "Usuario: ",
        user: users[indice]
    })
})

router.post('/', userMiddleware.dataValidation, function(req, res) {
    userController.userAdd(req.body.userName, req.body.lastName, req.body.email, req.body.password)
    try {
        res.status(201).json({
            message: "El usuario " + req.body.userName + " ha sido agregado",
            user: req.body,
            user2: users
        })
    } catch (error) {
        res.status(404).json({
            message: `User ${req.body.userName} couldn't be add`,
            user: req.body
        })
    }
})

router.put('/:id', userMiddleware.isNumber, function(req, res) {
    const indice = req.params.id
    users[indice] = req.body
    fs.writeFileSync('./src/users.txt', JSON.stringify(users))
    res.status(200).json({
        message: "User modified",
    })
})

router.delete('/:id', userMiddleware.isNumber, function(req, res) {
    const indice = req.params.id
    users.splice(indice, 1)
    fs.writeFileSync('./src/users.txt', JSON.stringify(users))
    res.status(200).json({
        message: "User deleted",
    })
})


module.exports = router