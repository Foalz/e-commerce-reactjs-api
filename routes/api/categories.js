const router = require('express').Router();
const Category = require('../../models/categories');

//POST
router.post('/api/categories/new', async (req, res) => {
  try{
    const obj = JSON.parse(JSON.stringify(req.body));
    const { category_id, title, color } = obj;
    const errors = [];

    if(!title){
      errors.push({ title: 'Please provide a title for this category' });
    }
    if(!category_id){
      errors.push({ title: 'Please provide a category_id for this category' });
    }
    if(errors.length > 0){
      res.status(400).send({
        errors,
        msg: 'Please correct all errors and try again.',
      });
    }else{
      const newCategory = new Category({ 
        category_id,
        title,
        color,
      });
      await newCategory.save();
      res.status(200).send({ msg: 'Category added successfully!' });
    }
  }
  catch(e){
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;
