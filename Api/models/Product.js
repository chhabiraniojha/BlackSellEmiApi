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
    type:Sequelize.TEXT,
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
    type:Sequelize.TEXT,
    allowNull:false
  },
  longDescrption:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  specification:{
    type:Sequelize.TEXT,
    allowNull:false
  },
  downPayment:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  interestFreeMonth:{
      type:Sequelize.STRING,
      allowNull:false
  },
  totalAvailableMonthForEmi:{
    type:Sequelize.STRING,
    allowNull:false
  },
  flag:{
    type:Sequelize.STRING,
    allowNull:false
  },
  varient:{
    type:Sequelize.STRING,
    allowNull:true
  },
  createdBy:{
    type:Sequelize.STRING,
    allowNull:false
  }
 


});

module.exports=Product;