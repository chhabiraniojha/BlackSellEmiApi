const Sequelize=require('sequelize')
const product = require('../../models/Product');




exports.addProduct = async (req, res, next) => {
   try {
      const addedProduct = await product.create(req.body);
      res.status(200).json({ success: true, message: "product successfully added", addedProduct })
   } catch (error) {
      res.status(500).json({ success: false, message: error })
   }

}


exports.getAllProducts = async (req, res, next) => {
   try {
      const allProducts = await product.findAll();
      res.status(200).json({ success: true, allProducts })
   } catch (error) {
      res.json(error)
   }
}

exports.getFilteredProducts = async (req, res, next) => {
   const filter=JSON.parse(req.query.filter);
   const page = req.query.page;
   const pageLimit = parseInt(req.query.limit);
   console.log(page,pageLimit)
   // res.json(JSON.parse(filter))
   try {
      const allProducts = await product.findAll({
         where: filter,
         order: Sequelize.literal('RAND()'),
         offset: (page) * pageLimit,
         limit: pageLimit,
         
     
       })
      res.status(200).json({ success: true, allProducts })
   } catch (error) {
      throw new Error(error)
   }
}



exports.getSingleProduct = async (req, res, next) => {
   
   try {
      const singleProduct = await product.findByPk(req.params.id);
      console.log(singleProduct)
      if (singleProduct === null) {
         res.status(201).json({success:false,message:"product not found"});
      } else {
         res.status(200).json({success:true,data:singleProduct})
         // Its primary key is 123
      }
   } catch (error) {
      res.status(500).json({success:false,error,message:"internal server error"})
   }
}


exports.deleteSingleProduct=async(req,res,next)=>{

   try {
      const response=await product.destroy({
         where: {
           id: req.params.id
         },
       });
       if(response==1){
         res.status(200).json({success:true,message:`successfully deleted record ${req.params.id}`})
       }
   } catch (error) {
      res.status(500).json({success:false,message:"unsuccess",error})
   }
}