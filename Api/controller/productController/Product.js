const product=require('../../models/Product');



exports.addProduct=async (req,res,next)=>{
   try {
      const addedProduct=await product.create(req.body);
      res.status(200).json({success:true,message:"product successfully added",addedProduct})
   } catch (error) {
      res.status(500).json({success:false,message:error})
   }
   
}