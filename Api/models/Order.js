const Sequelize=require('sequelize');

const sequelize=require('../utill/database');



const Order=sequelize.define('order',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
  },
  color:{
    type:Sequelize.STRING,
    allowNull:false
  },
  emiTreanure:{
    type:Sequelize.STRING,
    allowNull:false
  },
  status:{
    type:Sequelize.STRING,
    allowNull:false
  }

});

module.exports=Order;