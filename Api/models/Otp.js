const Sequelize=require('sequelize');

const sequelize=require('../utill/database');
// const { DOUBLE } = require('sequelize');


const Otp=sequelize.define('otp',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  phoneNo:{
    type:Sequelize.STRING,
    allowNull:false
  },
  otp:{
    type:Sequelize.STRING,
    allowNull:false
  },
  expirationTime:{
    type:Sequelize.DATE,
    allowNull:false
  }

});

module.exports=Otp;