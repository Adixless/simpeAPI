const express = require('express');
const {
    getUsers,
    register,
    login,
    logout,
    getProfile,
    editProfile,
    cvUpload
} = require("../Controller/user.js");
const verifyToken = require ("../middleware/verifyToken.js")
const refreshToken = require ("../Controller/RefreshToken.js")

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.delete('/logout', logout);
<<<<<<< HEAD
router.get('/profile:id', getProfile);
router.put('/editProfile:id', editProfile);
=======
router.get('/profile', getProfile);
router.put('/editProfile', editProfile);
router.post('/upload', cvUpload);
>>>>>>> a7c522cd84b7a4cf19366ff37f9beb4a02ce79db

module.exports = router;
