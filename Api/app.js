const express =require('express');
require('dotenv').config();
const bodyParser=require('body-parser');
const sequelize=require('./utill/database');
const userModel=require('./models/User')
const prodeutModel=require('./models/Product');
const userRoutes=require('./routes/userRoutes/User');
const productRoutes=require('./routes/productRoutes/Product')
const cors=require('cors')


const app=express();

app.use(bodyParser.json({extended:false}));
app.use(cors())

app.use('/user',userRoutes)
// app.use('/admin',productRoutes)
app.use('/',productRoutes)

sequelize.sync({})
.then(res=>{
    app.listen(3010)
    
}).catch(err=>{
    console.log(err)
});
