exports.verifyToken=(req,res)=>{
   if(req.user){
    return res.status(200).json({success:true,userData:req.user,message:"user token matched"})
   }
   
}