const express=require('express');
const userController=require('../../controller/userController/User');
const tokenVerificationController=require('../../controller/tokenVerification/Tokenverification')
const Authenticate=require('../../middleWire/Auth')
const router=express.Router();

router.get('/tokenverification',Authenticate,tokenVerificationController.verifyToken)
router.get('/userexist/:mobile',userController.checkExistance)
router.post("/signup",userController.signup)

module.exports=router;