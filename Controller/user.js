const Users = require("../models/usermodel.js")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async(req,res) => {
    try {
        const users = await Users.findAll({
            attributes:['id','name','email']
        });
        res.json(users);

    } catch (error) {
        console.log(error)
        
    }
}

//function register
const register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({msg:'Password yang anda masukkan tidak cocok'});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: 'Register Sukses!'});
    } catch (error) {
        console.log(error)
        
    } 
}

//Function Login
const login = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg:"Password yang Anda Masukkan Salah!"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '30s'
        });
        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });
        await Users.update({refresh_token: refreshToken} ,{
            where:{
                id : userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            //secure: true ==> jika menggunakan https
        });
        res.json({accessToken});
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"})

    }
}


//fungsi logout
const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refreshToken: refreshToken
        }
    })
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await Users.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

//fungsi profile
const getProfile = async(req, res) => {
    try {
      const profile = profiles[req.params.id];
      if (profile) {
        res.send(profile);
      } else {
        res.status(404).send({ message: "Profile not found" });
      }
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
  };

//fungsi edit profile
const editProfile = async(req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProfile) {
          return res.status(404).json({ error: 'Profile not found' });
        }
        res.json(updatedProfile);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

//fungsi upload
const cvUpload = (upload.single('pdfFile'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    res.send('File uploaded successfully!');
  });

//REFERENSI CHATGPT
// const express = require('express');
// const multer = require('multer');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Set up storage using Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Destination folder for storing PDF files
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
//     cb(null, fileName);
//   },
// });

// // Initialize Multer with the storage configuration
// const upload = multer({ storage: storage });

// // Set up a route to handle file uploads
// app.post('/upload', upload.single('pdfFile'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   res.send('File uploaded successfully!');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

module.exports = {
    getUsers,
    register,
    login,
    logout,
    getProfile,
    editProfile,
    cvUpload
};
