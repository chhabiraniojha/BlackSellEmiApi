const User = require('../../models/User');
const jwt=require('jsonwebtoken')



const generateAccessToken=(newUser)=>{
    return jwt.sign({userId:newUser.id},process.env.JWT_SECRET_KEY,{ expiresIn: '7d' })
}

exports.signup = async (req, res, next) => {
    const {mobileNo,name,email,panNo,creditLimit} = req.body;
    try {
        const newUser = await User.create({mobileNo,name,email,panNo,creditLimit});
        return res.status(200).json({data:newUser,message:"success loged in",token:generateAccessToken(newUser)})
  
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
  }

exports.checkExistance =async (req, res, next) => {
    const mobile = req.params.mobile;
    try {
        const userDetails = await User.findOne({ where: { mobileNo: mobile } });
        if(userDetails==null){
            return res.status(201).json({success:true,message:"user does not exists"});
        }else{
            return res.status(200).json({success:true,message:"user exists",token:generateAccessToken(userDetails),userDetails});
        }
        
    } catch (error) {
        return res.status(500).json({success:false,message:"internal server error"})
    }
}