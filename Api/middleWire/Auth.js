const Users=require('../models/User');
const jwt=require('jsonwebtoken');

const Authenticate=async (req,res,next)=>{
     try {
        const token=req.header('authorization');
        // console.log(token)
        const {userId}=jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user=await Users.findByPk(userId);
        req.user=user;
        if(user){
         next()
        }else{
         return res.status(500).json({message:"token failed or user does not exists",success:false})
        }
        
        
     } catch (error) {
        res.status(501).json({
            message:"error"
        })
        // console.log(error)
     }
}

module.exports=Authenticate;