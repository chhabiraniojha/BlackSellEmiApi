const address = require("../../models/Address")

exports.addAddress = async (req, res) => {
    try {
        const user = req.user;
        const addressData = req.body
        const userAddress = await user.createAddress(addressData)
        if(userAddress){
            return res.status(200).json({success:true,address:userAddress,message:"address inserted successfully"})
        }

    } catch (error) {
        return res.status(501).json({error})

    }

}

exports.getAddress =async (req,res) => {
      try {
        const userId = req.user.id;
        const userAddress=await address.findAll({where:{
            userId
        }})
        if(userAddress){
           return res.status(200).json({success:true,userAddress})
        }
        
      } catch (error) {
        return res.status(501).json({success:false,error})
      }
}

exports.deleteAddress =async (req,res) => {
    try {
        const userId=req.user.id;
        const addressId=req.params.addressId;
        await address.destroy({
            where: {
              id: addressId,
              userId
            },
          })
        return res.status(200).json({success:true,message:"address successfully deleted"})  
    } catch (error) {
        return res.status(501).json(error)
    }
    
}

exports.updateAddress =async (req,res) => {
   try {
    const userId=req.user.id;
    const addressId=req.params.addressId;
    const updatedAddress=await address.update(req.body,{
        where:{
            id:addressId,
            userId
        }
    })
    return res.status(200).json({success:true,message:"address successfully updated"})
   } catch (error) {
    return res.status(501).json({error,message:"internal server error"})
   }
   
}