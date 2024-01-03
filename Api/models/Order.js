const Sequelize=require('sequelize');

const sequelize=require('../utill/database');



const Order=sequelize.define('order',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  productId:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  color:{
    type:Sequelize.STRING,
    allowNull:false
  },
  emiTreanure:{
    type:Sequelize.STRING,
    allowNull:false
  },
  perMonthEmi:{
    type:Sequelize.STRING,
    allowNull:false
  },
  addressId:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  status:{
    type:Sequelize.STRING,
    allowNull:false
  }

});

module.exports=Order;