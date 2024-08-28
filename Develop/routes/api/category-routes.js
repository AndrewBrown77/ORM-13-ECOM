const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try{
    const categoryData = await Category.findAll({
      include:[{model: Product}]
    })
    res.status(200)._construct.json(categoryData)
  }
  catch(err) {
    res.status(400).json(err)
  }
});

// find one category by its `id` value
router.get("/:id", (req, res) => {
  try{
    const categoryId = await Category.findByPk(req.params.id,{
      // be sure to include its associated Products
      include:[{model: Product}],

    })
    res.status(200).json(categoryId)
  }
  catch(err){
    res.status(400).json(err)
  }
});

// create a new category
router.post("/", (req, res) => {
   try{
  const newCategory = await Category.create({
    id:req.body.id,
    category_name: req.body.category_name,
  })
  res.status(200).json(newCategory);
  }
  catch(err) {
    res.status(404).json({message:'Please enter a new category name.'});
  
  };
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  try{
const updateCategory = await Category.update({
  category_name: req.body.category_name,
},
{
  where:{
    id: req.params.id
  }
});
res.status(200).json(updateCategory)
  }
  catch (err) {
    res.status(400).json(err);
  };

});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  try{
const deletedCategory = await Category.destroy({
  where:{
    id: req.params.id
  }
},
)
res.response(200).json(deletedCategory);
}
catch(err){
    res.status(400).json(err);
  }
});


module.exports = router;
