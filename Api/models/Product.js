const Sequelize=require('sequelize');

const sequelize=require('../utill/database');
const { DOUBLE } = require('sequelize');


const Product=sequelize.define('product',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  name:{
    type:Sequelize.STRING,
    allowNull:false
  },
  brand:{
    type:Sequelize.STRING,
    allowNull:false
  },
  category:{
    type:Sequelize.STRING,
    allowNull:false
  },
  imageURL:{
    type:Sequelize.STRING,
    allowNull:false
  },
  mrp:{
    type:Sequelize.STRING,
    allowNull:false
  },
  dp:{
    type:Sequelize.STRING,
    allowNull:false
  },
  shortDescription:{
    type:Sequelize.STRING,
    allowNull:false
  },
  longDescrption:{
    type:Sequelize.STRING,
    allowNull:false
  },
  specification:{
    type:Sequelize.STRING,
    allowNull:false
  },
  rating:{
    type:Sequelize.DOUBLE,
    allowNull:true
  },
  reviews:{
    type:Sequelize.TEXT,
    allowNull:true
  },
  downPayment:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  flag:{
    type:Sequelize.STRING,
    allowNull:false
  }
 


});

module.exports=Product;