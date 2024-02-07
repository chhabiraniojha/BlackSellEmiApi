const express =require('express');
require('dotenv').config();
const bodyParser=require('body-parser');
const sequelize=require('./utill/database');
const User=require('./models/User')
const Prodeuct=require('./models/Product');
const Address=require('./models/Address');
const Order=require('./models/Order');
const Otp=require("./models/Otp")
const userRoutes=require('./routes/userRoutes/User');
const productRoutes=require('./routes/productRoutes/Product')
const phonepayRoute=require('./routes/phonepayRoutes/Phonepay');
const otpRoute=require("./routes/otpRoutes/handleOtp")
const cors=require('cors')


const app=express();

app.use(bodyParser.json({extended:false}));
app.use(cors())

app.use('/user',userRoutes)
// app.use('/admin',productRoutes)
app.use('/',productRoutes)
app.use("/api/phonepay",phonepayRoute)

app.use("/",otpRoute)


User.hasMany(Address)
Address.belongsTo(User)


User.hasMany(Order)
Order.belongsTo(User)

sequelize.sync({})
.then(res=>{
    app.listen(5000)
    
}).catch(err=>{
    // console.log(err)
});
