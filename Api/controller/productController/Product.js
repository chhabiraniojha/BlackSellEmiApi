const Sequelize=require('sequelize')
const { Op } = require('sequelize');
const product = require('../../models/Product');


exports.searchProduct = async (req, res, next) => {
  // res.json(JSON.parse(req.query.search))
  const query = JSON.parse(req.query.search);
  try {
    // Use Sequelize's `Op.iLike` for case-insensitive search on product names and descriptions
    const results = await product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } },
          { brand: { [Op.like]: `%${query}%` } },
          // { shortDescription: { [Op.like]: `%${query}%` } },
        ],
      },
      limit: 10,
    });
   const result=JSON.stringify(results);
   return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}

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
  console.log(req.query.filter)
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
       console.log(allProducts)
      return res.status(200).json({ success: true, allProducts })
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





// exports.getProducts=async(req,res)=>{
//    res.json("hello");
// }


// controllers/productController.js


const buildWhereCondition = ({ minPrice, maxPrice, categories, brands, downPayment, bestSelling, topDeals, trending }) => {
  const whereCondition = {};

  if (minPrice && maxPrice) {
    whereCondition.dp = { [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)] };
  };

  if (categories) {
    const categoryArray = JSON.parse(categories);
    if (Array.isArray(categoryArray) && categoryArray.length > 0) {
      whereCondition.category = { [Op.in]: categoryArray };
    }
  }

  if (brands) {
    const brandArray = JSON.parse(brands);
    if (Array.isArray(brandArray) && brandArray.length > 0) {
      whereCondition.brand = { [Op.in]: brandArray };
    }
  }

  if (downPayment) {
    const downPaymentArray = JSON.parse(downPayment);
    if (Array.isArray(downPaymentArray) && downPaymentArray.length > 0) {
      whereCondition.downPayment = { [Op.in]: downPaymentArray.map(parseFloat) };
    }
  }
  console.log(bestSelling,topDeals)
  if (bestSelling=="true") {
    whereCondition.flag = "Best selling";
  }
  
  if (topDeals=="true") {
    whereCondition.flag = "Top Deals";
  }
  if (trending=="true") {
    whereCondition.flag = "trending";
  }
  // whereCondition.flag="Top Deals"
  return whereCondition;
};

const buildOrderCondition = ({ sortBy, orderBy }) => {
   if (sortBy && orderBy) {
      return Sequelize.literal(`"${sortBy}" ${orderBy}`);
    }
    return null;
};

exports.getProducts = async (req, res) => {
  try {
    const { sortBy, orderBy } = req.query;
    const page = req.query.page;
    const pageLimit = parseInt(req.query.limit);
    // Check if all filtering fields are empty
    const allFiltersEmpty =
      !req.query.minPrice &&
      !req.query.maxPrice &&
      (!req.query.categories || JSON.parse(req.query.categories).length === 0) &&
      (!req.query.brands || JSON.parse(req.query.brands).length === 0) &&
      (!req.query.downPayment || JSON.parse(req.query.downPayment).length === 0) &&
      req.query.bestSelling === undefined|| req.query.bestSelling===false &&
      req.query.topDeals === undefined|| req.query.topDeals===false &&
      req.query.trending === undefined|| req.query.trending===false;

    const whereCondition = allFiltersEmpty
      ? {} // If all filters are empty, return all products
      : buildWhereCondition({
          minPrice: req.query.minPrice,
          maxPrice: req.query.maxPrice,
          categories: req.query.categories,
          brands: req.query.brands,
          downPayment: req.query.downPayment,
          bestSelling: req.query.bestSelling,
          topDeals: req.query.topDeals,
          trending:req.query.trending
        });

    const order = buildOrderCondition({ sortBy, orderBy });

    console.log(whereCondition)
    const products = await product.findAll({
      where: whereCondition,
      order:order,
      offset: (page) * pageLimit,
      limit: pageLimit,
      logging: console.log,
    });
    // console.log(products[0]?.toString());
    res.status(200).json({success:true,data:products});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error',errDesc:error });
  }
};
