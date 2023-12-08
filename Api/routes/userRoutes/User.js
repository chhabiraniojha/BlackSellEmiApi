const express=require('express');
const userController=require('../../controller/userController/User');
const router=express.Router();


router.get('/userexist/:mobile',userController.checkExistance)
router.post("/signup",userController.signup)

module.exports=router;