const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll(//{
      { include:[{model: Product }],
      attributes: {exclude: ['categoryId']}
    })
    res.status(200).json(tagData)
   }
   catch(err) {
   res.status(400).json(err)
    }
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const tagId = await Tag.findByPk(req.params.id,{
     //include its associated Products
     include:[{model: Product}],
     attributes: {exclude: ['categoryId']},
      where:{
        id: Product.id
      }
    
    })
    res.status(200).json(tagId)
   }
   catch(err){
     res.status(400).json(err)
   }
});

router.post("/", (req, res) => {
  // create a new tag
  try{
    const newTag = await Tag.create({
      id:req.body.id,
      tag_name: req.body.tag_name,
    })
    res.status(200).json(newTag);
    }
    catch(err) {
      res.status(404).json({message:'Please enter a new category name.'});
    
    };
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updateTag = await Tag.update({
      tag_name: req.body.tag_name,
    },
    {
      where:{
        id: req.params.id
      }
    });
    res.status(200).json(updateTag)
      }
      catch (err) {
        res.status(400).json(err);
      };
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleteTag = await Tag.destroy({
      where:{
        id: req.params.id
      }
    },
    )
    res.response(200).json(deleteTag);
    }
    catch(err){
        res.status(400).json(err);
      }
});

module.exports = router;
