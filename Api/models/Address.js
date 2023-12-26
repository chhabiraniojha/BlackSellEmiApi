const Sequelize=require('sequelize');

const sequelize=require('../utill/database');


const Address=sequelize.define('address',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  address:{
    type:Sequelize.TEXT,
    allowNull:false
  }
});

module.exports=Address;