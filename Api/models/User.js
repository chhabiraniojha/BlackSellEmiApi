const Sequelize=require('sequelize');

const sequelize=require('../utill/database');


const User=sequelize.define('user',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  mobileNo:{
    type:Sequelize.STRING,
    allowNull:false
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false
  },
  panNo:{
    type:Sequelize.STRING,
    allowNull:false
  },
  creditLimit:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  availableLimit:{
    type:Sequelize.INTEGER,
    allowNull:false
  }
});

module.exports=User;