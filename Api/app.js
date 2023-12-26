const express =require('express');
require('dotenv').config();
const bodyParser=require('body-parser');
const sequelize=require('./utill/database');
const User=require('./models/User')
const Prodeuct=require('./models/Product');
const Address=require('./models/Address')
const userRoutes=require('./routes/userRoutes/User');
const productRoutes=require('./routes/productRoutes/Product')
const cors=require('cors')


const app=express();

app.use(bodyParser.json({extended:false}));
app.use(cors())

app.use('/user',userRoutes)
// app.use('/admin',productRoutes)
app.use('/',productRoutes)


User.hasMany(Address)
Address.belongsTo(User)


sequelize.sync()
.then(res=>{
    app.listen(3010)
    
}).catch(err=>{
    console.log(err)
});
