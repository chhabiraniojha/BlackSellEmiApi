const express=require('express');
const userController=require('../../controller/userController/User');
const addressController=require('../../controller/addressController/Address')
const tokenVerificationController=require('../../controller/tokenVerification/Tokenverification')
const Authenticate=require('../../middleWire/Auth')
const router=express.Router();

router.get('/tokenverification',Authenticate,tokenVerificationController.verifyToken)
router.get('/userexist/:mobile',userController.checkExistance)
router.post("/signup",userController.signup)



// user address route----------

router.post('/address',Authenticate,addressController.addAddress);
router.get('/address',Authenticate,addressController.getAddress)
router.delete('/address/:addressId',Authenticate,addressController.deleteAddress)
router.patch('/address/:addressId',Authenticate,addressController.updateAddress)


module.exports=router;