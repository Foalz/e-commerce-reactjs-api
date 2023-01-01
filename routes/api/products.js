const router = require('express').Router();
const Product = require('../../models/products');
const Categories = require('../../models/categories');

//GET
router.get('/api/products', async (req, res) => {
  try {
    const errors = [];
    const products = await Product.find({}).lean();
    const cat_list = await Promise.all(
      products.map(async (product) => {
        const arr = await Categories.find({ "category_id": product.category }, { "title": 1, "_id": 0, "color": 1, });
        product.category = arr;
      })
    );
    
    res.status(200).send(products);
    
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

//POST
router.post('/api/products/new', async (req, res) => {
  try{
    const obj = JSON.parse(JSON.stringify(req.body));
    const { 
      title,
      description,
      imageUrl,
      price,
      stock,
      category,
      brand,
      rating,
      sku,
    } = obj;
    const errors = [];

    if(!title){
      errors.push({ title: 'Please provide a title for this product' });
    }
    if(!sku){
      errors.push({ sku: 'Please provide an unique sku for this product' });
    }
    if(!description){
      errors.push({ description: 'Please provide a description for this product' });
    }
    if(!imageUrl){
      errors.push({ imageUrl: 'Please provide an url image for this product' });
    }
    if(!price){
      errors.push({ price: 'Please provide a price for this product' });
    }
    if(!stock){
      errors.push({ stock: 'Please provide stock amount for this product' });
    }
    if(errors.length > 0){
      res.status(400).send({
        errors,
        msg: 'Please correct all errors and try again.',
      });
    }else{
      const newProduct = new Product({ 
        title,
        category,
        description,
        imageUrl,
        sku,
        price,
        stock,
        brand,
        rating,
      });
      await newProduct.save();
      res.status(200).send({ msg: 'Product added successfully!' });
    }
  }
  catch(e){
    res.status(400).send(e);
  }
});

module.exports = router;
