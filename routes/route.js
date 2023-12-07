const express = require('express');
const {
    getUsers,
    register,
    login,
    logout
} = require("../Controller/user.js");
const verifyToken = require ("../middleware/verifyToken.js")
const refreshToken = require ("../Controller/RefreshToken.js")

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken)
router.delete('/logout', logout)

module.exports = router;