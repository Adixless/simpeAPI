const sequelize = require('sequelize');
const db = require("../config/db.js")

const Users = db.define(
    'user',
    {
        name:{
            type: sequelize.STRING
        },
        email:{
            type: sequelize.STRING
        },
        password:{
            type: sequelize.STRING
        },
        refresh_token:{
            type: sequelize.TEXT
        },
    },{
        freezeTableName:true
})

module.exports = Users;
